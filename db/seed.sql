-- KINETIQ Idempotent Seed Script
-- 3 Collections, 24 Products, ~86 Variants with Stock, Reviews, Discounts & Admin User

-- 1. SEED COLLECTIONS
INSERT INTO public.collections (slug, name, tagline, description, position)
VALUES ('terra', 'TERRA', 'Trail / All-Terrain Architecture', 'Rugged lugged outsole, earth tones, basalt membrane, warm clay accents.', 1)
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  position = EXCLUDED.position;
INSERT INTO public.collections (slug, name, tagline, description, position)
VALUES ('pulse', 'PULSE', 'Performance Road Racing', 'Technical engineered mono-mesh, 3D printed lattice, aerodynamic carbon propulsion plate.', 2)
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  position = EXCLUDED.position;
INSERT INTO public.collections (slug, name, tagline, description, position)
VALUES ('form', 'FORM', 'Lifestyle & Everyday Architecture', 'Monochrome geometry, buttery calfskin suede, sculpted ortholite footbed.', 3)
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  position = EXCLUDED.position;

-- 2. SEED PRODUCTS
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'terra-ridge',
  'TERRA RIDGE',
  (SELECT id FROM public.collections WHERE slug = 'terra'),
  'Rugged Technical Mountain Silhouette',
  'Constructed for aggressive scree, wet shale, and mountain ridges. Monolithic Basalt-X lugged rubber with dual-density clay midsole dampening.',
  'Field-tested across 1,200 km of Himalayan trail conditions. Zero seam friction.',
  18400,
  21000,
  285,
  6,
  32,
  'Reinforced ballistic ripstop with thermal welded TPU overlays',
  'Basalt-X directional 5.5mm chevron rubber lugs',
  true,
  true,
  4.8,
  14
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'terra-basalt-mid',
  'TERRA BASALT MID',
  (SELECT id FROM public.collections WHERE slug = 'terra'),
  'Mid-Cut Ankle Support System',
  'Anatomical collar with high-abrasion neoprene wrap. Breathable waterproof membrane for stream crossings and alpine weather.',
  'Engineered for multi-day expeditions requiring maximum joint stability without excess gram weight.',
  21200,
  NULL,
  315,
  7,
  34,
  'Hydrophobic Cordura mesh with rubberized rand',
  'Vibram-grade Basalt Compound with stone bruise deflection plate',
  true,
  false,
  4.7,
  9
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'terra-peak-x',
  'TERRA PEAK X',
  (SELECT id FROM public.collections WHERE slug = 'terra'),
  'Ultra-Distance Mountain Racer',
  'Featherweight trail running platform with embedded composite stone shield. Built for skyrunning and 100-mile ultra terrain.',
  'Optimized energy return under extreme inclines.',
  19800,
  22500,
  245,
  5,
  29,
  'Engineered mono-mesh with internal lockdown skeleton',
  'Sticky rubber perimeter with micro-siped lugs',
  true,
  false,
  4.9,
  6
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'terra-glacier-pro',
  'TERRA GLACIER PRO',
  (SELECT id FROM public.collections WHERE slug = 'terra'),
  'Sub-Zero Thermal Membrane',
  'Reflective aluminum thermal strobel board with cold-weather grip compound that remains pliable below -15°C.',
  'Born from high-altitude winter testing.',
  24500,
  NULL,
  340,
  8,
  36,
  'GORE-level waterproof membrane with integrated debris gaiter',
  'Arctic-Grip specialized cryogenic rubber',
  true,
  false,
  4.6,
  5
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'terra-canyon-low',
  'TERRA CANYON LOW',
  (SELECT id FROM public.collections WHERE slug = 'terra'),
  'Fast-Packing Scrambler',
  'Low-profile technical scrambler designed for slickrock, dry washes, and mixed trail approaches.',
  'Minimalist upper with maximum contact patch outsole.',
  16900,
  19000,
  260,
  4,
  26,
  'Heavy gauge canvas and split cowhide toe cap',
  'Climbing zone smooth rubber toe with perimeter lugs',
  true,
  false,
  4.7,
  7
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'terra-alpine-v',
  'TERRA ALPINE V',
  (SELECT id FROM public.collections WHERE slug = 'terra'),
  'Technical Ridge Approach',
  'Asymmetric lacing for precision toe micro-adjustment. Carbon shank for torsional rigidity on steep scree.',
  'The guide-grade shoe for high-consequence terrain.',
  22000,
  NULL,
  298,
  6,
  30,
  'Perwanger leather with Kevlar sidewall thread',
  'High-friction hybrid lug matrix',
  true,
  false,
  4.8,
  4
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'terra-strata-gtx',
  'TERRA STRATA GTX',
  (SELECT id FROM public.collections WHERE slug = 'terra'),
  'All-Weather Mud Machine',
  'Deep 7mm self-cleaning mud evacuating lugs. Zero water absorption upper for torrential conditions.',
  'No saturation. No packing mud.',
  26000,
  29000,
  310,
  6,
  33,
  'Hydrophobic synthetic microfiber matrix',
  'Super-deep open mud channel lug layout',
  true,
  false,
  4.9,
  8
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'terra-dune-racer',
  'TERRA DUNE RACER',
  (SELECT id FROM public.collections WHERE slug = 'terra'),
  'Desert & Sand Shield',
  'Ultra-dense sand filter mesh prevents fine silt penetration while sustaining continuous ventilation.',
  'Engineered for arid endurance expeditions.',
  17500,
  NULL,
  250,
  5,
  28,
  'Micro-aperture breathable silt shield',
  'Paddle lug layout for soft sand propulsion',
  true,
  false,
  4.5,
  3
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'pulse-01',
  'PULSE 01',
  (SELECT id FROM public.collections WHERE slug = 'pulse'),
  'Aerodynamic Racing Flagship',
  'The foundation of the K-Lattice platform. 210 grams of pure forward velocity with neon acid highlights and carbon propulsion vector.',
  'Developed in aerodynamic wind tunnels to reduce drag at 20 km/h marathon pace.',
  14999,
  17500,
  210,
  4,
  28,
  'Engineered monofilament mono-mesh',
  'Liquid-injected blown rubber with targeted forefoot pods',
  true,
  true,
  4.9,
  22
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'pulse-speed-carbon',
  'PULSE SPEED CARBON',
  (SELECT id FROM public.collections WHERE slug = 'pulse'),
  'Full-Length S-Curve Carbon Plate',
  'Rigid S-curve carbon fiber plate nestled between dual layers of nitrogen-infused supercritical foam. 88.4% measured energy return.',
  'Legal for all world athletics road competitions. Sub-2 hour marathon architecture.',
  22800,
  26000,
  198,
  6,
  39,
  'Translucent bio-engineered aerodynamic skin',
  'High-abrasion featherweight traction rubber',
  true,
  true,
  5,
  18
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'pulse-vector-lattice',
  'PULSE VECTOR LATTICE',
  (SELECT id FROM public.collections WHERE slug = 'pulse'),
  '3D Photopolymer Monolithic Sole',
  'Continuous 3D-printed photopolymer lattice midsole dynamically tuned to deform forward upon impact, converting vertical force into forward stride.',
  'Zero traditional foam layers. Zero foam compaction over time.',
  19500,
  NULL,
  230,
  5,
  31,
  'Seamless circular knit with variable elasticity zones',
  'Integrated lattice wear-resistant contact nodes',
  true,
  false,
  4.7,
  11
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'pulse-marathon-elite',
  'PULSE MARATHON ELITE',
  (SELECT id FROM public.collections WHERE slug = 'pulse'),
  '42.195 KM Endurance Spec',
  'Maximal stack height cushioning tuned for sustained pace over 42.195 km without leg fatigue.',
  'Targeted forefoot rocker geometry minimizes calf stress.',
  25400,
  28000,
  215,
  8,
  40,
  'Single layer engineered vapor-weave',
  'Laser-perforated lightweight rubber web',
  true,
  false,
  4.9,
  15
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'pulse-tempo-2',
  'PULSE TEMPO 2',
  (SELECT id FROM public.collections WHERE slug = 'pulse'),
  'Daily Speedwork & Threshold Trainer',
  'Durable nylon propulsion plate with forgiving PEBA core. Built to absorb 800 kilometers of weekly threshold sessions.',
  'The workhorse of competitive training blocks.',
  16200,
  18500,
  225,
  6,
  33,
  'Breathable dual-layer jacquard mesh',
  'Carbon rubber high-durability heel and toe segments',
  true,
  false,
  4.8,
  12
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'pulse-sub-2-zero',
  'PULSE SUB-2 ZERO',
  (SELECT id FROM public.collections WHERE slug = 'pulse'),
  'Experimental 185g Prototype',
  'Stripped of every superfluous milligram. Monocoque upper bonded directly to a full carbon matrix chassis.',
  'Limited numbered production run. Race-day exclusive.',
  28000,
  NULL,
  185,
  4,
  36,
  'Aramid-reinforced ultralight gossamer mesh',
  'Textured carbon direct-contact traction studs',
  true,
  true,
  4.9,
  8
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'pulse-mono-stride',
  'PULSE MONO STRIDE',
  (SELECT id FROM public.collections WHERE slug = 'pulse'),
  'Natural Kinematic Geometry',
  'Zero heel-to-toe drop designed for midfoot and forefoot strike efficiency without artificial wedges.',
  'Strengthens intrinsic foot musculature with modern impact damping.',
  18900,
  21000,
  205,
  0,
  24,
  'Adaptive stretch knit with anatomical toe-box splay',
  'Wide-base siped rubber tread',
  true,
  false,
  4.6,
  7
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'pulse-nitro-flow',
  'PULSE NITRO FLOW',
  (SELECT id FROM public.collections WHERE slug = 'pulse'),
  'Nitrogen-Charged Recovery Platform',
  'Ultra-cushioned supercritical nitrogen foam chassis designed to accelerate recovery runs following grueling race efforts.',
  'Maximizes soft plush feel without energy sponge sink.',
  17200,
  19500,
  240,
  7,
  37,
  'Plush engineered foam-padded collar and tongue',
  'Full ground contact soft compound rubber',
  true,
  false,
  4.8,
  9
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'form-zero',
  'FORM ZERO',
  (SELECT id FROM public.collections WHERE slug = 'form'),
  'Architectural Minimal Low',
  'Monochrome precision calfskin suede with hidden blind eyelets, unbranded tongue, and sculpted ortholite anatomical footbed.',
  'The definitive daily uniform sneaker. Crafted with hairline tolerances.',
  13500,
  15500,
  290,
  4,
  24,
  'Full-grain Italian calfskin suede and nubuck',
  'Margom-grade cupsole with stitched perimeter reinforcement',
  true,
  true,
  4.9,
  19
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'form-low-calf',
  'FORM LOW CALF',
  (SELECT id FROM public.collections WHERE slug = 'form'),
  'Pristine Bone Leather',
  'Subtle off-white bone leather that ages with distinct patina. Leather lining ensures complete barefoot comfort.',
  'Minimalist proportion meeting athletic comfort cushioning.',
  15800,
  18000,
  305,
  4,
  25,
  'Top-tier Napa calf leather with wax finish',
  'Natural off-white rubber compound',
  true,
  false,
  4.8,
  14
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'form-suede-mono',
  'FORM SUEDE MONO',
  (SELECT id FROM public.collections WHERE slug = 'form'),
  'Anthracite All-Black Edition',
  'Stark near-black deep ink suede with tonal hardware. Engineered internal heel pocket prevents slippage.',
  'Stealth silhouette engineered for gallery and studio days.',
  16200,
  NULL,
  310,
  4,
  25,
  'Velvety water-repellent oiled suede',
  'Blackout vulcanized rubber cupsole',
  true,
  true,
  4.8,
  16
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'form-architect-mid',
  'FORM ARCHITECT MID',
  (SELECT id FROM public.collections WHERE slug = 'form'),
  'Sculpted Collar Mid Profile',
  'Clean architectural mid-top providing gentle ankle drape. Lateral blind zipper allows effortless entry and exit.',
  'Designed with industrial designers in Berlin and Tokyo.',
  18500,
  21000,
  340,
  5,
  27,
  'Aniline calfskin with Japanese YKK Excella concealed zipper',
  'Chunky geometric flat rubber sole',
  true,
  false,
  4.7,
  10
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'form-shadow-derby',
  'FORM SHADOW DERBY',
  (SELECT id FROM public.collections WHERE slug = 'form'),
  'Hybrid Tailored Sneaker',
  'Classic formal derby upper geometry welded to an athletic kinetic cushion foundation.',
  'For the wardrobe that bridges tailoring and progressive sneakers.',
  19900,
  NULL,
  325,
  6,
  28,
  'High-shine brushed box calf leather',
  'Micro-cellular EVA wedge with rubber lug perimeter',
  true,
  false,
  4.6,
  8
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'form-studio-high',
  'FORM STUDIO HIGH',
  (SELECT id FROM public.collections WHERE slug = 'form'),
  'Padded Collar High Top',
  'Oversized collar with memory-foam padding. Architectural lines inspired by brutalist concrete forms.',
  'Stands as an art piece when resting on the shelf.',
  21000,
  24000,
  375,
  5,
  29,
  'Padded Italian calfskin and ballistic canvas panels',
  'Heavyweight ribbed rubber cupsole',
  true,
  false,
  4.9,
  6
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'form-raw-canvas',
  'FORM RAW CANVAS',
  (SELECT id FROM public.collections WHERE slug = 'form'),
  'Heavy Unbleached Duck Canvas',
  '16oz raw unbleached cotton duck canvas that molds to the foot shape. Copper eyelets and natural gum rubber outsole.',
  'A completely unpretentious material statement.',
  12400,
  14000,
  280,
  4,
  22,
  '16oz unbleached Japanese cotton duck canvas',
  'Natural plantation crepe gum rubber',
  true,
  false,
  4.7,
  11
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;
INSERT INTO public.products (
  slug, name, collection_id, subtitle, description, story, price_inr, compare_at_inr, 
  weight_grams, drop_mm, stack_mm, upper, outsole, is_published, is_featured, rating_avg, rating_count
) VALUES (
  'form-minimal-court',
  'FORM MINIMAL COURT',
  (SELECT id FROM public.collections WHERE slug = 'form'),
  'Clean Retro-Tennis Geometry',
  'Low-profile court silhouette with perforated micro-details along the toe vamp. Zero exterior branding.',
  'Classic tennis silhouette re-engineered with modern orthopedic support.',
  14200,
  16500,
  295,
  4,
  23,
  'Supple white tumbled leather',
  'Reinforced herringbone rubber traction sole',
  true,
  false,
  4.8,
  13
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  is_published = true,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;

-- 3. SEED PRODUCT VARIANTS (Sizes & Colorways with Stock)
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-ridge'),
  'KNQ-TERRA-RIDGE-7.5-BAS',
  7.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-ridge'),
  'KNQ-TERRA-RIDGE-8.5-BAS',
  8.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-ridge'),
  'KNQ-TERRA-RIDGE-9.5-BAS',
  9.5,
  'Basalt Clay',
  '#B4553A',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-ridge'),
  'KNQ-TERRA-RIDGE-10-BAS',
  10,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-ridge'),
  'KNQ-TERRA-RIDGE-10.5-BAS',
  10.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-ridge'),
  'KNQ-TERRA-RIDGE-11.5-BAS',
  11.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-ridge'),
  'KNQ-TERRA-RIDGE-7.5-DUN',
  7.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-ridge'),
  'KNQ-TERRA-RIDGE-8.5-DUN',
  8.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-ridge'),
  'KNQ-TERRA-RIDGE-9.5-DUN',
  9.5,
  'Dune Sand',
  '#C8B89E',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-ridge'),
  'KNQ-TERRA-RIDGE-10-DUN',
  10,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-ridge'),
  'KNQ-TERRA-RIDGE-10.5-DUN',
  10.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-ridge'),
  'KNQ-TERRA-RIDGE-11.5-DUN',
  11.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-basalt-mid'),
  'KNQ-TERRA-BASALT-MID-7.5-BAS',
  7.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-basalt-mid'),
  'KNQ-TERRA-BASALT-MID-8.5-BAS',
  8.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-basalt-mid'),
  'KNQ-TERRA-BASALT-MID-9.5-BAS',
  9.5,
  'Basalt Clay',
  '#B4553A',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-basalt-mid'),
  'KNQ-TERRA-BASALT-MID-10-BAS',
  10,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-basalt-mid'),
  'KNQ-TERRA-BASALT-MID-10.5-BAS',
  10.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-basalt-mid'),
  'KNQ-TERRA-BASALT-MID-11.5-BAS',
  11.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-basalt-mid'),
  'KNQ-TERRA-BASALT-MID-7.5-DUN',
  7.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-basalt-mid'),
  'KNQ-TERRA-BASALT-MID-8.5-DUN',
  8.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-basalt-mid'),
  'KNQ-TERRA-BASALT-MID-9.5-DUN',
  9.5,
  'Dune Sand',
  '#C8B89E',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-basalt-mid'),
  'KNQ-TERRA-BASALT-MID-10-DUN',
  10,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-basalt-mid'),
  'KNQ-TERRA-BASALT-MID-10.5-DUN',
  10.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-basalt-mid'),
  'KNQ-TERRA-BASALT-MID-11.5-DUN',
  11.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-peak-x'),
  'KNQ-TERRA-PEAK-X-7.5-BAS',
  7.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-peak-x'),
  'KNQ-TERRA-PEAK-X-8.5-BAS',
  8.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-peak-x'),
  'KNQ-TERRA-PEAK-X-9.5-BAS',
  9.5,
  'Basalt Clay',
  '#B4553A',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-peak-x'),
  'KNQ-TERRA-PEAK-X-10-BAS',
  10,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-peak-x'),
  'KNQ-TERRA-PEAK-X-10.5-BAS',
  10.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-peak-x'),
  'KNQ-TERRA-PEAK-X-11.5-BAS',
  11.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-peak-x'),
  'KNQ-TERRA-PEAK-X-7.5-DUN',
  7.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-peak-x'),
  'KNQ-TERRA-PEAK-X-8.5-DUN',
  8.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-peak-x'),
  'KNQ-TERRA-PEAK-X-9.5-DUN',
  9.5,
  'Dune Sand',
  '#C8B89E',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-peak-x'),
  'KNQ-TERRA-PEAK-X-10-DUN',
  10,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-peak-x'),
  'KNQ-TERRA-PEAK-X-10.5-DUN',
  10.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-peak-x'),
  'KNQ-TERRA-PEAK-X-11.5-DUN',
  11.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-glacier-pro'),
  'KNQ-TERRA-GLACIER-PRO-7.5-BAS',
  7.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-glacier-pro'),
  'KNQ-TERRA-GLACIER-PRO-8.5-BAS',
  8.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-glacier-pro'),
  'KNQ-TERRA-GLACIER-PRO-9.5-BAS',
  9.5,
  'Basalt Clay',
  '#B4553A',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-glacier-pro'),
  'KNQ-TERRA-GLACIER-PRO-10-BAS',
  10,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-glacier-pro'),
  'KNQ-TERRA-GLACIER-PRO-10.5-BAS',
  10.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-glacier-pro'),
  'KNQ-TERRA-GLACIER-PRO-11.5-BAS',
  11.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-glacier-pro'),
  'KNQ-TERRA-GLACIER-PRO-7.5-DUN',
  7.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-glacier-pro'),
  'KNQ-TERRA-GLACIER-PRO-8.5-DUN',
  8.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-glacier-pro'),
  'KNQ-TERRA-GLACIER-PRO-9.5-DUN',
  9.5,
  'Dune Sand',
  '#C8B89E',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-glacier-pro'),
  'KNQ-TERRA-GLACIER-PRO-10-DUN',
  10,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-glacier-pro'),
  'KNQ-TERRA-GLACIER-PRO-10.5-DUN',
  10.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-glacier-pro'),
  'KNQ-TERRA-GLACIER-PRO-11.5-DUN',
  11.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-canyon-low'),
  'KNQ-TERRA-CANYON-LOW-7.5-BAS',
  7.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-canyon-low'),
  'KNQ-TERRA-CANYON-LOW-8.5-BAS',
  8.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-canyon-low'),
  'KNQ-TERRA-CANYON-LOW-9.5-BAS',
  9.5,
  'Basalt Clay',
  '#B4553A',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-canyon-low'),
  'KNQ-TERRA-CANYON-LOW-10-BAS',
  10,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-canyon-low'),
  'KNQ-TERRA-CANYON-LOW-10.5-BAS',
  10.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-canyon-low'),
  'KNQ-TERRA-CANYON-LOW-11.5-BAS',
  11.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-canyon-low'),
  'KNQ-TERRA-CANYON-LOW-7.5-DUN',
  7.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-canyon-low'),
  'KNQ-TERRA-CANYON-LOW-8.5-DUN',
  8.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-canyon-low'),
  'KNQ-TERRA-CANYON-LOW-9.5-DUN',
  9.5,
  'Dune Sand',
  '#C8B89E',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-canyon-low'),
  'KNQ-TERRA-CANYON-LOW-10-DUN',
  10,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-canyon-low'),
  'KNQ-TERRA-CANYON-LOW-10.5-DUN',
  10.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-canyon-low'),
  'KNQ-TERRA-CANYON-LOW-11.5-DUN',
  11.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-alpine-v'),
  'KNQ-TERRA-ALPINE-V-7.5-BAS',
  7.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-alpine-v'),
  'KNQ-TERRA-ALPINE-V-8.5-BAS',
  8.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-alpine-v'),
  'KNQ-TERRA-ALPINE-V-9.5-BAS',
  9.5,
  'Basalt Clay',
  '#B4553A',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-alpine-v'),
  'KNQ-TERRA-ALPINE-V-10-BAS',
  10,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-alpine-v'),
  'KNQ-TERRA-ALPINE-V-10.5-BAS',
  10.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-alpine-v'),
  'KNQ-TERRA-ALPINE-V-11.5-BAS',
  11.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-alpine-v'),
  'KNQ-TERRA-ALPINE-V-7.5-DUN',
  7.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-alpine-v'),
  'KNQ-TERRA-ALPINE-V-8.5-DUN',
  8.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-alpine-v'),
  'KNQ-TERRA-ALPINE-V-9.5-DUN',
  9.5,
  'Dune Sand',
  '#C8B89E',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-alpine-v'),
  'KNQ-TERRA-ALPINE-V-10-DUN',
  10,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-alpine-v'),
  'KNQ-TERRA-ALPINE-V-10.5-DUN',
  10.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-alpine-v'),
  'KNQ-TERRA-ALPINE-V-11.5-DUN',
  11.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-strata-gtx'),
  'KNQ-TERRA-STRATA-GTX-7.5-BAS',
  7.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-strata-gtx'),
  'KNQ-TERRA-STRATA-GTX-8.5-BAS',
  8.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-strata-gtx'),
  'KNQ-TERRA-STRATA-GTX-9.5-BAS',
  9.5,
  'Basalt Clay',
  '#B4553A',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-strata-gtx'),
  'KNQ-TERRA-STRATA-GTX-10-BAS',
  10,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-strata-gtx'),
  'KNQ-TERRA-STRATA-GTX-10.5-BAS',
  10.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-strata-gtx'),
  'KNQ-TERRA-STRATA-GTX-11.5-BAS',
  11.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-strata-gtx'),
  'KNQ-TERRA-STRATA-GTX-7.5-DUN',
  7.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-strata-gtx'),
  'KNQ-TERRA-STRATA-GTX-8.5-DUN',
  8.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-strata-gtx'),
  'KNQ-TERRA-STRATA-GTX-9.5-DUN',
  9.5,
  'Dune Sand',
  '#C8B89E',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-strata-gtx'),
  'KNQ-TERRA-STRATA-GTX-10-DUN',
  10,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-strata-gtx'),
  'KNQ-TERRA-STRATA-GTX-10.5-DUN',
  10.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-strata-gtx'),
  'KNQ-TERRA-STRATA-GTX-11.5-DUN',
  11.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-dune-racer'),
  'KNQ-TERRA-DUNE-RACER-7.5-BAS',
  7.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-dune-racer'),
  'KNQ-TERRA-DUNE-RACER-8.5-BAS',
  8.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-dune-racer'),
  'KNQ-TERRA-DUNE-RACER-9.5-BAS',
  9.5,
  'Basalt Clay',
  '#B4553A',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-dune-racer'),
  'KNQ-TERRA-DUNE-RACER-10-BAS',
  10,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-dune-racer'),
  'KNQ-TERRA-DUNE-RACER-10.5-BAS',
  10.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-dune-racer'),
  'KNQ-TERRA-DUNE-RACER-11.5-BAS',
  11.5,
  'Basalt Clay',
  '#B4553A',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-dune-racer'),
  'KNQ-TERRA-DUNE-RACER-7.5-DUN',
  7.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-dune-racer'),
  'KNQ-TERRA-DUNE-RACER-8.5-DUN',
  8.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-dune-racer'),
  'KNQ-TERRA-DUNE-RACER-9.5-DUN',
  9.5,
  'Dune Sand',
  '#C8B89E',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-dune-racer'),
  'KNQ-TERRA-DUNE-RACER-10-DUN',
  10,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-dune-racer'),
  'KNQ-TERRA-DUNE-RACER-10.5-DUN',
  10.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-dune-racer'),
  'KNQ-TERRA-DUNE-RACER-11.5-DUN',
  11.5,
  'Dune Sand',
  '#C8B89E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-01'),
  'KNQ-PULSE-01-7.5-ACI',
  7.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-01'),
  'KNQ-PULSE-01-8.5-ACI',
  8.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-01'),
  'KNQ-PULSE-01-9.5-ACI',
  9.5,
  'Acid Ghost',
  '#D9FF43',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-01'),
  'KNQ-PULSE-01-10-ACI',
  10,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-01'),
  'KNQ-PULSE-01-10.5-ACI',
  10.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-01'),
  'KNQ-PULSE-01-11.5-ACI',
  11.5,
  'Acid Ghost',
  '#D9FF43',
  0,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-01'),
  'KNQ-PULSE-01-7.5-GRA',
  7.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-01'),
  'KNQ-PULSE-01-8.5-GRA',
  8.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-01'),
  'KNQ-PULSE-01-9.5-GRA',
  9.5,
  'Graphite Black',
  '#0B0F0E',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-01'),
  'KNQ-PULSE-01-10-GRA',
  10,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-01'),
  'KNQ-PULSE-01-10.5-GRA',
  10.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-01'),
  'KNQ-PULSE-01-11.5-GRA',
  11.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-speed-carbon'),
  'KNQ-PULSE-SPEED-CARBON-7.5-ACI',
  7.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-speed-carbon'),
  'KNQ-PULSE-SPEED-CARBON-8.5-ACI',
  8.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-speed-carbon'),
  'KNQ-PULSE-SPEED-CARBON-9.5-ACI',
  9.5,
  'Acid Ghost',
  '#D9FF43',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-speed-carbon'),
  'KNQ-PULSE-SPEED-CARBON-10-ACI',
  10,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-speed-carbon'),
  'KNQ-PULSE-SPEED-CARBON-10.5-ACI',
  10.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-speed-carbon'),
  'KNQ-PULSE-SPEED-CARBON-11.5-ACI',
  11.5,
  'Acid Ghost',
  '#D9FF43',
  0,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-speed-carbon'),
  'KNQ-PULSE-SPEED-CARBON-7.5-GRA',
  7.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-speed-carbon'),
  'KNQ-PULSE-SPEED-CARBON-8.5-GRA',
  8.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-speed-carbon'),
  'KNQ-PULSE-SPEED-CARBON-9.5-GRA',
  9.5,
  'Graphite Black',
  '#0B0F0E',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-speed-carbon'),
  'KNQ-PULSE-SPEED-CARBON-10-GRA',
  10,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-speed-carbon'),
  'KNQ-PULSE-SPEED-CARBON-10.5-GRA',
  10.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-speed-carbon'),
  'KNQ-PULSE-SPEED-CARBON-11.5-GRA',
  11.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-vector-lattice'),
  'KNQ-PULSE-VECTOR-LATTICE-7.5-ACI',
  7.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-vector-lattice'),
  'KNQ-PULSE-VECTOR-LATTICE-8.5-ACI',
  8.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-vector-lattice'),
  'KNQ-PULSE-VECTOR-LATTICE-9.5-ACI',
  9.5,
  'Acid Ghost',
  '#D9FF43',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-vector-lattice'),
  'KNQ-PULSE-VECTOR-LATTICE-10-ACI',
  10,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-vector-lattice'),
  'KNQ-PULSE-VECTOR-LATTICE-10.5-ACI',
  10.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-vector-lattice'),
  'KNQ-PULSE-VECTOR-LATTICE-11.5-ACI',
  11.5,
  'Acid Ghost',
  '#D9FF43',
  0,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-vector-lattice'),
  'KNQ-PULSE-VECTOR-LATTICE-7.5-GRA',
  7.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-vector-lattice'),
  'KNQ-PULSE-VECTOR-LATTICE-8.5-GRA',
  8.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-vector-lattice'),
  'KNQ-PULSE-VECTOR-LATTICE-9.5-GRA',
  9.5,
  'Graphite Black',
  '#0B0F0E',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-vector-lattice'),
  'KNQ-PULSE-VECTOR-LATTICE-10-GRA',
  10,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-vector-lattice'),
  'KNQ-PULSE-VECTOR-LATTICE-10.5-GRA',
  10.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-vector-lattice'),
  'KNQ-PULSE-VECTOR-LATTICE-11.5-GRA',
  11.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-marathon-elite'),
  'KNQ-PULSE-MARATHON-ELITE-7.5-ACI',
  7.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-marathon-elite'),
  'KNQ-PULSE-MARATHON-ELITE-8.5-ACI',
  8.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-marathon-elite'),
  'KNQ-PULSE-MARATHON-ELITE-9.5-ACI',
  9.5,
  'Acid Ghost',
  '#D9FF43',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-marathon-elite'),
  'KNQ-PULSE-MARATHON-ELITE-10-ACI',
  10,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-marathon-elite'),
  'KNQ-PULSE-MARATHON-ELITE-10.5-ACI',
  10.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-marathon-elite'),
  'KNQ-PULSE-MARATHON-ELITE-11.5-ACI',
  11.5,
  'Acid Ghost',
  '#D9FF43',
  0,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-marathon-elite'),
  'KNQ-PULSE-MARATHON-ELITE-7.5-GRA',
  7.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-marathon-elite'),
  'KNQ-PULSE-MARATHON-ELITE-8.5-GRA',
  8.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-marathon-elite'),
  'KNQ-PULSE-MARATHON-ELITE-9.5-GRA',
  9.5,
  'Graphite Black',
  '#0B0F0E',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-marathon-elite'),
  'KNQ-PULSE-MARATHON-ELITE-10-GRA',
  10,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-marathon-elite'),
  'KNQ-PULSE-MARATHON-ELITE-10.5-GRA',
  10.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-marathon-elite'),
  'KNQ-PULSE-MARATHON-ELITE-11.5-GRA',
  11.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-tempo-2'),
  'KNQ-PULSE-TEMPO-2-7.5-ACI',
  7.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-tempo-2'),
  'KNQ-PULSE-TEMPO-2-8.5-ACI',
  8.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-tempo-2'),
  'KNQ-PULSE-TEMPO-2-9.5-ACI',
  9.5,
  'Acid Ghost',
  '#D9FF43',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-tempo-2'),
  'KNQ-PULSE-TEMPO-2-10-ACI',
  10,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-tempo-2'),
  'KNQ-PULSE-TEMPO-2-10.5-ACI',
  10.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-tempo-2'),
  'KNQ-PULSE-TEMPO-2-11.5-ACI',
  11.5,
  'Acid Ghost',
  '#D9FF43',
  0,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-tempo-2'),
  'KNQ-PULSE-TEMPO-2-7.5-GRA',
  7.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-tempo-2'),
  'KNQ-PULSE-TEMPO-2-8.5-GRA',
  8.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-tempo-2'),
  'KNQ-PULSE-TEMPO-2-9.5-GRA',
  9.5,
  'Graphite Black',
  '#0B0F0E',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-tempo-2'),
  'KNQ-PULSE-TEMPO-2-10-GRA',
  10,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-tempo-2'),
  'KNQ-PULSE-TEMPO-2-10.5-GRA',
  10.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-tempo-2'),
  'KNQ-PULSE-TEMPO-2-11.5-GRA',
  11.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-sub-2-zero'),
  'KNQ-PULSE-SUB-2-ZERO-7.5-ACI',
  7.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-sub-2-zero'),
  'KNQ-PULSE-SUB-2-ZERO-8.5-ACI',
  8.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-sub-2-zero'),
  'KNQ-PULSE-SUB-2-ZERO-9.5-ACI',
  9.5,
  'Acid Ghost',
  '#D9FF43',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-sub-2-zero'),
  'KNQ-PULSE-SUB-2-ZERO-10-ACI',
  10,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-sub-2-zero'),
  'KNQ-PULSE-SUB-2-ZERO-10.5-ACI',
  10.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-sub-2-zero'),
  'KNQ-PULSE-SUB-2-ZERO-11.5-ACI',
  11.5,
  'Acid Ghost',
  '#D9FF43',
  0,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-sub-2-zero'),
  'KNQ-PULSE-SUB-2-ZERO-7.5-GRA',
  7.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-sub-2-zero'),
  'KNQ-PULSE-SUB-2-ZERO-8.5-GRA',
  8.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-sub-2-zero'),
  'KNQ-PULSE-SUB-2-ZERO-9.5-GRA',
  9.5,
  'Graphite Black',
  '#0B0F0E',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-sub-2-zero'),
  'KNQ-PULSE-SUB-2-ZERO-10-GRA',
  10,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-sub-2-zero'),
  'KNQ-PULSE-SUB-2-ZERO-10.5-GRA',
  10.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-sub-2-zero'),
  'KNQ-PULSE-SUB-2-ZERO-11.5-GRA',
  11.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-mono-stride'),
  'KNQ-PULSE-MONO-STRIDE-7.5-ACI',
  7.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-mono-stride'),
  'KNQ-PULSE-MONO-STRIDE-8.5-ACI',
  8.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-mono-stride'),
  'KNQ-PULSE-MONO-STRIDE-9.5-ACI',
  9.5,
  'Acid Ghost',
  '#D9FF43',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-mono-stride'),
  'KNQ-PULSE-MONO-STRIDE-10-ACI',
  10,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-mono-stride'),
  'KNQ-PULSE-MONO-STRIDE-10.5-ACI',
  10.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-mono-stride'),
  'KNQ-PULSE-MONO-STRIDE-11.5-ACI',
  11.5,
  'Acid Ghost',
  '#D9FF43',
  0,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-mono-stride'),
  'KNQ-PULSE-MONO-STRIDE-7.5-GRA',
  7.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-mono-stride'),
  'KNQ-PULSE-MONO-STRIDE-8.5-GRA',
  8.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-mono-stride'),
  'KNQ-PULSE-MONO-STRIDE-9.5-GRA',
  9.5,
  'Graphite Black',
  '#0B0F0E',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-mono-stride'),
  'KNQ-PULSE-MONO-STRIDE-10-GRA',
  10,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-mono-stride'),
  'KNQ-PULSE-MONO-STRIDE-10.5-GRA',
  10.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-mono-stride'),
  'KNQ-PULSE-MONO-STRIDE-11.5-GRA',
  11.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-nitro-flow'),
  'KNQ-PULSE-NITRO-FLOW-7.5-ACI',
  7.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-nitro-flow'),
  'KNQ-PULSE-NITRO-FLOW-8.5-ACI',
  8.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-nitro-flow'),
  'KNQ-PULSE-NITRO-FLOW-9.5-ACI',
  9.5,
  'Acid Ghost',
  '#D9FF43',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-nitro-flow'),
  'KNQ-PULSE-NITRO-FLOW-10-ACI',
  10,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-nitro-flow'),
  'KNQ-PULSE-NITRO-FLOW-10.5-ACI',
  10.5,
  'Acid Ghost',
  '#D9FF43',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-nitro-flow'),
  'KNQ-PULSE-NITRO-FLOW-11.5-ACI',
  11.5,
  'Acid Ghost',
  '#D9FF43',
  0,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-nitro-flow'),
  'KNQ-PULSE-NITRO-FLOW-7.5-GRA',
  7.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-nitro-flow'),
  'KNQ-PULSE-NITRO-FLOW-8.5-GRA',
  8.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-nitro-flow'),
  'KNQ-PULSE-NITRO-FLOW-9.5-GRA',
  9.5,
  'Graphite Black',
  '#0B0F0E',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-nitro-flow'),
  'KNQ-PULSE-NITRO-FLOW-10-GRA',
  10,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-nitro-flow'),
  'KNQ-PULSE-NITRO-FLOW-10.5-GRA',
  10.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-nitro-flow'),
  'KNQ-PULSE-NITRO-FLOW-11.5-GRA',
  11.5,
  'Graphite Black',
  '#0B0F0E',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-zero'),
  'KNQ-FORM-ZERO-7.5-BON',
  7.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-zero'),
  'KNQ-FORM-ZERO-8.5-BON',
  8.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-zero'),
  'KNQ-FORM-ZERO-9.5-BON',
  9.5,
  'Bone White',
  '#F3F0E9',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-zero'),
  'KNQ-FORM-ZERO-10-BON',
  10,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-zero'),
  'KNQ-FORM-ZERO-10.5-BON',
  10.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-zero'),
  'KNQ-FORM-ZERO-11.5-BON',
  11.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-zero'),
  'KNQ-FORM-ZERO-7.5-SHA',
  7.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-zero'),
  'KNQ-FORM-ZERO-8.5-SHA',
  8.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-zero'),
  'KNQ-FORM-ZERO-9.5-SHA',
  9.5,
  'Shadow Ink',
  '#0B0B0C',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-zero'),
  'KNQ-FORM-ZERO-10-SHA',
  10,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-zero'),
  'KNQ-FORM-ZERO-10.5-SHA',
  10.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-zero'),
  'KNQ-FORM-ZERO-11.5-SHA',
  11.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-low-calf'),
  'KNQ-FORM-LOW-CALF-7.5-BON',
  7.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-low-calf'),
  'KNQ-FORM-LOW-CALF-8.5-BON',
  8.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-low-calf'),
  'KNQ-FORM-LOW-CALF-9.5-BON',
  9.5,
  'Bone White',
  '#F3F0E9',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-low-calf'),
  'KNQ-FORM-LOW-CALF-10-BON',
  10,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-low-calf'),
  'KNQ-FORM-LOW-CALF-10.5-BON',
  10.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-low-calf'),
  'KNQ-FORM-LOW-CALF-11.5-BON',
  11.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-low-calf'),
  'KNQ-FORM-LOW-CALF-7.5-SHA',
  7.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-low-calf'),
  'KNQ-FORM-LOW-CALF-8.5-SHA',
  8.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-low-calf'),
  'KNQ-FORM-LOW-CALF-9.5-SHA',
  9.5,
  'Shadow Ink',
  '#0B0B0C',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-low-calf'),
  'KNQ-FORM-LOW-CALF-10-SHA',
  10,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-low-calf'),
  'KNQ-FORM-LOW-CALF-10.5-SHA',
  10.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-low-calf'),
  'KNQ-FORM-LOW-CALF-11.5-SHA',
  11.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-suede-mono'),
  'KNQ-FORM-SUEDE-MONO-7.5-BON',
  7.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-suede-mono'),
  'KNQ-FORM-SUEDE-MONO-8.5-BON',
  8.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-suede-mono'),
  'KNQ-FORM-SUEDE-MONO-9.5-BON',
  9.5,
  'Bone White',
  '#F3F0E9',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-suede-mono'),
  'KNQ-FORM-SUEDE-MONO-10-BON',
  10,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-suede-mono'),
  'KNQ-FORM-SUEDE-MONO-10.5-BON',
  10.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-suede-mono'),
  'KNQ-FORM-SUEDE-MONO-11.5-BON',
  11.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-suede-mono'),
  'KNQ-FORM-SUEDE-MONO-7.5-SHA',
  7.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-suede-mono'),
  'KNQ-FORM-SUEDE-MONO-8.5-SHA',
  8.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-suede-mono'),
  'KNQ-FORM-SUEDE-MONO-9.5-SHA',
  9.5,
  'Shadow Ink',
  '#0B0B0C',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-suede-mono'),
  'KNQ-FORM-SUEDE-MONO-10-SHA',
  10,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-suede-mono'),
  'KNQ-FORM-SUEDE-MONO-10.5-SHA',
  10.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-suede-mono'),
  'KNQ-FORM-SUEDE-MONO-11.5-SHA',
  11.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-architect-mid'),
  'KNQ-FORM-ARCHITECT-MID-7.5-BON',
  7.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-architect-mid'),
  'KNQ-FORM-ARCHITECT-MID-8.5-BON',
  8.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-architect-mid'),
  'KNQ-FORM-ARCHITECT-MID-9.5-BON',
  9.5,
  'Bone White',
  '#F3F0E9',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-architect-mid'),
  'KNQ-FORM-ARCHITECT-MID-10-BON',
  10,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-architect-mid'),
  'KNQ-FORM-ARCHITECT-MID-10.5-BON',
  10.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-architect-mid'),
  'KNQ-FORM-ARCHITECT-MID-11.5-BON',
  11.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-architect-mid'),
  'KNQ-FORM-ARCHITECT-MID-7.5-SHA',
  7.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-architect-mid'),
  'KNQ-FORM-ARCHITECT-MID-8.5-SHA',
  8.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-architect-mid'),
  'KNQ-FORM-ARCHITECT-MID-9.5-SHA',
  9.5,
  'Shadow Ink',
  '#0B0B0C',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-architect-mid'),
  'KNQ-FORM-ARCHITECT-MID-10-SHA',
  10,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-architect-mid'),
  'KNQ-FORM-ARCHITECT-MID-10.5-SHA',
  10.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-architect-mid'),
  'KNQ-FORM-ARCHITECT-MID-11.5-SHA',
  11.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-shadow-derby'),
  'KNQ-FORM-SHADOW-DERBY-7.5-BON',
  7.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-shadow-derby'),
  'KNQ-FORM-SHADOW-DERBY-8.5-BON',
  8.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-shadow-derby'),
  'KNQ-FORM-SHADOW-DERBY-9.5-BON',
  9.5,
  'Bone White',
  '#F3F0E9',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-shadow-derby'),
  'KNQ-FORM-SHADOW-DERBY-10-BON',
  10,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-shadow-derby'),
  'KNQ-FORM-SHADOW-DERBY-10.5-BON',
  10.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-shadow-derby'),
  'KNQ-FORM-SHADOW-DERBY-11.5-BON',
  11.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-shadow-derby'),
  'KNQ-FORM-SHADOW-DERBY-7.5-SHA',
  7.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-shadow-derby'),
  'KNQ-FORM-SHADOW-DERBY-8.5-SHA',
  8.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-shadow-derby'),
  'KNQ-FORM-SHADOW-DERBY-9.5-SHA',
  9.5,
  'Shadow Ink',
  '#0B0B0C',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-shadow-derby'),
  'KNQ-FORM-SHADOW-DERBY-10-SHA',
  10,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-shadow-derby'),
  'KNQ-FORM-SHADOW-DERBY-10.5-SHA',
  10.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-shadow-derby'),
  'KNQ-FORM-SHADOW-DERBY-11.5-SHA',
  11.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-studio-high'),
  'KNQ-FORM-STUDIO-HIGH-7.5-BON',
  7.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-studio-high'),
  'KNQ-FORM-STUDIO-HIGH-8.5-BON',
  8.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-studio-high'),
  'KNQ-FORM-STUDIO-HIGH-9.5-BON',
  9.5,
  'Bone White',
  '#F3F0E9',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-studio-high'),
  'KNQ-FORM-STUDIO-HIGH-10-BON',
  10,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-studio-high'),
  'KNQ-FORM-STUDIO-HIGH-10.5-BON',
  10.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-studio-high'),
  'KNQ-FORM-STUDIO-HIGH-11.5-BON',
  11.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-studio-high'),
  'KNQ-FORM-STUDIO-HIGH-7.5-SHA',
  7.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-studio-high'),
  'KNQ-FORM-STUDIO-HIGH-8.5-SHA',
  8.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-studio-high'),
  'KNQ-FORM-STUDIO-HIGH-9.5-SHA',
  9.5,
  'Shadow Ink',
  '#0B0B0C',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-studio-high'),
  'KNQ-FORM-STUDIO-HIGH-10-SHA',
  10,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-studio-high'),
  'KNQ-FORM-STUDIO-HIGH-10.5-SHA',
  10.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-studio-high'),
  'KNQ-FORM-STUDIO-HIGH-11.5-SHA',
  11.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-raw-canvas'),
  'KNQ-FORM-RAW-CANVAS-7.5-BON',
  7.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-raw-canvas'),
  'KNQ-FORM-RAW-CANVAS-8.5-BON',
  8.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-raw-canvas'),
  'KNQ-FORM-RAW-CANVAS-9.5-BON',
  9.5,
  'Bone White',
  '#F3F0E9',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-raw-canvas'),
  'KNQ-FORM-RAW-CANVAS-10-BON',
  10,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-raw-canvas'),
  'KNQ-FORM-RAW-CANVAS-10.5-BON',
  10.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-raw-canvas'),
  'KNQ-FORM-RAW-CANVAS-11.5-BON',
  11.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-raw-canvas'),
  'KNQ-FORM-RAW-CANVAS-7.5-SHA',
  7.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-raw-canvas'),
  'KNQ-FORM-RAW-CANVAS-8.5-SHA',
  8.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-raw-canvas'),
  'KNQ-FORM-RAW-CANVAS-9.5-SHA',
  9.5,
  'Shadow Ink',
  '#0B0B0C',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-raw-canvas'),
  'KNQ-FORM-RAW-CANVAS-10-SHA',
  10,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-raw-canvas'),
  'KNQ-FORM-RAW-CANVAS-10.5-SHA',
  10.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-raw-canvas'),
  'KNQ-FORM-RAW-CANVAS-11.5-SHA',
  11.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-minimal-court'),
  'KNQ-FORM-MINIMAL-COURT-7.5-BON',
  7.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-minimal-court'),
  'KNQ-FORM-MINIMAL-COURT-8.5-BON',
  8.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-minimal-court'),
  'KNQ-FORM-MINIMAL-COURT-9.5-BON',
  9.5,
  'Bone White',
  '#F3F0E9',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-minimal-court'),
  'KNQ-FORM-MINIMAL-COURT-10-BON',
  10,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-minimal-court'),
  'KNQ-FORM-MINIMAL-COURT-10.5-BON',
  10.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-minimal-court'),
  'KNQ-FORM-MINIMAL-COURT-11.5-BON',
  11.5,
  'Bone White',
  '#F3F0E9',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-minimal-court'),
  'KNQ-FORM-MINIMAL-COURT-7.5-SHA',
  7.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-minimal-court'),
  'KNQ-FORM-MINIMAL-COURT-8.5-SHA',
  8.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-minimal-court'),
  'KNQ-FORM-MINIMAL-COURT-9.5-SHA',
  9.5,
  'Shadow Ink',
  '#0B0B0C',
  4,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-minimal-court'),
  'KNQ-FORM-MINIMAL-COURT-10-SHA',
  10,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-minimal-court'),
  'KNQ-FORM-MINIMAL-COURT-10.5-SHA',
  10.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;
INSERT INTO public.product_variants (
  product_id, sku, size, color, color_hex, stock, price_delta_inr, is_active
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-minimal-court'),
  'KNQ-FORM-MINIMAL-COURT-11.5-SHA',
  11.5,
  'Shadow Ink',
  '#0B0B0C',
  18,
  0,
  true
) ON CONFLICT (product_id, size, color) DO UPDATE SET
  stock = EXCLUDED.stock,
  is_active = true;

-- 4. SEED DISCOUNT CODES
INSERT INTO public.discount_codes (
  code, kind, value, min_cart_inr, max_uses, is_active
) VALUES (
  'KINETIQ10',
  'percent',
  10,
  5000,
  500,
  true
) ON CONFLICT (code) DO UPDATE SET
  value = EXCLUDED.value,
  is_active = true;
INSERT INTO public.discount_codes (
  code, kind, value, min_cart_inr, max_uses, is_active
) VALUES (
  'PULSE20',
  'percent',
  20,
  15000,
  100,
  true
) ON CONFLICT (code) DO UPDATE SET
  value = EXCLUDED.value,
  is_active = true;
INSERT INTO public.discount_codes (
  code, kind, value, min_cart_inr, max_uses, is_active
) VALUES (
  'FIRSTDROP',
  'flat',
  1500,
  10000,
  200,
  true
) ON CONFLICT (code) DO UPDATE SET
  value = EXCLUDED.value,
  is_active = true;
INSERT INTO public.discount_codes (
  code, kind, value, min_cart_inr, max_uses, is_active
) VALUES (
  'FREESHIP',
  'flat',
  500,
  3000,
  NULL,
  true
) ON CONFLICT (code) DO UPDATE SET
  value = EXCLUDED.value,
  is_active = true;
INSERT INTO public.discount_codes (
  code, kind, value, min_cart_inr, max_uses, is_active
) VALUES (
  'VIPRUNNER',
  'percent',
  15,
  8000,
  50,
  true
) ON CONFLICT (code) DO UPDATE SET
  value = EXCLUDED.value,
  is_active = true;
INSERT INTO public.discount_codes (
  code, kind, value, min_cart_inr, max_uses, is_active
) VALUES (
  'BASALTX',
  'flat',
  2000,
  18000,
  75,
  true
) ON CONFLICT (code) DO UPDATE SET
  value = EXCLUDED.value,
  is_active = true;

-- 5. SEED 40 AUTHENTIC TECHNICAL REVIEWS
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-ridge'),
  4,
  'Sub-3 hour marathon weapon',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'runs_small',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-basalt-mid'),
  5,
  'Basalt lugs bite into wet granite flawlessly',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-peak-x'),
  5,
  'Unbelievably light in the hand',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-glacier-pro'),
  5,
  'True to size with zero heel slippage',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-canyon-low'),
  5,
  'The lattice cushioning is noticeably responsive',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-alpine-v'),
  5,
  'Minimalist perfection for daily wear',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-strata-gtx'),
  5,
  'Worth every rupee. Pure athletic architecture',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'runs_small',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-dune-racer'),
  4,
  'Slightly snug in the toe box - order half size up',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-01'),
  5,
  'Sub-3 hour marathon weapon',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-speed-carbon'),
  5,
  'Basalt lugs bite into wet granite flawlessly',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-vector-lattice'),
  5,
  'Unbelievably light in the hand',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-marathon-elite'),
  5,
  'True to size with zero heel slippage',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-tempo-2'),
  5,
  'The lattice cushioning is noticeably responsive',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'runs_small',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-sub-2-zero'),
  5,
  'Minimalist perfection for daily wear',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-mono-stride'),
  4,
  'Worth every rupee. Pure athletic architecture',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-nitro-flow'),
  5,
  'Slightly snug in the toe box - order half size up',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-zero'),
  5,
  'Sub-3 hour marathon weapon',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-low-calf'),
  5,
  'Basalt lugs bite into wet granite flawlessly',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-suede-mono'),
  5,
  'Unbelievably light in the hand',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'runs_small',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-architect-mid'),
  5,
  'True to size with zero heel slippage',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-shadow-derby'),
  5,
  'The lattice cushioning is noticeably responsive',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-studio-high'),
  4,
  'Minimalist perfection for daily wear',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-raw-canvas'),
  5,
  'Worth every rupee. Pure athletic architecture',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'form-minimal-court'),
  5,
  'Slightly snug in the toe box - order half size up',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-ridge'),
  5,
  'Sub-3 hour marathon weapon',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'runs_small',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-basalt-mid'),
  5,
  'Basalt lugs bite into wet granite flawlessly',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-peak-x'),
  5,
  'Unbelievably light in the hand',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-glacier-pro'),
  5,
  'True to size with zero heel slippage',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-canyon-low'),
  4,
  'The lattice cushioning is noticeably responsive',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-alpine-v'),
  5,
  'Minimalist perfection for daily wear',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-strata-gtx'),
  5,
  'Worth every rupee. Pure athletic architecture',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'runs_small',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'terra-dune-racer'),
  5,
  'Slightly snug in the toe box - order half size up',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-01'),
  5,
  'Sub-3 hour marathon weapon',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-speed-carbon'),
  5,
  'Basalt lugs bite into wet granite flawlessly',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-vector-lattice'),
  5,
  'Unbelievably light in the hand',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-marathon-elite'),
  4,
  'True to size with zero heel slippage',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-tempo-2'),
  5,
  'The lattice cushioning is noticeably responsive',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'runs_small',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-sub-2-zero'),
  5,
  'Minimalist perfection for daily wear',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-mono-stride'),
  5,
  'Worth every rupee. Pure athletic architecture',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);
INSERT INTO public.reviews (
  product_id, rating, title, body, fit_feedback, is_approved
) VALUES (
  (SELECT id FROM public.products WHERE slug = 'pulse-nitro-flow'),
  5,
  'Slightly snug in the toe box - order half size up',
  'Completed over 150 km in these shoes through varied tempo runs and city pavements. The energy return does not diminish over long miles. Quality of materials is unmistakable.',
  'true_to_size',
  true
);

-- 6. SEED DOCUMENTED ADMIN OPERATOR
-- Note: If user signs up with email admin@kinetiq-labs.com, this trigger ensures admin role
INSERT INTO public.profiles (id, email, full_name, role)
VALUES ('00000000-0000-0000-0000-000000000001', 'admin@kinetiq-labs.com', 'KINETIQ Chief Operator', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
