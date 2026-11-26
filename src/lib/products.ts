// KINETIQ Catalog Data Layer
// 24 Full Production Sneakers across TERRA, PULSE, and FORM collections
import { generateProductSvg, type CollectionSlug } from './assets';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  collection: CollectionSlug;
  subtitle: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  weight: number;      // Grams
  drop: number;        // mm
  stack: number;       // mm
  rating: number;
  ratingCount: number;
  primaryImage: string;
  hoverImage: string;
  sizes: number[];
  colors: ProductColor[];
  isFeatured: boolean;
  isNew: boolean;
  inStock: boolean;
  upper: string;
  outsole: string;
}

// 24 Curated Production Sneakers
export const ALL_PRODUCTS: ProductItem[] = [
  // ==========================================
  // PULSE COLLECTION (8 Products)
  // ==========================================
  {
    id: 'prod-pulse-01',
    slug: 'pulse-01',
    name: 'PULSE 01',
    collection: 'pulse',
    subtitle: 'Aerodynamic Racing Flagship',
    description: 'The foundation of the K-Lattice platform. 210 grams of forward velocity with neon acid highlights and carbon propulsion vector.',
    price: 14999,
    compareAtPrice: 17500,
    weight: 210,
    drop: 4,
    stack: 28,
    rating: 4.9,
    ratingCount: 22,
    primaryImage: '/images/products/pulse-01.jpg',
    hoverImage: '/images/products/pulse-01.jpg',
    sizes: [7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5],
    colors: [
      { name: 'Acid Ghost', hex: '#D9FF43' },
      { name: 'Graphite Black', hex: '#0B0F0E' },
    ],
    isFeatured: true,
    isNew: true,
    inStock: true,
    upper: 'Engineered monofilament mono-mesh',
    outsole: 'Liquid-injected blown rubber with targeted forefoot pods',
  },
  {
    id: 'prod-pulse-carbon',
    slug: 'pulse-speed-carbon',
    name: 'PULSE SPEED CARBON',
    collection: 'pulse',
    subtitle: 'Full-Length S-Curve Carbon Plate',
    description: 'Rigid S-curve carbon fiber plate nestled between dual layers of nitrogen-infused supercritical foam. 88.4% energy return.',
    price: 22800,
    compareAtPrice: 26000,
    weight: 198,
    drop: 6,
    stack: 39,
    rating: 5.0,
    ratingCount: 18,
    primaryImage: '/images/products/pulse-speed-carbon.jpg',
    hoverImage: '/images/products/pulse-speed-carbon.jpg',
    sizes: [8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0],
    colors: [
      { name: 'Acid Ghost', hex: '#D9FF43' },
      { name: 'Titanium Grey', hex: '#2E3430' },
    ],
    isFeatured: true,
    isNew: true,
    inStock: true,
    upper: 'Translucent bio-engineered aerodynamic skin',
    outsole: 'High-abrasion featherweight traction rubber',
  },
  {
    id: 'prod-pulse-vector',
    slug: 'pulse-vector-lattice',
    name: 'PULSE VECTOR LATTICE',
    collection: 'pulse',
    subtitle: '3D Photopolymer Monolithic Sole',
    description: 'Continuous 3D-printed photopolymer lattice midsole dynamically tuned to convert downward impact force into forward momentum.',
    price: 19500,
    compareAtPrice: null,
    weight: 230,
    drop: 5,
    stack: 31,
    rating: 4.7,
    ratingCount: 11,
    primaryImage: '/images/products/pulse-vector.jpg',
    hoverImage: '/images/products/pulse-vector.jpg',
    sizes: [7.5, 8.5, 9.0, 9.5, 10.0, 10.5, 11.5],
    colors: [
      { name: 'Graphite Black', hex: '#0B0F0E' },
      { name: 'Signal Blue', hex: '#1E5BFF' },
    ],
    isFeatured: false,
    isNew: false,
    inStock: true,
    upper: 'Seamless circular knit with variable elasticity zones',
    outsole: 'Integrated lattice wear-resistant contact nodes',
  },
  {
    id: 'prod-pulse-marathon',
    slug: 'pulse-marathon-elite',
    name: 'PULSE MARATHON ELITE',
    collection: 'pulse',
    subtitle: '42.195 KM Endurance Spec',
    description: 'Maximal stack height cushioning tuned for sustained pace over 42.195 km without leg fatigue. Forefoot rocker geometry.',
    price: 25400,
    compareAtPrice: 28000,
    weight: 215,
    drop: 8,
    stack: 40,
    rating: 4.9,
    ratingCount: 15,
    primaryImage: '/images/products/pulse-marathon.jpg',
    hoverImage: '/images/products/pulse-marathon.jpg',
    sizes: [8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 12.0],
    colors: [
      { name: 'Acid Ghost', hex: '#D9FF43' },
      { name: 'Bone White', hex: '#F3F0E9' },
    ],
    isFeatured: false,
    isNew: true,
    inStock: true,
    upper: 'Single layer engineered vapor-weave',
    outsole: 'Laser-perforated lightweight rubber web',
  },
  {
    id: 'prod-pulse-tempo',
    slug: 'pulse-tempo-2',
    name: 'PULSE TEMPO 2',
    collection: 'pulse',
    subtitle: 'Daily Speedwork & Threshold Trainer',
    description: 'Durable nylon propulsion plate with forgiving PEBA core. Built to absorb 800 kilometers of weekly threshold sessions.',
    price: 16200,
    compareAtPrice: 18500,
    weight: 225,
    drop: 6,
    stack: 33,
    rating: 4.8,
    ratingCount: 12,
    primaryImage: '/images/products/pulse-01.jpg',
    hoverImage: '/images/products/pulse-01.jpg',
    sizes: [7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0],
    colors: [
      { name: 'Titanium Grey', hex: '#2E3430' },
      { name: 'Acid Ghost', hex: '#D9FF43' },
    ],
    isFeatured: false,
    isNew: false,
    inStock: true,
    upper: 'Breathable dual-layer jacquard mesh',
    outsole: 'Carbon rubber high-durability heel and toe segments',
  },
  {
    id: 'prod-pulse-sub2',
    slug: 'pulse-sub-2-zero',
    name: 'PULSE SUB-2 ZERO',
    collection: 'pulse',
    subtitle: 'Experimental 185g Prototype',
    description: 'Stripped of every superfluous milligram. Monocoque upper bonded directly to a full carbon matrix chassis. Race-day exclusive.',
    price: 28000,
    compareAtPrice: null,
    weight: 185,
    drop: 4,
    stack: 36,
    rating: 4.9,
    ratingCount: 8,
    primaryImage: '/images/products/pulse-speed-carbon.jpg',
    hoverImage: '/images/products/pulse-speed-carbon.jpg',
    sizes: [8.5, 9.0, 9.5, 10.0, 10.5],
    colors: [
      { name: 'Acid Ghost', hex: '#D9FF43' },
    ],
    isFeatured: true,
    isNew: true,
    inStock: false, // Sold out demonstration
    upper: 'Aramid-reinforced ultralight gossamer mesh',
    outsole: 'Textured carbon direct-contact traction studs',
  },
  {
    id: 'prod-pulse-stride',
    slug: 'pulse-mono-stride',
    name: 'PULSE MONO STRIDE',
    collection: 'pulse',
    subtitle: 'Natural Kinematic Geometry',
    description: 'Zero heel-to-toe drop designed for midfoot and forefoot strike efficiency without artificial wedges. Natural splay.',
    price: 18900,
    compareAtPrice: 21000,
    weight: 205,
    drop: 0,
    stack: 24,
    rating: 4.6,
    ratingCount: 7,
    primaryImage: '/images/products/pulse-vector.jpg',
    hoverImage: '/images/products/pulse-vector.jpg',
    sizes: [7.5, 8.5, 9.5, 10.0, 10.5, 11.5],
    colors: [
      { name: 'Graphite Black', hex: '#0B0F0E' },
    ],
    isFeatured: false,
    isNew: false,
    inStock: true,
    upper: 'Adaptive stretch knit with anatomical toe-box splay',
    outsole: 'Wide-base siped rubber tread',
  },
  {
    id: 'prod-pulse-nitro',
    slug: 'pulse-nitro-flow',
    name: 'PULSE NITRO FLOW',
    collection: 'pulse',
    subtitle: 'Nitrogen-Charged Recovery Platform',
    description: 'Ultra-cushioned supercritical nitrogen foam chassis designed to accelerate recovery runs following grueling race efforts.',
    price: 17200,
    compareAtPrice: 19500,
    weight: 240,
    drop: 7,
    stack: 37,
    rating: 4.8,
    ratingCount: 9,
    primaryImage: '/images/products/pulse-marathon.jpg',
    hoverImage: '/images/products/pulse-marathon.jpg',
    sizes: [8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 12.0],
    colors: [
      { name: 'Acid Ghost', hex: '#D9FF43' },
      { name: 'Titanium Grey', hex: '#2E3430' },
    ],
    isFeatured: false,
    isNew: false,
    inStock: true,
    upper: 'Plush engineered foam-padded collar and tongue',
    outsole: 'Full ground contact soft compound rubber',
  },

  // ==========================================
  // TERRA COLLECTION (8 Products)
  // ==========================================
  {
    id: 'prod-terra-ridge',
    slug: 'terra-ridge',
    name: 'TERRA RIDGE',
    collection: 'terra',
    subtitle: 'Rugged Technical Mountain Silhouette',
    description: 'Constructed for aggressive scree, wet shale, and mountain ridges. Basalt-X lugged rubber with dual-density clay midsole dampening.',
    price: 18400,
    compareAtPrice: 21000,
    weight: 285,
    drop: 6,
    stack: 32,
    rating: 4.8,
    ratingCount: 14,
    primaryImage: '/images/products/terra-ridge.jpg',
    hoverImage: '/images/products/terra-ridge.jpg',
    sizes: [7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5],
    colors: [
      { name: 'Basalt Clay', hex: '#B4553A' },
      { name: 'Dune Sand', hex: '#C8B89E' },
    ],
    isFeatured: true,
    isNew: true,
    inStock: true,
    upper: 'Reinforced ballistic ripstop with thermal welded TPU overlays',
    outsole: 'Basalt-X directional 5.5mm chevron rubber lugs',
  },
  {
    id: 'prod-terra-basalt-mid',
    slug: 'terra-basalt-mid',
    name: 'TERRA BASALT MID',
    collection: 'terra',
    subtitle: 'Mid-Cut Ankle Support System',
    description: 'Anatomical collar with high-abrasion neoprene wrap. Breathable waterproof membrane for stream crossings and alpine weather.',
    price: 21200,
    compareAtPrice: null,
    weight: 315,
    drop: 7,
    stack: 34,
    rating: 4.7,
    ratingCount: 9,
    primaryImage: '/images/products/terra-basalt.jpg',
    hoverImage: '/images/products/terra-basalt.jpg',
    sizes: [8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0],
    colors: [
      { name: 'Basalt Clay', hex: '#B4553A' },
      { name: 'Shadow Ink', hex: '#0B0B0C' },
    ],
    isFeatured: false,
    isNew: false,
    inStock: true,
    upper: 'Hydrophobic Cordura mesh with rubberized rand',
    outsole: 'Vibram-grade Basalt Compound with stone bruise deflection plate',
  },
  {
    id: 'prod-terra-peak-x',
    slug: 'terra-peak-x',
    name: 'TERRA PEAK X',
    collection: 'terra',
    subtitle: 'Ultra-Distance Mountain Racer',
    description: 'Featherweight trail running platform with embedded composite stone shield. Built for skyrunning and 100-mile ultra terrain.',
    price: 19800,
    compareAtPrice: 22500,
    weight: 245,
    drop: 5,
    stack: 29,
    rating: 4.9,
    ratingCount: 6,
    primaryImage: '/images/products/terra-gravity.jpg',
    hoverImage: '/images/products/terra-gravity.jpg',
    sizes: [7.5, 8.5, 9.0, 9.5, 10.0, 10.5],
    colors: [
      { name: 'Dune Sand', hex: '#C8B89E' },
      { name: 'Basalt Clay', hex: '#B4553A' },
    ],
    isFeatured: false,
    isNew: true,
    inStock: true,
    upper: 'Engineered mono-mesh with internal lockdown skeleton',
    outsole: 'Sticky rubber perimeter with micro-siped lugs',
  },
  {
    id: 'prod-terra-glacier',
    slug: 'terra-glacier-pro',
    name: 'TERRA GLACIER PRO',
    collection: 'terra',
    subtitle: 'Sub-Zero Thermal Membrane',
    description: 'Reflective aluminum thermal strobel board with cold-weather grip compound that remains pliable below -15°C.',
    price: 24500,
    compareAtPrice: null,
    weight: 340,
    drop: 8,
    stack: 36,
    rating: 4.6,
    ratingCount: 5,
    primaryImage: '/images/products/terra-ridge.jpg',
    hoverImage: '/images/products/terra-ridge.jpg',
    sizes: [8.5, 9.0, 9.5, 10.0, 10.5, 11.0],
    colors: [
      { name: 'Basalt Clay', hex: '#B4553A' },
    ],
    isFeatured: false,
    isNew: false,
    inStock: true,
    upper: 'GORE-level waterproof membrane with integrated debris gaiter',
    outsole: 'Arctic-Grip specialized cryogenic rubber',
  },
  {
    id: 'prod-terra-canyon',
    slug: 'terra-canyon-low',
    name: 'TERRA CANYON LOW',
    collection: 'terra',
    subtitle: 'Fast-Packing Scrambler',
    description: 'Low-profile technical scrambler designed for slickrock, dry washes, and mixed trail approaches.',
    price: 16900,
    compareAtPrice: 19000,
    weight: 260,
    drop: 4,
    stack: 26,
    rating: 4.7,
    ratingCount: 7,
    primaryImage: '/images/products/terra-basalt.jpg',
    hoverImage: '/images/products/terra-basalt.jpg',
    sizes: [7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0],
    colors: [
      { name: 'Dune Sand', hex: '#C8B89E' },
      { name: 'Basalt Clay', hex: '#B4553A' },
    ],
    isFeatured: false,
    isNew: false,
    inStock: true,
    upper: 'Heavy gauge canvas and split cowhide toe cap',
    outsole: 'Climbing zone smooth rubber toe with perimeter lugs',
  },
  {
    id: 'prod-terra-alpine',
    slug: 'terra-alpine-v',
    name: 'TERRA ALPINE V',
    collection: 'terra',
    subtitle: 'Technical Ridge Approach',
    description: 'Asymmetric lacing for precision toe micro-adjustment. Carbon shank for torsional rigidity on steep scree.',
    price: 22000,
    compareAtPrice: null,
    weight: 298,
    drop: 6,
    stack: 30,
    rating: 4.8,
    ratingCount: 4,
    primaryImage: '/images/products/terra-gravity.jpg',
    hoverImage: '/images/products/terra-gravity.jpg',
    sizes: [8.5, 9.5, 10.0, 10.5, 11.0],
    colors: [
      { name: 'Basalt Clay', hex: '#B4553A' },
    ],
    isFeatured: false,
    isNew: false,
    inStock: true,
    upper: 'Perwanger leather with Kevlar sidewall thread',
    outsole: 'High-friction hybrid lug matrix',
  },
  {
    id: 'prod-terra-strata',
    slug: 'terra-strata-gtx',
    name: 'TERRA STRATA GTX',
    collection: 'terra',
    subtitle: 'All-Weather Mud Machine',
    description: 'Deep 7mm self-cleaning mud evacuating lugs. Zero water absorption upper for torrential conditions.',
    price: 26000,
    compareAtPrice: 29000,
    weight: 310,
    drop: 6,
    stack: 33,
    rating: 4.9,
    ratingCount: 8,
    primaryImage: '/images/products/terra-ridge.jpg',
    hoverImage: '/images/products/terra-ridge.jpg',
    sizes: [8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.5],
    colors: [
      { name: 'Basalt Clay', hex: '#B4553A' },
      { name: 'Shadow Ink', hex: '#0B0B0C' },
    ],
    isFeatured: false,
    isNew: true,
    inStock: true,
    upper: 'Hydrophobic synthetic microfiber matrix',
    outsole: 'Super-deep open mud channel lug layout',
  },
  {
    id: 'prod-terra-dune',
    slug: 'terra-dune-racer',
    name: 'TERRA DUNE RACER',
    collection: 'terra',
    subtitle: 'Desert & Sand Shield',
    description: 'Ultra-dense sand filter mesh prevents fine silt penetration while sustaining continuous ventilation.',
    price: 17500,
    compareAtPrice: null,
    weight: 250,
    drop: 5,
    stack: 28,
    rating: 4.5,
    ratingCount: 3,
    primaryImage: '/images/products/terra-gravity.jpg',
    hoverImage: '/images/products/terra-gravity.jpg',
    sizes: [7.5, 8.5, 9.5, 10.0, 10.5],
    colors: [
      { name: 'Dune Sand', hex: '#C8B89E' },
    ],
    isFeatured: false,
    isNew: false,
    inStock: true,
    upper: 'Micro-aperture breathable silt shield',
    outsole: 'Paddle lug layout for soft sand propulsion',
  },

  // ==========================================
  // FORM COLLECTION (8 Products)
  // ==========================================
  {
    id: 'prod-form-zero',
    slug: 'form-zero',
    name: 'FORM ZERO',
    collection: 'form',
    subtitle: 'Architectural Minimal Low',
    description: 'Monochrome precision calfskin suede with hidden blind eyelets, unbranded tongue, and sculpted ortholite anatomical footbed.',
    price: 13500,
    compareAtPrice: 15500,
    weight: 290,
    drop: 4,
    stack: 24,
    rating: 4.9,
    ratingCount: 19,
    primaryImage: '/images/products/form-zero.jpg',
    hoverImage: '/images/products/form-zero.jpg',
    sizes: [7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5],
    colors: [
      { name: 'Bone White', hex: '#F3F0E9' },
      { name: 'Shadow Ink', hex: '#0B0B0C' },
    ],
    isFeatured: true,
    isNew: true,
    inStock: true,
    upper: 'Full-grain Italian calfskin suede and nubuck',
    outsole: 'Margom-grade cupsole with stitched perimeter reinforcement',
  },
  {
    id: 'prod-form-calf',
    slug: 'form-low-calf',
    name: 'FORM LOW CALF',
    collection: 'form',
    subtitle: 'Pristine Bone Leather',
    description: 'Subtle off-white bone leather that ages with distinct patina. Leather lining ensures complete barefoot comfort.',
    price: 15800,
    compareAtPrice: 18000,
    weight: 305,
    drop: 4,
    stack: 25,
    rating: 4.8,
    ratingCount: 14,
    primaryImage: '/images/products/form-zero.jpg',
    hoverImage: '/images/products/form-zero.jpg',
    sizes: [8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0],
    colors: [
      { name: 'Bone White', hex: '#F3F0E9' },
    ],
    isFeatured: false,
    isNew: false,
    inStock: true,
    upper: 'Top-tier Napa calf leather with wax finish',
    outsole: 'Natural off-white rubber compound',
  },
  {
    id: 'prod-form-suede',
    slug: 'form-suede-mono',
    name: 'FORM SUEDE MONO',
    collection: 'form',
    subtitle: 'Anthracite All-Black Edition',
    description: 'Stark near-black deep ink suede with tonal hardware. Engineered internal heel pocket prevents slippage.',
    price: 16200,
    compareAtPrice: null,
    weight: 310,
    drop: 4,
    stack: 25,
    rating: 4.8,
    ratingCount: 16,
    primaryImage: '/images/products/form-zero.jpg',
    hoverImage: '/images/products/form-zero.jpg',
    sizes: [7.5, 8.5, 9.0, 9.5, 10.0, 10.5, 11.5],
    colors: [
      { name: 'Shadow Ink', hex: '#0B0B0C' },
    ],
    isFeatured: true,
    isNew: false,
    inStock: true,
    upper: 'Velvety water-repellent oiled suede',
    outsole: 'Blackout vulcanized rubber cupsole',
  },
  {
    id: 'prod-form-architect',
    slug: 'form-architect-mid',
    name: 'FORM ARCHITECT MID',
    collection: 'form',
    subtitle: 'Sculpted Collar Mid Profile',
    description: 'Clean architectural mid-top providing gentle ankle drape. Lateral blind zipper allows effortless entry and exit.',
    price: 18500,
    compareAtPrice: 21000,
    weight: 340,
    drop: 5,
    stack: 27,
    rating: 4.7,
    ratingCount: 10,
    primaryImage: '/images/products/form-zero.jpg',
    hoverImage: '/images/products/form-zero.jpg',
    sizes: [8.5, 9.0, 9.5, 10.0, 10.5, 11.0],
    colors: [
      { name: 'Bone White', hex: '#F3F0E9' },
      { name: 'Shadow Ink', hex: '#0B0B0C' },
    ],
    isFeatured: false,
    isNew: true,
    inStock: true,
    upper: 'Aniline calfskin with Japanese YKK Excella concealed zipper',
    outsole: 'Chunky geometric flat rubber sole',
  },
  {
    id: 'prod-form-shadow',
    slug: 'form-shadow-derby',
    name: 'FORM SHADOW DERBY',
    collection: 'form',
    subtitle: 'Hybrid Tailored Sneaker',
    description: 'Classic formal derby upper geometry welded to an athletic kinetic cushion foundation.',
    price: 19900,
    compareAtPrice: null,
    weight: 325,
    drop: 6,
    stack: 28,
    rating: 4.6,
    ratingCount: 8,
    primaryImage: '/images/products/form-zero.jpg',
    hoverImage: '/images/products/form-zero.jpg',
    sizes: [8.0, 8.5, 9.5, 10.0, 10.5, 11.0],
    colors: [
      { name: 'Shadow Ink', hex: '#0B0B0C' },
    ],
    isFeatured: false,
    isNew: false,
    inStock: true,
    upper: 'High-shine brushed box calf leather',
    outsole: 'Micro-cellular EVA wedge with rubber lug perimeter',
  },
  {
    id: 'prod-form-studio',
    slug: 'form-studio-high',
    name: 'FORM STUDIO HIGH',
    collection: 'form',
    subtitle: 'Padded Collar High Top',
    description: 'Oversized collar with memory-foam padding. Architectural lines inspired by brutalist concrete forms.',
    price: 21000,
    compareAtPrice: 24000,
    weight: 375,
    drop: 5,
    stack: 29,
    rating: 4.9,
    ratingCount: 6,
    primaryImage: '/images/products/form-zero.jpg',
    hoverImage: '/images/products/form-zero.jpg',
    sizes: [8.5, 9.0, 9.5, 10.0, 10.5],
    colors: [
      { name: 'Bone White', hex: '#F3F0E9' },
    ],
    isFeatured: false,
    isNew: false,
    inStock: true,
    upper: 'Padded Italian calfskin and ballistic canvas panels',
    outsole: 'Heavyweight ribbed rubber cupsole',
  },
  {
    id: 'prod-form-canvas',
    slug: 'form-raw-canvas',
    name: 'FORM RAW CANVAS',
    collection: 'form',
    subtitle: 'Heavy Unbleached Duck Canvas',
    description: '16oz raw unbleached cotton duck canvas that molds to the foot shape. Copper eyelets and natural gum rubber outsole.',
    price: 12400,
    compareAtPrice: 14000,
    weight: 280,
    drop: 4,
    stack: 22,
    rating: 4.7,
    ratingCount: 11,
    primaryImage: '/images/products/form-zero.jpg',
    hoverImage: '/images/products/form-zero.jpg',
    sizes: [7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0],
    colors: [
      { name: 'Bone White', hex: '#F3F0E9' },
    ],
    isFeatured: false,
    isNew: false,
    inStock: true,
    upper: '16oz unbleached Japanese cotton duck canvas',
    outsole: 'Natural plantation crepe gum rubber',
  },
  {
    id: 'prod-form-court',
    slug: 'form-minimal-court',
    name: 'FORM MINIMAL COURT',
    collection: 'form',
    subtitle: 'Clean Retro-Tennis Geometry',
    description: 'Low-profile court silhouette with perforated micro-details along the toe vamp. Zero exterior branding.',
    price: 14200,
    compareAtPrice: 16500,
    weight: 295,
    drop: 4,
    stack: 23,
    rating: 4.8,
    ratingCount: 13,
    primaryImage: '/images/products/form-zero.jpg',
    hoverImage: '/images/products/form-zero.jpg',
    sizes: [7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5],
    colors: [
      { name: 'Bone White', hex: '#F3F0E9' },
      { name: 'Shadow Ink', hex: '#0B0B0C' },
    ],
    isFeatured: false,
    isNew: false,
    inStock: true,
    upper: 'Supple white tumbled leather',
    outsole: 'Reinforced herringbone rubber traction sole',
  },
];

export interface CatalogFilterParams {
  collection?: string | null;
  size?: string | null;
  color?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  sort?: string | null;
  query?: string | null;
}

export function filterProducts(items: ProductItem[], filters: CatalogFilterParams): ProductItem[] {
  let result = [...items];

  // Collection Filter
  if (filters.collection && filters.collection !== 'all') {
    result = result.filter((p) => p.collection.toLowerCase() === filters.collection?.toLowerCase());
  }

  // Size Filter
  if (filters.size) {
    const sizeNum = parseFloat(filters.size);
    result = result.filter((p) => p.sizes.includes(sizeNum));
  }

  // Color Filter
  if (filters.color) {
    const targetColor = filters.color.toLowerCase();
    result = result.filter((p) => p.colors.some((c) => c.name.toLowerCase().includes(targetColor)));
  }

  // Price Bounds
  if (filters.minPrice !== null && filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  // Search Query
  if (filters.query && filters.query.trim().length > 0) {
    const q = filters.query.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (filters.sort) {
    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'weight':
        result.sort((a, b) => a.weight - b.weight);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }
  }

  return result;
}

export function getProductBySlug(slug: string): ProductItem | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}
