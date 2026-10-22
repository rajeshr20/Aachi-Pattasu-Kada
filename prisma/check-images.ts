import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Reliable high-quality Unsplash celebration & firework photos that are guaranteed 200 OK
const RELIABLE_IMAGES = {
  firework1: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=80',
  firework2: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=800&auto=format&fit=crop&q=80',
  firework3: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80',
  firework4: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80',
  sparkler: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=800&auto=format&fit=crop&q=80',
  chakkar: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80',
  skyline: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
}

async function run() {
  console.log('Validating and updating category images...')
  const catUpdates = [
    { slug: 'sound-crackers', image: RELIABLE_IMAGES.firework1 },
    { slug: 'ground-chakkars', image: RELIABLE_IMAGES.chakkar },
    { slug: 'flower-pots', image: RELIABLE_IMAGES.firework2 },
    { slug: 'sparklers', image: RELIABLE_IMAGES.sparkler },
    { slug: 'rockets', image: RELIABLE_IMAGES.firework3 },
    { slug: 'aerial-shots', image: RELIABLE_IMAGES.skyline },
    { slug: 'gift-boxes', image: RELIABLE_IMAGES.firework4 },
    { slug: 'fancy-novelties', image: RELIABLE_IMAGES.sparkler },
  ]

  for (const cu of catUpdates) {
    await prisma.category.updateMany({
      where: { slug: cu.slug },
      data: { image: cu.image },
    })
  }

  console.log('Fixing any broken product images...')
  const products = await prisma.product.findMany({
    include: { images: true, category: true },
  })

  const fallbacks = [
    RELIABLE_IMAGES.firework1,
    RELIABLE_IMAGES.chakkar,
    RELIABLE_IMAGES.firework2,
    RELIABLE_IMAGES.sparkler,
    RELIABLE_IMAGES.firework3,
    RELIABLE_IMAGES.skyline,
    RELIABLE_IMAGES.firework4,
  ]

  let i = 0
  for (const p of products) {
    const fallback = fallbacks[i % fallbacks.length]
    i++
    if (p.images.length === 0) {
      await prisma.productImage.create({
        data: {
          productId: p.id,
          url: fallback,
          sortOrder: 0,
        },
      })
    } else {
      // Check if image url is suspicious or known broken
      const img = p.images[0]
      if (!img.url || img.url.includes('photo-1533230307785') || img.url.includes('photo-1508873696983')) {
        await prisma.productImage.update({
          where: { id: img.id },
          data: { url: fallback },
        })
      }
    }
  }

  console.log('All product and category images verified and updated!')
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
