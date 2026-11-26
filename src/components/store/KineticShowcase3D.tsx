'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  ShoppingBag,
  Heart,
  Sparkles,
  ExternalLink,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useToast } from '@/providers/ToastProvider';

export interface ShowcaseShoe {
  id: string;
  name: string;
  subtitle: string;
  discipline: 'pulse' | 'terra' | 'form';
  disciplineLabel: string;
  price: number;
  originalPrice: number;
  weight: number;
  drop: number;
  rebound: string;
  image: string;
  slug: string;
  colorway: string;
  description: string;
  accentColor: string;
}

export const SHOWCASE_SHOES: ShowcaseShoe[] = [
  {
    id: 'pulse-01',
    name: 'PULSE 01',
    subtitle: 'K-LATTICE // SPEED STRIKE',
    discipline: 'pulse',
    disciplineLabel: 'ROAD RACING',
    price: 14999,
    originalPrice: 17500,
    weight: 210,
    drop: 4,
    rebound: '88.4%',
    image: '/images/products/pulse-01.jpg',
    slug: 'pulse-01',
    colorway: 'Acid Ghost / Lime Volt',
    description:
      'Engineered with 3D-printed Voronoi lattice midsole and autoclave carbon propulsion plate. Unprecedented kinetic energy return.',
    accentColor: '#D9FF43',
  },
  {
    id: 'terra-ridge',
    name: 'TERRA RIDGE',
    subtitle: 'BASALT-X // ALL-TERRAIN',
    discipline: 'terra',
    disciplineLabel: 'TRAIL ADAPTIVE',
    price: 15499,
    originalPrice: 18000,
    weight: 278,
    drop: 6,
    rebound: '79.2%',
    image: '/images/products/terra-ridge.jpg',
    slug: 'terra-ridge',
    colorway: 'Basalt Clay / Terracotta',
    description:
      'Formulated with volcanic basalt micro-fibers embedded inside high-coefficient rubber. Uncompromised grip across scree and mud.',
    accentColor: '#B4553A',
  },
  {
    id: 'form-zero',
    name: 'FORM ZERO',
    subtitle: 'MONOCHROME // ESSENTIAL',
    discipline: 'form',
    disciplineLabel: 'LIFESTYLE MONOCHROME',
    price: 16999,
    originalPrice: 19500,
    weight: 295,
    drop: 0,
    rebound: '68.0%',
    image: '/images/products/form-zero.jpg',
    slug: 'form-zero',
    colorway: 'Bone Monochrome / Charcoal',
    description:
      'Minimalist brutalism crafted from 1.4mm Italian calfskin and brushed suede with sculpted architectural comfort sole.',
    accentColor: '#F3F0E9',
  },
  {
    id: 'pulse-speed-carbon',
    name: 'SPEED CARBON',
    subtitle: 'SUB-2 // VECTOR RACER',
    discipline: 'pulse',
    disciplineLabel: 'MARATHON ELITE',
    price: 18999,
    originalPrice: 21000,
    weight: 198,
    drop: 4,
    rebound: '91.2%',
    image: '/images/products/pulse-speed-carbon.jpg',
    slug: 'pulse-speed-carbon',
    colorway: 'Electric Cyan / Signal Blue',
    description:
      'Aerospace-grade high-modulus carbon rocker plate with dual-density nitrogen superfoam. Maximum biomechanical efficiency.',
    accentColor: '#1E5BFF',
  },
  {
    id: 'terra-dune-racer',
    name: 'TERRA GRAVITY DUNE',
    subtitle: 'ALPINE PRO // HIGH-ALTITUDE',
    discipline: 'terra',
    disciplineLabel: 'TECHNICAL MOUNTAIN',
    price: 17499,
    originalPrice: 19999,
    weight: 285,
    drop: 6,
    rebound: '76.5%',
    image: '/images/products/terra-gravity.jpg',
    slug: 'terra-dune-racer',
    colorway: 'Dune Sand / Tactical Olive',
    description:
      'Extreme alpine silhouette with 5.5mm multi-directional climbing lugs, ripstop mudguard, and integrated debris gaiter.',
    accentColor: '#A3997A',
  },
  {
    id: 'pulse-vector',
    name: 'VECTOR LATTICE',
    subtitle: '3D MATRIX // GRAPHITE',
    discipline: 'pulse',
    disciplineLabel: 'TRACK ARCHITECTURE',
    price: 19500,
    originalPrice: 22000,
    weight: 238,
    drop: 5,
    rebound: '89.5%',
    image: '/images/products/pulse-vector.jpg',
    slug: 'pulse-vector-lattice',
    colorway: 'Graphite / Carbon Core',
    description:
      'Computational fluid-engineered lattice chassis designed for rapid directional transitions and maximum energy return.',
    accentColor: '#0B0B0C',
  },
  {
    id: 'terra-basalt-mid',
    name: 'TERRA BASALT MID',
    subtitle: 'MID-CUT // ANKLE CHASSIS',
    discipline: 'terra',
    disciplineLabel: 'ALPINE TREKKING',
    price: 21200,
    originalPrice: 24500,
    weight: 315,
    drop: 7,
    rebound: '75.0%',
    image: '/images/products/terra-basalt.jpg',
    slug: 'terra-basalt-mid',
    colorway: 'Basalt Clay / Shadow Ink',
    description:
      'High-abrasion neoprene wrap, breathable waterproof membrane, and Vibram-grade basalt compound stone shield plate.',
    accentColor: '#B4553A',
  },
  {
    id: 'pulse-marathon',
    name: 'MARATHON ELITE',
    subtitle: 'AUTOCLAVE // ULTRA LIGHT',
    discipline: 'pulse',
    disciplineLabel: 'COMPETITION RACER',
    price: 25400,
    originalPrice: 28000,
    weight: 215,
    drop: 8,
    rebound: '92.4%',
    image: '/images/products/pulse-marathon.jpg',
    slug: 'pulse-marathon-elite',
    colorway: 'Acid Glow / Matte Black',
    description:
      'Sub-2-hour marathon geometry with responsive PEBA foam core and torsional carbon shank plate.',
    accentColor: '#D9FF43',
  },
  {
    id: 'form-atelier',
    name: 'FORM ATELIER',
    subtitle: 'ARCHITECTURAL // RAW LOW',
    discipline: 'form',
    disciplineLabel: 'LIFESTYLE LUXURY',
    price: 18200,
    originalPrice: 21000,
    weight: 310,
    drop: 0,
    rebound: '65.0%',
    image: '/images/products/form-zero.jpg',
    slug: 'form-zero',
    colorway: 'Raw Ecru / Obsidian Trim',
    description:
      'Sculptural footwear forged from full-grain calf leather with hand-finished edges and vulcanized rubber foxing.',
    accentColor: '#8A867E',
  },
  {
    id: 'form-studio',
    name: 'FORM STUDIO',
    subtitle: 'BRUTALIST // MINIMAL SLATE',
    discipline: 'form',
    disciplineLabel: 'STUDIO MONOCHROME',
    price: 15999,
    originalPrice: 18500,
    weight: 280,
    drop: 2,
    rebound: '70.2%',
    image: '/images/products/form-zero.jpg',
    slug: 'form-zero',
    colorway: 'Bone Ivory / Charcoal Suede',
    description:
      'Engineered for everyday urban traversal with anatomical cork insole and zero-drop balance platform.',
    accentColor: '#F3F0E9',
  },
];

const SIZES = ['7.5', '8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0'];

export function KineticShowcase3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('9.0');
  const [isHovered, setIsHovered] = useState(false);

  const { addItem, openCart } = useCartStore();
  const { items: wishlistItems, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { toast } = useToast();

  const filteredShoes =
    selectedDiscipline === 'all'
      ? SHOWCASE_SHOES
      : SHOWCASE_SHOES.filter((s) => s.discipline === selectedDiscipline);

  const currentShoe = filteredShoes[activeIndex % filteredShoes.length] || SHOWCASE_SHOES[0];
  const isWishlisted = wishlistItems.includes(currentShoe.id);

  const nextShoe = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % filteredShoes.length);
  }, [filteredShoes.length]);

  const prevShoe = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + filteredShoes.length) % filteredShoes.length);
  }, [filteredShoes.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextShoe();
      if (e.key === 'ArrowLeft') prevShoe();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextShoe, prevShoe]);

  // Mouse Wheel / Trackpad Scroll Navigation
  const lastWheelTime = React.useRef(0);
  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 18) return;

    const now = Date.now();
    if (now - lastWheelTime.current > 280) {
      lastWheelTime.current = now;
      if (delta > 0) {
        nextShoe();
      } else {
        prevShoe();
      }
    }
  };

  // Touch / Mobile Swipe Navigation
  const touchStartX = React.useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        nextShoe();
      } else {
        prevShoe();
      }
    }
    touchStartX.current = null;
  };

  const handleQuickAdd = () => {
    const variantId = `${currentShoe.id}-us-${selectedSize.replace('.', '_')}`;
    addItem({
      id: variantId,
      productId: currentShoe.id,
      slug: currentShoe.slug,
      name: currentShoe.name,
      variantId,
      size: parseFloat(selectedSize),
      color: currentShoe.colorway,
      price: currentShoe.price,
      quantity: 1,
      image: currentShoe.image,
    });

    toast({
      title: 'SILHOUETTE ACQUIRED',
      description: `${currentShoe.name} (US ${selectedSize}) staged into your bag.`,
      type: 'success',
    });

    openCart();
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(currentShoe.id);
      toast({
        title: 'ARCHIVE REMOVAL',
        description: `${currentShoe.name} removed from your saved archive.`,
        type: 'default',
      });
    } else {
      addToWishlist(currentShoe.id);
      toast({
        title: 'ARCHIVE PRESERVED',
        description: `${currentShoe.name} saved to your personal wishlist.`,
        type: 'success',
      });
    }
  };

  return (
    <section className="relative w-full bg-bone border-b border-line overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
      {/* 1. TOP DISCOVERY BAND (Nike Reference Style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-8">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-acid animate-ping" />
            <Badge variant="acid" className="font-bold">
              KINETIC 3D STAGE
            </Badge>
            <span className="micro-label text-smoke">SSENSE / EDITORIAL MODE</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <h2 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-ink">
              SCROLL TO DISCOVER
            </h2>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-7 h-7 rounded-full bg-ink text-bone flex items-center justify-center"
            >
              <ArrowDown className="w-4 h-4 text-acid" />
            </motion.div>
          </div>
          <p className="micro-label text-smoke">
            ROTATE VIA MOUSE WHEEL · TOUCH SWIPE · ARROW CONTROLS · 3D PERSPECTIVE
          </p>
        </div>
      </div>

      {/* 2. MAIN 3D SHOWCASE VIEWPORT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Vertical Discipline Index (SSENSE Luxury Reference Style) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col justify-center space-y-6 border-r border-line/60 pr-8">
            <div className="space-y-1">
              <span className="micro-label text-smoke">// CATALOG DIRECTORY</span>
              <h3 className="font-display font-bold text-lg uppercase tracking-tight">DISCIPLINES</h3>
            </div>

            <nav className="flex flex-col space-y-3 font-mono text-xs">
              <button
                onClick={() => {
                  setSelectedDiscipline('all');
                  setActiveIndex(0);
                }}
                className={`text-left py-2 px-3 border-l-2 transition-all flex items-center justify-between ${
                  selectedDiscipline === 'all'
                    ? 'border-ink font-bold text-ink bg-paper'
                    : 'border-transparent text-smoke hover:text-ink'
                }`}
              >
                <span>ALL SILHOUETTES</span>
                <span className="text-[10px] text-smoke">[{SHOWCASE_SHOES.length}]</span>
              </button>

              <button
                onClick={() => {
                  setSelectedDiscipline('pulse');
                  setActiveIndex(0);
                }}
                className={`text-left py-2 px-3 border-l-2 transition-all flex items-center justify-between ${
                  selectedDiscipline === 'pulse'
                    ? 'border-acid font-bold text-ink bg-paper'
                    : 'border-transparent text-smoke hover:text-ink'
                }`}
              >
                <span>PULSE // ROAD</span>
                <span className="text-[10px] text-smoke">
                  [{SHOWCASE_SHOES.filter((s) => s.discipline === 'pulse').length}]
                </span>
              </button>

              <button
                onClick={() => {
                  setSelectedDiscipline('terra');
                  setActiveIndex(0);
                }}
                className={`text-left py-2 px-3 border-l-2 transition-all flex items-center justify-between ${
                  selectedDiscipline === 'terra'
                    ? 'border-clay font-bold text-ink bg-paper'
                    : 'border-transparent text-smoke hover:text-ink'
                }`}
              >
                <span>TERRA // TRAIL</span>
                <span className="text-[10px] text-smoke">
                  [{SHOWCASE_SHOES.filter((s) => s.discipline === 'terra').length}]
                </span>
              </button>

              <button
                onClick={() => {
                  setSelectedDiscipline('form');
                  setActiveIndex(0);
                }}
                className={`text-left py-2 px-3 border-l-2 transition-all flex items-center justify-between ${
                  selectedDiscipline === 'form'
                    ? 'border-ink font-bold text-ink bg-paper'
                    : 'border-transparent text-smoke hover:text-ink'
                }`}
              >
                <span>FORM // STUDIO</span>
                <span className="text-[10px] text-smoke">
                  [{SHOWCASE_SHOES.filter((s) => s.discipline === 'form').length}]
                </span>
              </button>
            </nav>

            {/* Technical Spec Highlight */}
            <div className="pt-6 border-t border-line space-y-2 text-xs font-mono text-smoke">
              <div className="text-ink font-bold uppercase">// BIOMECHANICS</div>
              <div>CUSHION: 3D VORONOI LATTICE</div>
              <div>PROPULSION: FULL CARBON PLATE</div>
              <div>PAYMENTS: CASHFREE INR (₹)</div>
            </div>
          </div>

          {/* Center & Right: 3D Floating Shoes Stage + Technical Card */}
          <div className="lg:col-span-9 flex flex-col items-center">
            {/* 3D Floating Shoes Stage */}
            <div
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative w-full h-[340px] sm:h-[440px] lg:h-[500px] flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Navigation Arrows */}
              <button
                onClick={prevShoe}
                aria-label="Previous shoe"
                className="absolute left-2 sm:left-4 z-40 w-11 h-11 rounded-full bg-paper/90 border border-line flex items-center justify-center text-ink hover:bg-ink hover:text-bone hover:border-ink transition-all shadow-md group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={nextShoe}
                aria-label="Next shoe"
                className="absolute right-2 sm:right-4 z-40 w-11 h-11 rounded-full bg-paper/90 border border-line flex items-center justify-center text-ink hover:bg-ink hover:text-bone hover:border-ink transition-all shadow-md group"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Shoes Render Loop (Depth-of-field carousel) */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Preloader for instant carousel rotation */}
                <div className="hidden" aria-hidden="true">
                  {filteredShoes.map((shoe) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={shoe.id} src={shoe.image} alt="" />
                  ))}
                </div>

                {filteredShoes.map((shoe, idx) => {
                  const total = filteredShoes.length;
                  if (total === 0) return null;

                  // Circular shortest offset from activeIndex to idx
                  let offset = (idx - (activeIndex % total) + total) % total;
                  if (offset > total / 2) {
                    offset -= total;
                  }

                  const isCenter = offset === 0;
                  const isLeft = offset === -1;
                  const isRight = offset === 1;
                  const isOffstage = Math.abs(offset) > 1.5;

                  return (
                    <motion.div
                      key={shoe.id}
                      onClick={() => {
                        if (!isCenter) {
                          setActiveIndex(idx);
                        }
                      }}
                      drag={isCenter ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -45 || info.velocity.x < -300) {
                          nextShoe();
                        } else if (info.offset.x > 45 || info.velocity.x > 300) {
                          prevShoe();
                        }
                      }}
                      initial={false}
                      animate={{
                        x: isCenter
                          ? '0%'
                          : isLeft
                          ? '-68%'
                          : isRight
                          ? '68%'
                          : offset < 0
                          ? '-140%'
                          : '140%',
                        scale: isCenter ? 1 : isLeft || isRight ? 0.68 : 0.45,
                        opacity: isCenter ? 1 : isLeft || isRight ? 0.45 : 0,
                        filter: isCenter ? 'blur(0px)' : isLeft || isRight ? 'blur(4px)' : 'blur(8px)',
                        zIndex: isCenter ? 30 : isLeft || isRight ? 10 : 0,
                        rotate: isCenter ? (isHovered ? 2 : 0) : offset < 0 ? -12 : 12,
                      }}
                      transition={
                        isOffstage
                          ? { duration: 0 }
                          : {
                              type: 'spring',
                              stiffness: 220,
                              damping: 24,
                              mass: 0.85,
                            }
                      }
                      className={`absolute select-none flex flex-col items-center justify-center transition-opacity ${
                        isCenter
                          ? 'cursor-grab active:cursor-grabbing pointer-events-auto'
                          : isOffstage
                          ? 'pointer-events-none'
                          : 'cursor-pointer pointer-events-auto hover:opacity-75'
                      }`}
                    >
                      {/* Floating Sneaker Wrapper with Subtle Levitation Animation */}
                      <motion.div
                        animate={
                          isCenter
                            ? {
                                y: [0, -12, 0],
                              }
                            : { y: 0 }
                        }
                        transition={{
                          repeat: Infinity,
                          duration: 3.2,
                          ease: 'easeInOut',
                        }}
                        className="relative w-[290px] sm:w-[420px] lg:w-[500px] aspect-[4/3] flex items-center justify-center"
                      >
                        <Image
                          src={shoe.image}
                          alt={shoe.name}
                          fill
                          unoptimized
                          priority
                          sizes="(max-width: 768px) 290px, (max-width: 1200px) 420px, 500px"
                          className="object-contain drop-shadow-[0_24px_30px_rgba(11,11,12,0.18)]"
                        />
                      </motion.div>

                      {/* Dynamic Soft Contact Shadow */}
                      <motion.div
                        animate={
                          isCenter
                            ? {
                                scale: [1, 0.85, 1],
                                opacity: [0.35, 0.22, 0.35],
                              }
                            : { scale: 0.8, opacity: 0.15 }
                        }
                        transition={{
                          repeat: Infinity,
                          duration: 3.2,
                          ease: 'easeInOut',
                        }}
                        className="w-48 sm:w-72 h-4 rounded-[100%] bg-black/40 blur-md -mt-4 sm:-mt-6 pointer-events-none"
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* 3. TECHNICAL SPECIFICATIONS & ACTION BAR (SSENSE Minimal Luxury Style) */}
            <motion.div
              key={currentShoe.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl bg-paper border border-line p-6 sm:p-8 mt-2 space-y-6 shadow-sm"
            >
              {/* Top Row: Model & Price */}
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        currentShoe.discipline === 'pulse'
                          ? 'acid'
                          : currentShoe.discipline === 'terra'
                          ? 'clay'
                          : 'outline'
                      }
                      className="font-bold"
                    >
                      {currentShoe.disciplineLabel}
                    </Badge>
                    <span className="micro-label text-smoke">{currentShoe.colorway}</span>
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tighter text-ink mt-1">
                    {currentShoe.name}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="font-display font-black text-xl sm:text-2xl text-ink">
                    ₹{currentShoe.price.toLocaleString('en-IN')}
                  </div>
                  <div className="font-mono text-xs text-smoke line-through">
                    ₹{currentShoe.originalPrice.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Middle Row: Technical Spec Counters */}
              <div className="grid grid-cols-3 gap-2 py-2 font-mono text-xs text-center border-b border-line pb-4">
                <div className="space-y-0.5">
                  <div className="text-[10px] text-smoke uppercase">// WEIGHT</div>
                  <div className="font-bold text-ink text-sm sm:text-base">{currentShoe.weight}G</div>
                </div>
                <div className="space-y-0.5 border-x border-line/60">
                  <div className="text-[10px] text-smoke uppercase">// REBOUND RATE</div>
                  <div className="font-bold text-ink text-sm sm:text-base text-acid-contrast">
                    {currentShoe.rebound}
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] text-smoke uppercase">// BIOMECHANICAL DROP</div>
                  <div className="font-bold text-ink text-sm sm:text-base">{currentShoe.drop}MM</div>
                </div>
              </div>

              {/* Size Selector Pills */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-smoke">SELECT US SIZE:</span>
                  <Link
                    href="/size-guide"
                    className="text-smoke hover:text-ink underline text-[11px]"
                  >
                    SIZE MATRIX & CONVERSION
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-9 px-3.5 border font-mono text-xs transition-all ${
                        selectedSize === sz
                          ? 'border-ink bg-ink text-bone font-bold'
                          : 'border-line bg-bone text-smoke hover:border-ink hover:text-ink'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Actions: Bag, PDP link, Wishlist (Responsive Stack on Mobile) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button
                  onClick={handleQuickAdd}
                  size="lg"
                  className="w-full sm:flex-1 bg-ink text-bone hover:bg-ink/90 font-mono text-xs h-12"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" /> QUICK ADD // US {selectedSize}
                </Button>

                <div className="flex items-center gap-2 sm:shrink-0">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="flex-1 sm:flex-initial font-mono text-xs h-12 px-4"
                  >
                    <Link href={`/product/${currentShoe.slug}`}>
                      SPECS <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </Button>

                  <Button
                    onClick={handleToggleWishlist}
                    variant="outline"
                    size="lg"
                    className={`h-12 w-12 p-0 shrink-0 ${
                      isWishlisted ? 'text-clay border-clay' : 'text-smoke hover:text-ink'
                    }`}
                    aria-label="Toggle Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-clay' : ''}`} />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
