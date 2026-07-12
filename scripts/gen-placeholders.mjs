import sharp from 'sharp'
import { mkdirSync } from 'fs'

mkdirSync('public/images', { recursive: true })

// Hero: warm gradient 1920x1080
await sharp({
  create: { width: 1920, height: 1080, channels: 3, background: { r: 237, g: 221, b: 208 } }
}).jpeg({ quality: 80 }).toFile('public/images/placeholder-hero.jpg')

// Story: 800x600
await sharp({
  create: { width: 800, height: 600, channels: 3, background: { r: 245, g: 237, b: 227 } }
}).jpeg({ quality: 80 }).toFile('public/images/placeholder-story.jpg')

// Gallery: 6 images at 800x600 with slightly varied warm tones
const galleryColors = [
  { r: 237, g: 221, b: 208 },
  { r: 245, g: 237, b: 227 },
  { r: 229, g: 210, b: 196 },
  { r: 240, g: 228, b: 215 },
  { r: 233, g: 218, b: 204 },
  { r: 248, g: 240, b: 232 },
]
for (let i = 0; i < 6; i++) {
  await sharp({
    create: { width: 800, height: 600, channels: 3, background: galleryColors[i] }
  }).jpeg({ quality: 80 }).toFile(`public/images/gallery-${i + 1}.jpg`)
}

console.log('Placeholder images generated.')
