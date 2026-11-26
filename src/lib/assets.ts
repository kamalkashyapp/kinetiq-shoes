// KINETIQ Asset Studio & Placeholder Generator
// Generates art-directed editorial sneaker silhouettes and textures as SVGs

export type CollectionSlug = 'terra' | 'pulse' | 'form';

export interface PlaceholderConfig {
  collection: CollectionSlug;
  name: string;
  colorway: string;
  angle?: 'three-quarter' | 'profile' | 'top' | 'sole';
  aspectRatio?: '4-5' | '1-1' | '16-9';
}

const PALETTES = {
  terra: {
    bg1: '#1F1B18',
    bg2: '#3A2E26',
    accent: '#B4553A',
    shoeMain: '#D6C7B2',
    shoeSole: '#B4553A',
    accentGlow: 'rgba(180, 85, 58, 0.25)',
    gridColor: 'rgba(214, 199, 178, 0.08)',
  },
  pulse: {
    bg1: '#0B0F0E',
    bg2: '#16221D',
    accent: '#D9FF43',
    shoeMain: '#ECEEF0',
    shoeSole: '#D9FF43',
    accentGlow: 'rgba(217, 255, 67, 0.3)',
    gridColor: 'rgba(217, 255, 67, 0.08)',
  },
  form: {
    bg1: '#121213',
    bg2: '#202024',
    accent: '#F3F0E9',
    shoeMain: '#E8E5DE',
    shoeSole: '#8A867E',
    accentGlow: 'rgba(243, 240, 233, 0.15)',
    gridColor: 'rgba(243, 240, 233, 0.06)',
  },
};

export function generateProductSvg({
  collection,
  name,
  colorway,
  angle = 'three-quarter',
  aspectRatio = '4-5',
}: PlaceholderConfig): string {
  const p = PALETTES[collection] || PALETTES.pulse;
  const width = aspectRatio === '1-1' ? 800 : aspectRatio === '16-9' ? 1200 : 800;
  const height = aspectRatio === '1-1' ? 800 : aspectRatio === '16-9' ? 675 : 1000;

  // Sneaker silhouette path variations based on angle
  const shoeProfilePath = angle === 'profile'
    ? 'M 180,620 C 220,625 280,630 360,630 C 440,630 520,610 600,600 C 630,595 650,575 640,545 C 630,515 570,470 510,440 C 460,415 410,430 360,450 C 310,470 270,490 220,530 C 170,570 150,610 180,620 Z'
    : 'M 220,580 C 270,590 340,600 440,595 C 540,590 610,550 640,520 C 655,505 645,480 620,460 C 570,420 500,390 430,420 C 370,445 320,480 270,510 C 230,535 200,565 220,580 Z';

  const solePath = angle === 'profile'
    ? 'M 175,620 C 220,628 320,635 440,632 C 550,628 620,610 645,595 C 655,615 640,630 610,635 C 520,650 420,652 320,650 C 220,648 165,635 175,620 Z'
    : 'M 215,580 C 280,595 380,605 480,598 C 570,592 630,570 645,550 C 655,568 640,585 610,592 C 510,615 400,618 310,614 C 215,610 195,595 215,580 Z';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <radialGradient id="grad-bg" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="${p.bg2}" />
      <stop offset="100%" stop-color="${p.bg1}" />
    </radialGradient>
    <radialGradient id="grad-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${p.accentGlow}" />
      <stop offset="100%" stop-color="transparent" />
    </radialGradient>
    <linearGradient id="grad-shoe" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.shoeMain}" />
      <stop offset="70%" stop-color="#808080" />
      <stop offset="100%" stop-color="#2A2A2C" />
    </linearGradient>
    <linearGradient id="grad-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${p.accent}" />
      <stop offset="100%" stop-color="${p.shoeSole}" />
    </linearGradient>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0" />
      <feComposite in2="SourceGraphic" in="gl" operator="in" />
    </filter>
  </defs>

  <!-- Deep Editorial Background -->
  <rect width="100%" height="100%" fill="url(#grad-bg)" />

  <!-- Technical Atmospheric Grid Lines -->
  <g stroke="${p.gridColor}" stroke-width="1">
    <line x1="0" y1="${height * 0.2}" x2="${width}" y2="${height * 0.2}" />
    <line x1="0" y1="${height * 0.5}" x2="${width}" y2="${height * 0.5}" />
    <line x1="0" y1="${height * 0.8}" x2="${width}" y2="${height * 0.8}" />
    <line x1="${width * 0.2}" y1="0" x2="${width * 0.2}" y2="${height}" />
    <line x1="${width * 0.8}" y1="0" x2="${width * 0.8}" y2="${height}" />
  </g>

  <!-- Core Ambient Glow -->
  <ellipse cx="${width * 0.5}" cy="${height * 0.55}" rx="${width * 0.35}" ry="${height * 0.22}" fill="url(#grad-glow)" />

  <!-- Grounding Contact Shadow -->
  <ellipse cx="${width * 0.5}" cy="${height * 0.68}" rx="${width * 0.32}" ry="${height * 0.04}" fill="rgba(0,0,0,0.6)" filter="blur(16px)" />

  <!-- Outsole & Midsole -->
  <path d="${solePath}" fill="url(#grad-accent)" filter="drop-shadow(0 12px 20px rgba(0,0,0,0.4))" />

  <!-- Engineered Upper Silhouette -->
  <path d="${shoeProfilePath}" fill="url(#grad-shoe)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />

  <!-- Technical Structural Lines / Dynamic Overlays -->
  <path d="M 320,490 Q 420,530 540,480" stroke="${p.accent}" stroke-width="2" fill="none" opacity="0.8" />
  <path d="M 340,515 Q 430,550 510,510" stroke="rgba(255,255,255,0.2)" stroke-width="1" fill="none" />
  <circle cx="340" cy="515" r="3" fill="${p.accent}" />
  <circle cx="510" cy="510" r="3" fill="${p.accent}" />

  <!-- Editorial Brand & Micro-label Typography -->
  <g font-family="monospace" font-size="11" fill="rgba(255,255,255,0.4)" letter-spacing="0.14em">
    <text x="40" y="50">KINETIQ // SERIES 01</text>
    <text x="40" y="${height - 40}">COLL: ${collection.toUpperCase()} // ${colorway.toUpperCase()}</text>
    <text x="${width - 40}" y="50" text-anchor="end">WT: 210G</text>
    <text x="${width - 40}" y="${height - 40}" text-anchor="end">SYS: K-LATTICE</text>
  </g>

  <!-- Oversized Editorial Watermark -->
  <text x="${width * 0.5}" y="${height * 0.35}" 
        font-family="sans-serif" font-weight="900" font-size="${width * 0.14}" 
        fill="rgba(255,255,255,0.03)" text-anchor="middle" letter-spacing="-0.04em">
    ${name.toUpperCase()}
  </text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Pre-generated master placeholder registry
export function generate360SpinFrames(
  collection: CollectionSlug,
  name: string,
  colorway: string,
  frameCount: number = 24
): string[] {
  const frames: string[] = [];
  for (let i = 0; i < frameCount; i++) {
    const angleDeg = Math.round((i / frameCount) * 360);
    const angleType = i % 4 === 0 ? 'profile' : i % 4 === 1 ? 'three-quarter' : i % 4 === 2 ? 'top' : 'sole';
    frames.push(
      generateProductSvg({
        collection,
        name: `${name} // ${angleDeg}°`,
        colorway,
        angle: angleType as any,
        aspectRatio: '1-1',
      })
    );
  }
  return frames;
}

export const PLACEHOLDERS = {
  terraHero: generateProductSvg({ collection: 'terra', name: 'TERRA RIDGE', colorway: 'Clay Basalt', angle: 'three-quarter', aspectRatio: '4-5' }),
  terraHover: generateProductSvg({ collection: 'terra', name: 'TERRA RIDGE', colorway: 'Clay Basalt', angle: 'profile', aspectRatio: '4-5' }),
  pulseHero: generateProductSvg({ collection: 'pulse', name: 'PULSE 01', colorway: 'Acid Ghost', angle: 'three-quarter', aspectRatio: '4-5' }),
  pulseHover: generateProductSvg({ collection: 'pulse', name: 'PULSE 01', colorway: 'Acid Ghost', angle: 'profile', aspectRatio: '4-5' }),
  formHero: generateProductSvg({ collection: 'form', name: 'FORM ZERO', colorway: 'Bone Monochrome', angle: 'three-quarter', aspectRatio: '4-5' }),
  formHover: generateProductSvg({ collection: 'form', name: 'FORM ZERO', colorway: 'Bone Monochrome', angle: 'profile', aspectRatio: '4-5' }),
  bannerTerra: generateProductSvg({ collection: 'terra', name: 'TERRA', colorway: 'Rugged Outsole', angle: 'profile', aspectRatio: '16-9' }),
  bannerPulse: generateProductSvg({ collection: 'pulse', name: 'PULSE', colorway: 'Pure Aerodynamics', angle: 'profile', aspectRatio: '16-9' }),
  bannerForm: generateProductSvg({ collection: 'form', name: 'FORM', colorway: 'Essential Form', angle: 'profile', aspectRatio: '16-9' }),
};
