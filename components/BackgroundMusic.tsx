'use client'

import { useEffect, useRef, useState } from 'react'

const VIDEO_ID = 'TS0moaD8gO0'
const START_SECONDS = 40

interface YouTubePlayer {
  playVideo: () => void
  pauseVideo: () => void
  mute: () => void
  unMute: () => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
}

interface YouTubeNamespace {
  Player: new (
    el: HTMLElement,
    config: {
      videoId: string
      playerVars: Record<string, number | string>
      events: {
        onReady: (event: { target: YouTubePlayer }) => void
        onStateChange: (event: { data: number; target: YouTubePlayer }) => void
      }
    }
  ) => YouTubePlayer
}

declare global {
  interface Window {
    YT?: YouTubeNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

const PLAYER_STATE_ENDED = 0
const PLAYER_STATE_PLAYING = 1

export default function BackgroundMusic() {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const playerRef = useRef<YouTubePlayer | null>(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    let cancelled = false

    const createPlayer = () => {
      if (cancelled || !containerRef.current || playerRef.current) return
      playerRef.current = new window.YT!.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          start: START_SECONDS,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (e) => {
            // Muted autoplay is allowed everywhere; the first tap/scroll/click
            // anywhere on the page (handled below) unmutes it for real sound.
            e.target.mute()
            e.target.playVideo()
            setReady(true)
          },
          onStateChange: (e) => {
            if (e.data === PLAYER_STATE_ENDED) {
              e.target.seekTo(START_SECONDS, true)
              e.target.playVideo()
              return
            }
            setPlaying(e.data === PLAYER_STATE_PLAYING)
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      createPlayer()
    } else {
      const existingCallback = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        existingCallback?.()
        createPlayer()
      }
      if (!document.getElementById('youtube-iframe-api')) {
        const script = document.createElement('script')
        script.id = 'youtube-iframe-api'
        script.src = 'https://www.youtube.com/iframe_api'
        document.body.appendChild(script)
      }
    }

    return () => {
      cancelled = true
    }
  }, [])

  // Unmute on the visitor's first interaction anywhere on the page, so the
  // music that's already autoplaying (muted, per browser policy) gets sound
  // without needing a dedicated click on the music button itself.
  useEffect(() => {
    let handled = false
    const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'scroll']

    const tryUnmute = (event: Event) => {
      if (handled) return
      if (buttonRef.current && event.target instanceof Node && buttonRef.current.contains(event.target)) {
        return
      }
      handled = true
      playerRef.current?.unMute()
      events.forEach((type) => window.removeEventListener(type, tryUnmute))
    }

    events.forEach((type) => window.addEventListener(type, tryUnmute, { passive: true }))
    return () => events.forEach((type) => window.removeEventListener(type, tryUnmute))
  }, [])

  const toggle = () => {
    if (!ready || !playerRef.current) return
    if (playing) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.unMute()
      playerRef.current.playVideo()
    }
  }

  return (
    <>
      <div
        ref={containerRef}
        aria-hidden="true"
        className="fixed -left-[1px] bottom-0 w-px h-px overflow-hidden opacity-0 pointer-events-none"
      />

      <button
        ref={buttonRef}
        onClick={toggle}
        aria-label={playing ? 'Pause wedding song' : 'Play wedding song'}
        title={playing ? 'Pause music' : 'Play our song'}
        className="fixed bottom-6 right-6 z-[200] w-12 h-12 rounded-full frosted border border-gold-400/40 shadow-md flex items-center justify-center text-rose-900 hover:bg-gold-400/10 transition-colors"
      >
        {playing && (
          <span className="absolute inset-0 rounded-full border border-gold-400/60 animate-ping" />
        )}
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
            <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M5 3v18l16-9L5 3Z" fill="currentColor" />
          </svg>
        )}
      </button>
    </>
  )
}
