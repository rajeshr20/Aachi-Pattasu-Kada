import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const categories = [
  { name: 'One Sound Crackers', nameTa: 'ஒரு சத்தம் பட்டாசு', slug: 'one-sound', icon: '💥', sortOrder: 1 },
  { name: 'Bijili Crackers', nameTa: 'பிஜிலி பட்டாசு', slug: 'bijili', icon: '⚡', sortOrder: 2 },
  { name: 'Ground Chakkars', nameTa: 'தரை சக்கரம்', slug: 'ground-chakkars', icon: '🌀', sortOrder: 3 },
  { name: 'Flower Pots', nameTa: 'பூந்தொட்டி', slug: 'flower-pots', icon: '🌸', sortOrder: 4 },
  { name: 'Fountains', nameTa: 'பவுண்டன் வகைகள்', slug: 'fountains', icon: '⛲', sortOrder: 5 },
  { name: 'Peacock Novelties', nameTa: 'மயில் வண்ண விசிறி', slug: 'peacock', icon: '🦚', sortOrder: 6 },
  { name: 'Shower Crackers', nameTa: 'சாரல் மழை வகைகள்', slug: 'shower', icon: '✨', sortOrder: 7 },
  { name: 'Fancy & Aerial Fireworks', nameTa: 'வானவேடிக்கை', slug: 'aerial-fancy', icon: '🎆', sortOrder: 8 },
  { name: 'Repeating Sky Shots', nameTa: 'ரிப்பீட்டிங் ஷாட்ஸ்', slug: 'sky-shots', icon: '🎇', sortOrder: 9 },
  { name: 'Set Out Fireworks', nameTa: 'செட் அவுட் ரகம்', slug: 'set-out', icon: '🌟', sortOrder: 10 },
  { name: 'Twinkling Stars', nameTa: 'மின்மினி நட்சத்திரம்', slug: 'twinkling-star', icon: '⭐', sortOrder: 11 },
  { name: 'Atom & Hydro Bombs', nameTa: 'அணுகுண்டு வகைகள்', slug: 'bombs', icon: '💣', sortOrder: 12 },
  { name: 'Sky Rockets', nameTa: 'வான ராக்கெட்டுகள்', slug: 'rockets', icon: '🚀', sortOrder: 13 },
  { name: 'Match Boxes & Roll Caps', nameTa: 'தீப்பெட்டி ரகங்கள்', slug: 'match-box', icon: '📦', sortOrder: 14 },
  { name: 'Sparklers', nameTa: 'கம்பி மத்தாப்பு', slug: 'sparklers', icon: '🪄', sortOrder: 15 },
  { name: 'Diwali Gift Boxes', nameTa: 'தீபாவளி பரிசு பெட்டிகள்', slug: 'gift-boxes', icon: '🎁', sortOrder: 16 },
]

const brands = [
  { name: 'Standard Fireworks', nameTa: 'ஸ்டாண்டர்ட் பட்டாசு', slug: 'standard-fireworks', sortOrder: 1 },
  { name: 'Sony Fireworks', nameTa: 'சோனி பட்டாசு', slug: 'sony-fireworks', sortOrder: 2 },
  { name: 'Coronation Fireworks', nameTa: 'கொரோனேஷன் பட்டாசு', slug: 'coronation-fireworks', sortOrder: 3 },
]

const defaultSettings = [
  { key: 'shop_name', value: 'Aachi Pattasu Kadai' },
  { key: 'shop_name_ta', value: 'ஆச்சி பட்டாசு கடை' },
  { key: 'location', value: 'Opposite Aachi Mess, Perumanallur, Tirupur — 641666' },
  { key: 'location_ta', value: 'ஆச்சிமெஸ் எதிரில், பெருமாநல்லூர், திருப்பூர் — 641666' },
  { key: 'phone1', value: '9500565391' },
  { key: 'phone2', value: '7708632966' },
  { key: 'whatsapp', value: '919500565391' },
  { key: 'status_mode', value: 'Open' }, // Open | Coming Soon (விரைவில்)
  { key: 'min_order', value: '3000' },
  { key: 'delivery_notice', value: 'Transport charges are paid by the customer, either to the transporter on collection or at booking, depending on the transporter.' },
  { key: 'legal_notice', value: 'Online sale of firecrackers with instant payment is restricted in India. This website operates as an order-request catalogue. Orders are confirmed over phone or WhatsApp within 24 hours. Payments are accepted only after personal verification.' },
  { key: 'announcement_bar', value: 'Festive offers live · GST invoice available · Parcel & pickup' },
  { key: 'announcement_bar_enabled', value: 'true' },
  { key: 'email', value: '' },
  { key: 'gstin', value: '' },
  { key: 'peso_licence', value: '' },
  { key: 'established_year', value: '' },
  { key: 'owner_name', value: '' },
  { key: 'owner_quote', value: '' },
  { key: 'upi_id', value: '9500565391@okaxis' },
  { key: 'bank_name', value: 'State Bank of India' },
  { key: 'bank_account', value: '' },
  { key: 'bank_ifsc', value: '' },
]

async function main() {
  console.log('Seeding Aachi Pattasu Kadai v2 database...')

  // 1. Admin user
  const hashedPassword = await bcrypt.hash('Admin@123456', 10)
  await prisma.user.upsert({
    where: { email: 'admin@aachipattasu.com' },
    update: {},
    create: {
      email: 'admin@aachipattasu.com',
      password: hashedPassword,
      name: 'Store Manager',
      role: 'OWNER',
    },
  })

  // 2. Settings
  for (const s of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    })
  }

  // 3. Brands
  const createdBrands: Record<string, string> = {}
  for (const b of brands) {
    const brand = await prisma.brand.upsert({
      where: { slug: b.slug },
      update: { name: b.name, nameTa: b.nameTa, sortOrder: b.sortOrder },
      create: b,
    })
    createdBrands[b.slug] = brand.id
  }

  // 4. Categories
  const createdCategories: Record<string, string> = {}
  for (const c of categories) {
    const category = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, nameTa: c.nameTa, icon: c.icon, sortOrder: c.sortOrder },
      create: c,
    })
    createdCategories[c.slug] = category.id
  }

  // 5. Welcome Coupon
  await prisma.coupon.upsert({
    where: { code: 'WELCOME5' },
    update: {},
    create: {
      code: 'WELCOME5',
      type: 'PERCENT',
      value: 5,
      minCartValue: 3000,
      isActive: true,
    },
  })

  // 6. Sample Products with Variants & Wholesale Tiers (10+ units)
  const sampleProducts = [
    {
      name: 'Red Bijili Crackers',
      nameTa: 'சிவப்பு பிஜிலி பட்டாசு (100 பீஸ்)',
      slug: 'red-bijili-crackers',
      categorySlug: 'bijili',
      brandSlug: 'standard-fireworks',
      image: '/images/products/red-bijili.jpg',
      mrp: 140,
      offerPrice: 50,
      unit: '1 Pack (100 Pcs)',
      isBestSeller: true,
      isFeatured: true,
      isLicensed: true,
      variants: [
        { name: '1 Pack (100 Pcs)', packText: '1 Pack – 100 Pcs', mrp: 140, price: 50, isDefault: true },
        { name: '5 Packs Bundle', packText: '5 Packs – Box', mrp: 700, price: 230, isDefault: false },
      ],
      wholesaleTier: { minQty: 10, unitPrice: 42 },
    },
    {
      name: 'Classic 28 Chorsa Ladi',
      nameTa: '28 சோர்சா சரவெடி',
      slug: 'classic-28-chorsa-ladi',
      categorySlug: 'one-sound',
      brandSlug: 'standard-fireworks',
      image: '/images/products/red-bijili.jpg',
      mrp: 90,
      offerPrice: 35,
      unit: '1 Box',
      isBestSeller: false,
      isFeatured: false,
      isLicensed: true,
      wholesaleTier: { minQty: 10, unitPrice: 28 },
    },
    {
      name: 'Deluxe 100 Sound Garland',
      nameTa: '100 வாலா சரவெடி',
      slug: 'deluxe-100-sound-garland',
      categorySlug: 'one-sound',
      brandSlug: 'sony-fireworks',
      image: '/images/products/red-bijili.jpg',
      mrp: 220,
      offerPrice: 85,
      unit: '1 Box',
      isBestSeller: true,
      isFeatured: true,
      isLicensed: true,
      wholesaleTier: { minQty: 10, unitPrice: 75 },
    },
    {
      name: 'Special Ground Chakkar Big',
      nameTa: 'ஸ்பெஷல் தரை சக்கரம் பெரியது',
      slug: 'special-ground-chakkar-big',
      categorySlug: 'ground-chakkars',
      brandSlug: 'standard-fireworks',
      image: '/images/products/zamin-chakkars.jpg',
      mrp: 240,
      offerPrice: 90,
      unit: '1 Box (10 Pcs)',
      isBestSeller: true,
      isFeatured: true,
      isLicensed: true,
      variants: [
        { name: '1 Box (10 Pcs)', packText: '1 Box – 10 Pcs', mrp: 240, price: 90, isDefault: true },
        { name: 'Family Pack (20 Pcs)', packText: '2 Boxes – 20 Pcs', mrp: 480, price: 170, isDefault: false },
      ],
      wholesaleTier: { minQty: 10, unitPrice: 78 },
    },
    {
      name: 'Tri-Colour Flower Pots Special',
      nameTa: 'முவர்ண பூந்தொட்டி ஸ்பெஷல்',
      slug: 'tri-colour-flower-pots',
      categorySlug: 'flower-pots',
      brandSlug: 'coronation-fireworks',
      image: '/images/products/deluxe-flower-pots.jpg',
      mrp: 320,
      offerPrice: 120,
      unit: '1 Box (10 Pcs)',
      isBestSeller: true,
      isFeatured: true,
      isLicensed: true,
      wholesaleTier: { minQty: 10, unitPrice: 105 },
    },
    {
      name: 'Grand Ashoka Flower Pot Deluxe',
      nameTa: 'அசோகா டீலக்ஸ் பூந்தொட்டி',
      slug: 'grand-ashoka-flower-pot',
      categorySlug: 'flower-pots',
      brandSlug: 'standard-fireworks',
      image: '/images/products/deluxe-flower-pots.jpg',
      mrp: 520,
      offerPrice: 195,
      unit: '1 Box (5 Pcs)',
      isBestSeller: true,
      isFeatured: true,
      isLicensed: true,
      wholesaleTier: { minQty: 10, unitPrice: 175 },
    },
    {
      name: 'Gold Sparklers 15 cm',
      nameTa: '15 செ.மீ தங்க கம்பி மத்தாப்பு',
      slug: 'gold-sparklers-15cm',
      categorySlug: 'sparklers',
      brandSlug: 'standard-fireworks',
      image: '/images/products/electric-sparklers.jpg',
      mrp: 80,
      offerPrice: 32,
      unit: '1 Box (10 Sticks)',
      isBestSeller: true,
      isFeatured: false,
      isLicensed: true,
      wholesaleTier: { minQty: 10, unitPrice: 26 },
    },
    {
      name: 'Electric Silver Sparklers 30 cm',
      nameTa: '30 செ.மீ எலக்ட்ரிக் வெள்ளி மத்தாப்பு',
      slug: 'electric-silver-sparklers-30cm',
      categorySlug: 'sparklers',
      brandSlug: 'sony-fireworks',
      image: '/images/products/electric-sparklers.jpg',
      mrp: 180,
      offerPrice: 65,
      unit: '1 Box (10 Sticks)',
      isBestSeller: true,
      isFeatured: true,
      isLicensed: true,
      wholesaleTier: { minQty: 10, unitPrice: 55 },
    },
    {
      name: '5 Inch One and Only Aerial Repeater',
      nameTa: '5 இன்ச் ஒன் அண்ட் ஒன்லி வான்வெடி',
      slug: '5-inch-one-and-only',
      categorySlug: 'aerial-fancy',
      brandSlug: 'sony-fireworks',
      image: '/images/products/one-and-only-5inch.jpg',
      mrp: 1499,
      offerPrice: 650,
      unit: '1 Box (12 Shots)',
      isBestSeller: true,
      isFeatured: true,
      isLicensed: true,
      wholesaleTier: { minQty: 5, unitPrice: 580 },
    },
    {
      name: '30 Shots Mega Celebration Cake',
      nameTa: '30 ஷாட்ஸ் மெகா கேக் வான்வெடி',
      slug: '30-shots-mega-cake',
      categorySlug: 'sky-shots',
      brandSlug: 'standard-fireworks',
      image: '/images/products/aerial-mega-cake.jpg',
      mrp: 1800,
      offerPrice: 720,
      unit: '1 Box',
      isNewArrival: true,
      isFeatured: true,
      isBestSeller: true,
      isLicensed: true,
      wholesaleTier: { minQty: 5, unitPrice: 650 },
    },
    {
      name: 'Whistling Sky Rockets (10 Pcs)',
      nameTa: 'விசிலிங் ஸ்கை ராக்கெட்டுகள் (10 Pcs)',
      slug: 'whistling-sky-rocket',
      categorySlug: 'rockets',
      brandSlug: 'standard-fireworks',
      image: '/images/products/sky-rockets.jpg',
      mrp: 399,
      offerPrice: 160,
      unit: '1 Pack (10 Pcs)',
      isNewArrival: true,
      isFeatured: true,
      isBestSeller: true,
      isLicensed: true,
      wholesaleTier: { minQty: 10, unitPrice: 135 },
    },
    {
      name: 'Premium Dice 3-Step Fountain',
      nameTa: 'டைஸ் வண்ண பவுண்டன்',
      slug: 'peacock-feathers-fountain',
      categorySlug: 'fountains',
      brandSlug: 'coronation-fireworks',
      image: '/images/products/dice-fountain.jpg',
      mrp: 650,
      offerPrice: 240,
      unit: '1 Box (6 Pcs)',
      isNewArrival: true,
      isFeatured: true,
      isLicensed: true,
      wholesaleTier: { minQty: 10, unitPrice: 210 },
    },
    {
      name: 'Children Delight Novelty Pack',
      nameTa: 'குழந்தைகள் டிலைட் ஸ்பெஷல் பேக்',
      slug: 'children-delight-pack',
      categorySlug: 'peacock',
      brandSlug: 'standard-fireworks',
      image: '/images/products/kids-fancy-pack.jpg',
      mrp: 1400,
      offerPrice: 550,
      unit: '1 Box (20 Items)',
      isNewArrival: true,
      isFeatured: true,
      isLicensed: true,
      wholesaleTier: { minQty: 5, unitPrice: 480 },
    },
    {
      name: 'Family Delight Diwali Gift Box (35 Items)',
      nameTa: 'குடும்ப தீபாவளி பரிசு பெட்டி (35 ரகங்கள்)',
      slug: 'family-delight-gift-box',
      categorySlug: 'gift-boxes',
      brandSlug: 'standard-fireworks',
      image: '/images/products/diwali-gift-box.jpg',
      mrp: 2800,
      offerPrice: 990,
      unit: '1 Deluxe Box',
      isBestSeller: true,
      isFeatured: true,
      isLicensed: true,
      wholesaleTier: { minQty: 5, unitPrice: 890 },
    },
  ]

  for (const sp of sampleProducts) {
    const categoryId = createdCategories[sp.categorySlug] || Object.values(createdCategories)[0]
    const brandId = createdBrands[sp.brandSlug] || Object.values(createdBrands)[0]

    const prod = await prisma.product.upsert({
      where: { slug: sp.slug },
      update: {
        name: sp.name,
        nameTa: sp.nameTa,
        mrp: sp.mrp,
        offerPrice: sp.offerPrice,
        unit: sp.unit,
        isBestSeller: sp.isBestSeller,
        isFeatured: sp.isFeatured,
        isNewArrival: sp.isNewArrival || false,
        isLicensed: sp.isLicensed,
      },
      create: {
        name: sp.name,
        nameTa: sp.nameTa,
        slug: sp.slug,
        categoryId,
        brandId,
        mrp: sp.mrp,
        offerPrice: sp.offerPrice,
        unit: sp.unit,
        stock: 100,
        inStock: true,
        isBestSeller: sp.isBestSeller,
        isFeatured: sp.isFeatured,
        isNewArrival: sp.isNewArrival || false,
        isLicensed: sp.isLicensed,
      },
    })

    // Product Image
    if (sp.image) {
      await prisma.productImage.deleteMany({ where: { productId: prod.id } }).catch(() => {})
      await prisma.productImage.create({
        data: {
          productId: prod.id,
          url: sp.image,
          alt: sp.name,
          sortOrder: 0,
        },
      }).catch(() => {})
    }

    // Variants if defined
    if (sp.variants) {
      await prisma.productVariant.deleteMany({ where: { productId: prod.id } }).catch(() => {})
      for (const v of sp.variants) {
        await prisma.productVariant.create({
          data: {
            productId: prod.id,
            name: v.name,
            packText: v.packText,
            mrp: v.mrp,
            price: v.price,
            isDefault: v.isDefault,
          },
        }).catch(() => {})
      }
    }

    // Wholesale Tier
    if (sp.wholesaleTier) {
      await prisma.wholesaleTier.deleteMany({ where: { productId: prod.id } }).catch(() => {})
      await prisma.wholesaleTier.create({
        data: {
          productId: prod.id,
          minQty: sp.wholesaleTier.minQty,
          unitPrice: sp.wholesaleTier.unitPrice,
        },
      }).catch(() => {})
    }
  }

  console.log('✅ Seeding complete successfully.')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
