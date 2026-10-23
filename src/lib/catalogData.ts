export interface CatalogProduct {
  id: string
  name: string
  nameTa: string
  slug: string
  mrp: number
  offerPrice: number
  unit: string
  stock: number
  inStock: boolean
  isFeatured: boolean
  isNewArrival: boolean
  isBestSeller: boolean
  description: string
  images: { url: string }[]
  category: {
    id: string
    name: string
    nameTa: string
    slug: string
  }
}

export interface CatalogCategory {
  id: string
  name: string
  nameTa: string
  slug: string
  icon?: string | null
  image?: string | null
  sortOrder: number
  isActive: boolean
}

export const DEFAULT_CATEGORIES: CatalogCategory[] = [
  {
    id: 'cat-sound',
    name: 'Sound Crackers',
    nameTa: 'வெடி & சரவெடி வகைகள்',
    slug: 'sound-crackers',
    icon: '💥',
    image: '/images/products/red-bijili.jpg',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'cat-chakkars',
    name: 'Ground Chakkars',
    nameTa: 'தரை சக்கரம்',
    slug: 'ground-chakkars',
    icon: '🌀',
    image: '/images/products/zamin-chakkars.jpg',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'cat-pots',
    name: 'Flower Pots & Fountains',
    nameTa: 'பூந்தொட்டி & பவுண்டன்',
    slug: 'flower-pots',
    icon: '🌸',
    image: '/images/products/deluxe-flower-pots.jpg',
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 'cat-sparklers',
    name: 'Sparklers & Twinklers',
    nameTa: 'கம்பி மத்தாப்பு',
    slug: 'sparklers',
    icon: '✨',
    image: '/images/products/electric-sparklers.jpg',
    sortOrder: 4,
    isActive: true,
  },
  {
    id: 'cat-rockets',
    name: 'Sky Rockets',
    nameTa: 'வான ராக்கெட்டுகள்',
    slug: 'rockets',
    icon: '🚀',
    image: '/images/products/sky-rockets.jpg',
    sortOrder: 5,
    isActive: true,
  },
  {
    id: 'cat-aerial',
    name: 'Aerial Shots & Night Sky',
    nameTa: 'வான்வேடிக்கை & ரிப்பீட்டர்',
    slug: 'aerial-shots',
    icon: '🎆',
    image: '/images/products/one-and-only-5inch.jpg',
    sortOrder: 6,
    isActive: true,
  },
  {
    id: 'cat-gift',
    name: 'Diwali Gift Boxes',
    nameTa: 'தீபாவளி பரிசு பெட்டிகள்',
    slug: 'gift-boxes',
    icon: '🎁',
    image: '/images/products/diwali-gift-box.jpg',
    sortOrder: 7,
    isActive: true,
  },
  {
    id: 'cat-fancy',
    name: 'Kids & Fancy Novelties',
    nameTa: 'குழந்தைகள் ஸ்பெஷல்',
    slug: 'fancy-items',
    icon: '⭐',
    image: '/images/products/kids-fancy-pack.jpg',
    sortOrder: 8,
    isActive: true,
  },
]

export function getCategoryImageUrl(cat?: { slug?: string | null; name?: string | null; image?: string | null }): string {
  if (cat?.image && typeof cat.image === 'string' && cat.image.trim().length > 0) {
    return cat.image
  }
  const s = `${cat?.slug || ''} ${cat?.name || ''}`.toLowerCase()
  if (s.includes('chakkar') || s.includes('wheel')) return '/images/products/zamin-chakkars.jpg'
  if (s.includes('pot') || s.includes('flower')) return '/images/products/deluxe-flower-pots.jpg'
  if (s.includes('fountain') || s.includes('dice')) return '/images/products/dice-fountain.jpg'
  if (s.includes('peacock')) return '/images/products/peacock-fountain-box.jpg'
  if (s.includes('sparkler') || s.includes('twinkl') || s.includes('shower')) return '/images/products/electric-sparklers.jpg'
  if (s.includes('rocket')) return '/images/products/sky-rockets.jpg'
  if (s.includes('aerial') || s.includes('shot') || s.includes('repeater') || s.includes('cake') || s.includes('set-out')) return '/images/products/aerial-mega-cake.jpg'
  if (s.includes('gift') || s.includes('box')) return '/images/products/diwali-gift-box.jpg'
  if (s.includes('fancy') || s.includes('kid') || s.includes('novelty') || s.includes('match')) return '/images/products/kids-fancy-pack.jpg'
  if (s.includes('chorsa') || s.includes('bomb') || s.includes('hydro')) return '/images/products/chorsa-cracker-pack.jpg'
  if (s.includes('garland') || s.includes('ladi')) return '/images/products/ladi-sound-garland.jpg'
  if (s.includes('bijili') || s.includes('sound')) return '/images/products/red-bijili.jpg'
  return '/images/products/deluxe-flower-pots.jpg'
}

export const DEFAULT_PRODUCTS: CatalogProduct[] = [
  // Sound Crackers
  {
    id: 'prod-bijili',
    name: 'Red Bijili Crackers',
    nameTa: 'சிவப்பு பிஜிலி பட்டாசு (100 பீஸ்)',
    slug: 'red-bijili-crackers',
    mrp: 140,
    offerPrice: 50,
    unit: '1 Pack (100 Pcs)',
    stock: 250,
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    description: 'Crisp, sharp single sound bijili crackers. 100% Sivakasi standard formulation.',
    images: [{ url: '/images/products/red-bijili.jpg' }],
    category: { id: 'cat-sound', name: 'Sound Crackers', nameTa: 'வெடி & சரவெடி வகைகள்', slug: 'sound-crackers' },
  },
  {
    id: 'prod-chorsa-28',
    name: 'Classic 28 Chorsa Ladi',
    nameTa: '28 சோர்சா சரவெடி',
    slug: 'classic-28-chorsa-ladi',
    mrp: 90,
    offerPrice: 35,
    unit: '1 Box',
    stock: 300,
    inStock: true,
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    description: 'Traditional continuous sound garland crackers with sparkling finale.',
    images: [{ url: '/images/products/chorsa-cracker-pack.jpg' }],
    category: { id: 'cat-sound', name: 'Sound Crackers', nameTa: 'வெடி & சரவெடி வகைகள்', slug: 'sound-crackers' },
  },
  {
    id: 'prod-garland-100',
    name: 'Deluxe 100 Sound Garland',
    nameTa: '100 வாலா சரவெடி',
    slug: 'deluxe-100-sound-garland',
    mrp: 220,
    offerPrice: 85,
    unit: '1 Box',
    stock: 180,
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    description: '100 uninterrupted synchronized explosions with intense festive rhythm.',
    images: [{ url: '/images/products/ladi-sound-garland.jpg' }],
    category: { id: 'cat-sound', name: 'Sound Crackers', nameTa: 'வெடி & சரவெடி வகைகள்', slug: 'sound-crackers' },
  },
  {
    id: 'prod-mega-1000',
    name: 'Mega 1000 Wala Sound Ladi',
    nameTa: '1000 வாலா மெகா சரவெடி',
    slug: 'mega-1000-wala-sound-ladi',
    mrp: 1600,
    offerPrice: 650,
    unit: '1 Pack',
    stock: 75,
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    description: 'Massive long festival roll with deep sound impact for peak celebration moments.',
    images: [{ url: '/images/products/ladi-sound-garland.jpg' }],
    category: { id: 'cat-sound', name: 'Sound Crackers', nameTa: 'வெடி & சரவெடி வகைகள்', slug: 'sound-crackers' },
  },

  // Ground Chakkars
  {
    id: 'prod-chakkar-big',
    name: 'Special Ground Chakkar Big',
    nameTa: 'ஸ்பெஷல் தரை சக்கரம் பெரியது',
    slug: 'special-ground-chakkar-big',
    mrp: 240,
    offerPrice: 90,
    unit: '1 Box (10 Pcs)',
    stock: 200,
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    description: 'High-speed spinning wheel producing a vibrant golden halo of sparkling embers.',
    images: [{ url: '/images/products/zamin-chakkars.jpg' }],
    category: { id: 'cat-chakkars', name: 'Ground Chakkars', nameTa: 'தரை சக்கரம்', slug: 'ground-chakkars' },
  },
  {
    id: 'prod-chakkar-deluxe',
    name: 'Deluxe Ground Chakkar Deluxe',
    nameTa: 'டீலக்ஸ் தரை சக்கரம்',
    slug: 'deluxe-ground-chakkar-deluxe',
    mrp: 380,
    offerPrice: 140,
    unit: '1 Box (10 Pcs)',
    stock: 150,
    inStock: true,
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    description: 'Long duration rotation with dynamic multi-color shifts from silver to emerald.',
    images: [{ url: '/images/products/zamin-chakkars.jpg' }],
    category: { id: 'cat-chakkars', name: 'Ground Chakkars', nameTa: 'தரை சக்கரம்', slug: 'ground-chakkars' },
  },
  {
    id: 'prod-disco-wheel',
    name: 'Rotating Disco Wheel (Plastics)',
    nameTa: 'சுழலும் டிஸ்கோ சக்கரம்',
    slug: 'rotating-disco-wheel',
    mrp: 420,
    offerPrice: 160,
    unit: '1 Box (5 Pcs)',
    stock: 90,
    inStock: true,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    description: 'Futuristic whistle-spinning multi-colour disc with ultra-bright strobe lights.',
    images: [{ url: '/images/products/zamin-chakkars.jpg' }],
    category: { id: 'cat-chakkars', name: 'Ground Chakkars', nameTa: 'தரை சக்கரம்', slug: 'ground-chakkars' },
  },

  // Flower Pots & Fountains
  {
    id: 'prod-pots-special',
    name: 'Tri-Colour Flower Pots Special',
    nameTa: 'முவர்ண பூந்தொட்டி ஸ்பெஷல்',
    slug: 'tri-colour-flower-pots',
    mrp: 320,
    offerPrice: 120,
    unit: '1 Box (10 Pcs)',
    stock: 160,
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    description: 'Classic conical fountain reaching 12 feet high with brilliant cascade of golden rain.',
    images: [{ url: '/images/products/deluxe-flower-pots.jpg' }],
    category: { id: 'cat-pots', name: 'Flower Pots & Fountains', nameTa: 'பூந்தொட்டி & பவுண்டன்', slug: 'flower-pots' },
  },
  {
    id: 'prod-ashoka-pot',
    name: 'Grand Ashoka Flower Pot Deluxe',
    nameTa: 'அசோகா டீலக்ஸ் பூந்தொட்டி',
    slug: 'grand-ashoka-flower-pot',
    mrp: 520,
    offerPrice: 195,
    unit: '1 Box (5 Pcs)',
    stock: 110,
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    description: 'Extra tall sparkling fountain with majestic floral crowns of silver and ruby sparks.',
    images: [{ url: '/images/products/peacock-fountain-box.jpg' }],
    category: { id: 'cat-pots', name: 'Flower Pots & Fountains', nameTa: 'பூந்தொட்டி & பவுண்டன்', slug: 'flower-pots' },
  },
  {
    id: 'prod-peacock-fountain',
    name: 'Premium Dice 3-Step Fountain',
    nameTa: 'டைஸ் வண்ண பவுண்டன்',
    slug: 'peacock-feathers-fountain',
    mrp: 650,
    offerPrice: 240,
    unit: '1 Pc',
    stock: 80,
    inStock: true,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    description: 'Simulates dancing plume with three successive heights and color transitions.',
    images: [{ url: '/images/products/dice-fountain.jpg' }],
    category: { id: 'cat-pots', name: 'Flower Pots & Fountains', nameTa: 'பூந்தொட்டி & பவுண்டன்', slug: 'flower-pots' },
  },

  // Sparklers & Twinklers
  {
    id: 'prod-sparklers-15',
    name: 'Gold Sparklers 15 cm',
    nameTa: '15 செ.மீ தங்க கம்பி மத்தாப்பு',
    slug: 'gold-sparklers-15cm',
    mrp: 90,
    offerPrice: 32,
    unit: '1 Box (10 Pcs)',
    stock: 400,
    inStock: true,
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    description: 'Safe, smooth-burning golden sparklers ideal for children and family fun.',
    images: [{ url: '/images/products/electric-sparklers.jpg' }],
    category: { id: 'cat-sparklers', name: 'Sparklers & Twinklers', nameTa: 'கம்பி மத்தாப்பு', slug: 'sparklers' },
  },
  {
    id: 'prod-sparklers-30',
    name: 'Electric Silver Sparklers 30 cm',
    nameTa: '30 செ.மீ எலக்ட்ரிக் வெள்ளி மத்தாப்பு',
    slug: 'electric-silver-sparklers-30cm',
    mrp: 180,
    offerPrice: 65,
    unit: '1 Box (10 Pcs)',
    stock: 350,
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    description: 'Long burning brilliant white-silver sparks with virtually zero smoke emission.',
    images: [{ url: '/images/products/electric-sparklers.jpg' }],
    category: { id: 'cat-sparklers', name: 'Sparklers & Twinklers', nameTa: 'கம்பி மத்தாப்பு', slug: 'sparklers' },
  },
  {
    id: 'prod-sparklers-50',
    name: 'Mega Giant Colour Sparklers 50 cm',
    nameTa: '50 செ.மீ ராட்சத வண்ண மத்தாப்பு',
    slug: 'giant-colour-sparklers-50cm',
    mrp: 350,
    offerPrice: 130,
    unit: '1 Box (5 Pcs)',
    stock: 220,
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    description: 'Super long 3-minute burning giant sparkler in vibrant ruby red and emerald green.',
    images: [{ url: '/images/products/electric-sparklers.jpg' }],
    category: { id: 'cat-sparklers', name: 'Sparklers & Twinklers', nameTa: 'கம்பி மத்தாப்பு', slug: 'sparklers' },
  },

  // Sky Rockets
  {
    id: 'prod-rocket-whistling',
    name: 'Whistling Sky Rocket',
    nameTa: 'விசிலிங் ஸ்கை ராக்கெட்',
    slug: 'whistling-sky-rocket',
    mrp: 240,
    offerPrice: 95,
    unit: '1 Box (10 Pcs)',
    stock: 140,
    inStock: true,
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    description: 'High velocity ascending rocket with high-pitched whistle and sparkling canopy burst.',
    images: [{ url: '/images/products/sky-rockets.jpg' }],
    category: { id: 'cat-rockets', name: 'Sky Rockets', nameTa: 'வான ராக்கெட்டுகள்', slug: 'rockets' },
  },
  {
    id: 'prod-rocket-parachute',
    name: 'Lunik Parachute Night Rocket',
    nameTa: 'பாராசூட் நைட் ராக்கெட்',
    slug: 'lunik-parachute-rocket',
    mrp: 450,
    offerPrice: 175,
    unit: '1 Box (5 Pcs)',
    stock: 90,
    inStock: true,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    description: 'Ascends 150 feet and releases a floating glowing parachute drifting across the sky.',
    images: [{ url: '/images/products/sky-rockets.jpg' }],
    category: { id: 'cat-rockets', name: 'Sky Rockets', nameTa: 'வான ராக்கெட்டுகள்', slug: 'rockets' },
  },

  // Aerial Shots & Night Sky
  {
    id: 'prod-aerial-7',
    name: '5 Inch One and Only Aerial Repeater',
    nameTa: '5 இன்ச் ஒன் அண்ட் ஒன்லி வான்வெடி',
    slug: '5-inch-one-and-only',
    mrp: 1499,
    offerPrice: 650,
    unit: '1 Box (12 Shots)',
    stock: 180,
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    description: 'Rapid-fire 12 vertical aerial bursts painting the night sky in sequential colors.',
    images: [{ url: '/images/products/one-and-only-5inch.jpg' }],
    category: { id: 'cat-aerial', name: 'Aerial Shots & Night Sky', nameTa: 'வான்வேடிக்கை & ரிப்பீட்டர்', slug: 'aerial-shots' },
  },
  {
    id: 'prod-aerial-12',
    name: '12 Shots Grand Sky Display',
    nameTa: '12 ஷாட்ஸ் கிராண்ட் ஸ்கை டிஸ்ப்ளே',
    slug: '12-shots-grand-sky',
    mrp: 680,
    offerPrice: 260,
    unit: '1 Pc',
    stock: 120,
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    description: '12 synchronized aerial shells exploding with palm tree and willow brocade effects.',
    images: [{ url: '/images/products/one-and-only-5inch.jpg' }],
    category: { id: 'cat-aerial', name: 'Aerial Shots & Night Sky', nameTa: 'வான்வேடிக்கை & ரிப்பீட்டர்', slug: 'aerial-shots' },
  },
  {
    id: 'prod-aerial-30',
    name: '30 Shots Mega Celebration Cake',
    nameTa: '30 ஷாட்ஸ் மெகா கேக் வான்வெடி',
    slug: '30-shots-mega-cake',
    mrp: 1800,
    offerPrice: 720,
    unit: '1 Pc',
    stock: 65,
    inStock: true,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    description: 'The pinnacle of Diwali aerial fireworks. 30 nonstop sky thunder bursts with golden glitter.',
    images: [{ url: '/images/products/aerial-mega-cake.jpg' }],
    category: { id: 'cat-aerial', name: 'Aerial Shots & Night Sky', nameTa: 'வான்வேடிக்கை & ரிப்பீட்டர்', slug: 'aerial-shots' },
  },

  // Diwali Gift Boxes
  {
    id: 'prod-gift-family',
    name: 'Family Celebration Gift Box (32 Items)',
    nameTa: 'குடும்ப தீபாவளி பரிசு பெட்டி (32 ரகங்கள்)',
    slug: 'family-celebration-gift-box',
    mrp: 3200,
    offerPrice: 1250,
    unit: '1 Deluxe Box',
    stock: 80,
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    description: 'Complete family assortment with ground chakkars, pots, sparklers, rockets, and bijilis.',
    images: [{ url: '/images/products/diwali-gift-box.jpg' }],
    category: { id: 'cat-gift', name: 'Diwali Gift Boxes', nameTa: 'தீபாவளி பரிசு பெட்டிகள்', slug: 'gift-boxes' },
  },
  {
    id: 'prod-gift-maharaja',
    name: 'VIP Royal Maharaja Hamper (55 Items)',
    nameTa: 'விஐபி ராயல் மகாராஜா தீபாவளி பெட்டி (55 ரகங்கள்)',
    slug: 'vip-royal-maharaja-hamper',
    mrp: 6500,
    offerPrice: 2450,
    unit: '1 Luxury Hamper',
    stock: 45,
    inStock: true,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    description: 'Ultimate Diwali VIP gift pack. Contains premium repeaters, grand fountains, and specialty novelties.',
    images: [{ url: '/images/products/diwali-gift-box.jpg' }],
    category: { id: 'cat-gift', name: 'Diwali Gift Boxes', nameTa: 'தீபாவளி பரிசு பெட்டிகள்', slug: 'gift-boxes' },
  },
  {
    id: 'prod-fancy-kids',
    name: 'Children Delight Novelty Pack',
    nameTa: 'குழந்தைகள் டிலைட் ஸ்பெஷல் பேக்',
    slug: 'children-delight-pack',
    mrp: 1400,
    offerPrice: 550,
    unit: '1 Box (20 Items)',
    stock: 120,
    inStock: true,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    description: 'Zero sound, high visual delight. Snappers, color smoke, serpents, mini fountains and sparklers.',
    images: [{ url: '/images/products/kids-fancy-pack.jpg' }],
    category: { id: 'cat-fancy', name: 'Kids & Fancy Novelties', nameTa: 'குழந்தைகள் ஸ்பெஷல்', slug: 'fancy-items' },
  },
]
