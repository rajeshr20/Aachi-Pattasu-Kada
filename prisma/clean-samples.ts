import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Cleaning mock sample products...')
  const deleted = await prisma.product.deleteMany({
    where: {
      OR: [
        { name: { contains: '[SAMPLE]' } },
        { name: { startsWith: 'Sample' } },
        { slug: { startsWith: 'sample-' } },
      ],
    },
  })
  console.log(`Deleted ${deleted.count} sample products!`)

  // Check remaining categories without products
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
  })
  for (const cat of categories) {
    if (cat._count.products === 0) {
      console.log(`Deleting unused empty category: ${cat.name}`)
      await prisma.category.delete({ where: { id: cat.id } })
    }
  }

  const count = await prisma.product.count()
  console.log(`Remaining authentic products: ${count}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
