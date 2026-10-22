import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

function getImageForSlug(slug: string): string {
  if (slug.includes('dice')) return '/images/products/dice-fountain.jpg'
  if (slug.includes('peacock') || slug.includes('ashoka')) return '/images/products/peacock-fountain-box.jpg'
  if (slug.includes('chorsa')) return '/images/products/chorsa-cracker-pack.jpg'
  if (slug.includes('garland') || slug.includes('1000') || slug.includes('ladi') || slug.includes('wala')) return '/images/products/ladi-sound-garland.jpg'
  if (slug.includes('bijili')) return '/images/products/red-bijili.jpg'
  if (slug.includes('mega-cake') || slug.includes('30-shot')) return '/images/products/aerial-mega-cake.jpg'
  if (slug.includes('one-and-only') || slug.includes('aerial') || slug.includes('repeater') || slug.includes('shot')) return '/images/products/one-and-only-5inch.jpg'
  if (slug.includes('chakkar') || slug.includes('wheel')) return '/images/products/zamin-chakkars.jpg'
  if (slug.includes('pot') || slug.includes('koti')) return '/images/products/deluxe-flower-pots.jpg'
  if (slug.includes('sparkler') || slug.includes('twinkler')) return '/images/products/electric-sparklers.jpg'
  if (slug.includes('rocket')) return '/images/products/sky-rockets.jpg'
  if (slug.includes('gift') || slug.includes('hamper') || slug.includes('deepam')) return '/images/products/diwali-gift-box.jpg'
  if (slug.includes('child') || slug.includes('fancy') || slug.includes('kid')) return '/images/products/kids-fancy-pack.jpg'
  return '/images/products/one-and-only-5inch.jpg'
}

async function fixImages() {
  console.log('Fixing all product images in database...')
  const products = await prisma.product.findMany()

  for (const p of products) {
    const correctImg = getImageForSlug(p.slug)
    await prisma.productImage.deleteMany({ where: { productId: p.id } })
    await prisma.productImage.create({
      data: {
        productId: p.id,
        url: correctImg,
        alt: p.name,
        sortOrder: 0,
      },
    })
    console.log(`Updated ${p.name} (${p.slug}) -> ${correctImg}`)
  }

  console.log('Done fixing images!')
}

fixImages()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
