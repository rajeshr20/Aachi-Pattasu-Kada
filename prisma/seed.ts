import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const categories = [
  {
    name: 'Sound Crackers',
    nameTa: 'Sound Crackers',
    slug: 'sound-crackers',
    icon: '💥',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80',
    sortOrder: 1,
  },
  {
    name: 'Ground Chakkars',
    nameTa: 'Ground Chakkars',
    slug: 'ground-chakkars',
    icon: '🌀',
    image: 'https://images.unsplash.com/photo-1533230307785-64e03d98782f?w=600&auto=format&fit=crop&q=80',
    sortOrder: 2,
  },
  {
    name: 'Flower Pots & Fountains',
    nameTa: 'Flower Pots & Fountains',
    slug: 'flower-pots',
    icon: '🌸',
    image: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=600&auto=format&fit=crop&q=80',
    sortOrder: 3,
  },
  {
    name: 'Sparklers & Twinklers',
    nameTa: 'Sparklers & Twinklers',
    slug: 'sparklers',
    icon: '✨',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=600&auto=format&fit=crop&q=80',
    sortOrder: 4,
  },
  {
    name: 'Sky Rockets',
    nameTa: 'Sky Rockets',
    slug: 'rockets',
    icon: '🚀',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80',
    sortOrder: 5,
  },
  {
    name: 'Aerial Shots & Night Sky',
    nameTa: 'Aerial Shots & Night Sky',
    slug: 'aerial-shots',
    icon: '🎆',
    image: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=600&auto=format&fit=crop&q=80',
    sortOrder: 6,
  },
  {
    name: 'Diwali Gift Boxes',
    nameTa: 'Diwali Gift Boxes',
    slug: 'gift-boxes',
    icon: '🎁',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
    sortOrder: 7,
  },
  {
    name: 'Kids & Fancy Novelties',
    nameTa: 'Kids & Fancy Novelties',
    slug: 'fancy-items',
    icon: '⭐',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80',
    sortOrder: 8,
  },
]

const defaultSettings = [
  { key: 'shop_name', value: 'Aachi Crackers' },
  { key: 'shop_name_ta', value: 'Aachi Crackers' },
  { key: 'tagline', value: 'Your Diwali, Our Spark' },
  { key: 'tagline_ta', value: 'Factory Direct Genuine Sivakasi Fireworks' },
  { key: 'phone1', value: '9500565391' },
  { key: 'phone2', value: '7708632966' },
  { key: 'whatsapp', value: '9500565391' },
  { key: 'address', value: 'Opposite Aachi Mess, Perumanallur, Tirupur, Tamil Nadu' },
  { key: 'address_ta', value: 'Opposite Aachi Mess, Perumanallur, Tirupur, Tamil Nadu' },
  { key: 'map_link', value: 'https://maps.google.com/?q=Perumanallur' },
  { key: 'min_order', value: '3000' },
  { key: 'opening_hours', value: '9:00 AM - 9:00 PM (All 7 Days)' },
  { key: 'is_coming_soon', value: 'false' },
  { key: 'diwali_date', value: '2026-10-20' },
  { key: 'legal_notice', value: 'Online sale of fireworks is strictly regulated in India. We operate as an enquiry and quotation platform complying with all statutory norms. Orders are confirmed over phone/WhatsApp.' },
  { key: 'upi_id', value: '9500565391@okaxis' },
  { key: 'upi_name', value: 'Aachi Crackers' },
  { key: 'bank_name', value: 'State Bank of India' },
  { key: 'bank_account', value: '38920192831' },
  { key: 'bank_ifsc', value: 'SBIN0001824' },
  { key: 'facebook', value: 'https://facebook.com' },
  { key: 'instagram', value: 'https://instagram.com' },
  { key: 'youtube', value: 'https://youtube.com' },
  { key: 'seo_title', value: 'Aachi Crackers - Best Fireworks in Perumanallur | Sivakasi Direct' },
  { key: 'seo_description', value: 'Buy premium Sivakasi fireworks at factory-direct wholesale prices from Aachi Crackers, Opposite Aachi Mess, Perumanallur. Call 95005 65391.' },
  { key: 'logo_url', value: '' },
]

const products = [
  // Sound Crackers
  {
    name: 'Red Bijili Crackers',
    slug: 'red-bijili-crackers',
    categorySlug: 'sound-crackers',
    mrp: 140,
    offerPrice: 50,
    unit: '1 Pack (100 Pcs)',
    stock: 250,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80',
    description: 'Crisp, sharp single sound bijili crackers. 100% Sivakasi standard formulation.',
  },
  {
    name: 'Classic 28 Chorsa Ladi',
    slug: 'classic-28-chorsa-ladi',
    categorySlug: 'sound-crackers',
    mrp: 90,
    offerPrice: 35,
    unit: '1 Box',
    stock: 300,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
    description: 'Traditional continuous sound garland crackers with sparkling finale.',
  },
  {
    name: 'Deluxe 100 Sound Garland',
    slug: 'deluxe-100-sound-garland',
    categorySlug: 'sound-crackers',
    mrp: 220,
    offerPrice: 85,
    unit: '1 Box',
    stock: 180,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1533230307785-64e03d98782f?w=600&auto=format&fit=crop&q=80',
    description: '100 uninterrupted synchronized explosions with intense festive rhythm.',
  },
  {
    name: 'Mega 1000 Wala Sound Ladi',
    slug: 'mega-1000-wala-sound-ladi',
    categorySlug: 'sound-crackers',
    mrp: 1600,
    offerPrice: 650,
    unit: '1 Pack',
    stock: 75,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=600&auto=format&fit=crop&q=80',
    description: 'Massive long festival roll with deep sound impact for peak celebration moments.',
  },

  // Ground Chakkars
  {
    name: 'Special Ground Chakkar Big',
    slug: 'special-ground-chakkar-big',
    categorySlug: 'ground-chakkars',
    mrp: 240,
    offerPrice: 90,
    unit: '1 Box (10 Pcs)',
    stock: 200,
    isBestSeller: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1533230307785-64e03d98782f?w=600&auto=format&fit=crop&q=80',
    description: 'High-speed spinning wheel producing a vibrant golden halo of sparkling embers.',
  },
  {
    name: 'Deluxe Ground Chakkar Deluxe',
    slug: 'deluxe-ground-chakkar-deluxe',
    categorySlug: 'ground-chakkars',
    mrp: 380,
    offerPrice: 140,
    unit: '1 Box (10 Pcs)',
    stock: 150,
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=600&auto=format&fit=crop&q=80',
    description: 'Long duration rotation with dynamic multi-color shifts from silver to emerald.',
  },
  {
    name: 'Rotating Disco Wheel (Plastics)',
    slug: 'rotating-disco-wheel',
    categorySlug: 'ground-chakkars',
    mrp: 420,
    offerPrice: 160,
    unit: '1 Box (5 Pcs)',
    stock: 90,
    isNewArrival: true,
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80',
    description: 'Futuristic whistle-spinning multi-colour disc with ultra-bright strobe lights.',
  },

  // Flower Pots & Fountains
  {
    name: 'Tri-Colour Flower Pots Special',
    slug: 'tri-colour-flower-pots',
    categorySlug: 'flower-pots',
    mrp: 320,
    offerPrice: 120,
    unit: '1 Box (10 Pcs)',
    stock: 160,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=600&auto=format&fit=crop&q=80',
    description: 'Classic conical fountain reaching 12 feet high with brilliant cascade of golden rain.',
  },
  {
    name: 'Grand Ashoka Flower Pot Deluxe',
    slug: 'grand-ashoka-flower-pot',
    categorySlug: 'flower-pots',
    mrp: 520,
    offerPrice: 195,
    unit: '1 Box (5 Pcs)',
    stock: 110,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80',
    description: 'Extra tall sparkling fountain with majestic floral crowns of silver and ruby sparks.',
  },
  {
    name: 'Peacock Feathers 3-Step Fountain',
    slug: 'peacock-feathers-fountain',
    categorySlug: 'flower-pots',
    mrp: 650,
    offerPrice: 240,
    unit: '1 Pc',
    stock: 80,
    isNewArrival: true,
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=600&auto=format&fit=crop&q=80',
    description: 'Simulates dancing peacock plume with three successive heights and color transitions.',
  },

  // Sparklers & Twinklers
  {
    name: 'Gold Sparklers 15 cm',
    slug: 'gold-sparklers-15cm',
    categorySlug: 'sparklers',
    mrp: 90,
    offerPrice: 32,
    unit: '1 Box (10 Pcs)',
    stock: 400,
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=600&auto=format&fit=crop&q=80',
    description: 'Safe, smooth-burning golden sparklers ideal for children and family fun.',
  },
  {
    name: 'Electric Silver Sparklers 30 cm',
    slug: 'electric-silver-sparklers-30cm',
    categorySlug: 'sparklers',
    mrp: 180,
    offerPrice: 65,
    unit: '1 Box (10 Pcs)',
    stock: 350,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80',
    description: 'Long burning brilliant white-silver sparks with virtually zero smoke emission.',
  },
  {
    name: 'Mega Giant Colour Sparklers 50 cm',
    slug: 'giant-colour-sparklers-50cm',
    categorySlug: 'sparklers',
    mrp: 350,
    offerPrice: 130,
    unit: '1 Box (5 Pcs)',
    stock: 220,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=600&auto=format&fit=crop&q=80',
    description: 'Super long 3-minute burning giant sparkler in vibrant ruby red and emerald green.',
  },

  // Sky Rockets
  {
    name: 'Whistling Sky Rocket',
    slug: 'whistling-sky-rocket',
    categorySlug: 'rockets',
    mrp: 240,
    offerPrice: 95,
    unit: '1 Box (10 Pcs)',
    stock: 140,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80',
    description: 'High velocity ascending rocket with high-pitched whistle and sparkling canopy burst.',
  },
  {
    name: 'Lunik Parachute Night Rocket',
    slug: 'lunik-parachute-rocket',
    categorySlug: 'rockets',
    mrp: 450,
    offerPrice: 175,
    unit: '1 Box (5 Pcs)',
    stock: 90,
    isNewArrival: true,
    image: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=600&auto=format&fit=crop&q=80',
    description: 'Ascends 150 feet and releases a floating glowing parachute drifting across the sky.',
  },

  // Aerial Shots & Night Sky
  {
    name: '7 Shots Multi-Colour Repeating',
    slug: '7-shots-multi-colour',
    categorySlug: 'aerial-shots',
    mrp: 380,
    offerPrice: 145,
    unit: '1 Pc',
    stock: 180,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=600&auto=format&fit=crop&q=80',
    description: 'Rapid-fire 7 vertical aerial bursts painting the night sky in sequential colors.',
  },
  {
    name: '12 Shots Grand Sky Display',
    slug: '12-shots-grand-sky',
    categorySlug: 'aerial-shots',
    mrp: 680,
    offerPrice: 260,
    unit: '1 Pc',
    stock: 120,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80',
    description: '12 synchronized aerial shells exploding with palm tree and willow brocade effects.',
  },
  {
    name: '30 Shots Mega Celebration Cake',
    slug: '30-shots-mega-cake',
    categorySlug: 'aerial-shots',
    mrp: 1800,
    offerPrice: 720,
    unit: '1 Pc',
    stock: 65,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80',
    description: 'The pinnacle of Diwali aerial fireworks. 30 nonstop sky thunder bursts with golden glitter.',
  },

  // Diwali Gift Boxes
  {
    name: 'Family Celebration Gift Box (32 Items)',
    slug: 'family-celebration-gift-box',
    categorySlug: 'gift-boxes',
    mrp: 3200,
    offerPrice: 1250,
    unit: '1 Deluxe Box',
    stock: 80,
    isBestSeller: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
    description: 'Complete family assortment with ground chakkars, pots, sparklers, rockets, and bijilis.',
  },
  {
    name: 'VIP Royal Maharaja Hamper (55 Items)',
    slug: 'vip-royal-maharaja-hamper',
    categorySlug: 'gift-boxes',
    mrp: 6500,
    offerPrice: 2450,
    unit: '1 Luxury Hamper',
    stock: 45,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
    description: 'Ultimate Diwali VIP gift pack. Contains premium repeaters, grand fountains, and specialty novelties.',
  },
  {
    name: 'Children Delight Sparkler & Novelty Pack',
    slug: 'children-delight-pack',
    categorySlug: 'fancy-items',
    mrp: 1400,
    offerPrice: 550,
    unit: '1 Box (20 Items)',
    stock: 120,
    isNewArrival: true,
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=600&auto=format&fit=crop&q=80',
    description: 'Zero sound, high visual delight. Snappers, color smoke, serpents, mini fountains and sparklers.',
  },
]

async function main() {
  console.log('🌱 Seeding database with clean English catalog and real photos...')

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@aachipattasu.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456'
  const hashedPassword = await bcrypt.hash(adminPassword, 12)

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Store Administrator',
      role: 'OWNER',
    },
  })

  // Seed Categories
  const catMap: Record<string, string> = {}
  for (const cat of categories) {
    const saved = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    })
    catMap[saved.slug] = saved.id
  }

  // Seed Settings
  for (const setting of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
  }

  // Seed Products
  for (const p of products) {
    const { categorySlug, image, ...productData } = p
    const catId = catMap[categorySlug]
    if (!catId) continue

    const created = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {
        ...productData,
        nameTa: productData.name, // Clean English mirror
        categoryId: catId,
      },
      create: {
        ...productData,
        nameTa: productData.name, // Clean English mirror
        categoryId: catId,
      },
    })

    if (image) {
      await prisma.productImage.deleteMany({
        where: { productId: created.id },
      })
      await prisma.productImage.create({
        data: {
          productId: created.id,
          url: image,
          alt: productData.name,
          sortOrder: 0,
        },
      })
    }
  }

  console.log('🎉 Seed complete! Catalog is 100% English with verified images.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
