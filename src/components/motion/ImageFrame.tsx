'use client';

import React from 'react';
import { useReducedMotion } from '@/providers/ReducedMotionProvider';

export type FrameVariant = 'arch' | 'blob' | 'square-tear' | 'film-strip' | 'offset-duplicate' | 'inset';

interface ImageFrameProps {
  src: string;
  alt: string;
  variant?: FrameVariant;
  caption?: string;
  className?: string;
  aspectRatio?: '4-5' | '1-1' | '16-9';
}

export function ImageFrame({
  src,
  alt,
  variant = 'arch',
  caption,
  className = '',
  aspectRatio = '4-5',
}: ImageFrameProps) {
  const shouldReduceMotion = useReducedMotion();

  const aspectClass =
    aspectRatio === '1-1' ? 'aspect-square' : aspectRatio === '16-9' ? 'aspect-video' : 'aspect-[4/5]';

  // Render variant layout
  const renderFrameContent = () => {
    switch (variant) {
      case 'arch':
        return (
          <div className="w-full h-full overflow-hidden rounded-t-[999px] border border-line bg-bone">
            <img src={src} alt={alt} className="w-full h-full object-cover" />
          </div>
        );

      case 'blob':
        return (
          <div
            className="w-full h-full overflow-hidden border border-line bg-bone"
            style={{
              clipPath:
                'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            }}
          >
            <img src={src} alt={alt} className="w-full h-full object-cover" />
          </div>
        );

      case 'square-tear':
        return (
          <div
            className="w-full h-full overflow-hidden border border-line bg-bone"
            style={{
              clipPath:
                'polygon(0% 0%, 100% 0%, 97% 25%, 100% 50%, 96% 75%, 100% 100%, 0% 100%, 4% 75%, 0% 50%, 3% 25%)',
            }}
          >
            <img src={src} alt={alt} className="w-full h-full object-cover" />
          </div>
        );

      case 'film-strip':
        return (
          <div className="w-full h-full grid grid-cols-3 gap-1 bg-ink p-1 border border-ink">
            <div className="overflow-hidden bg-bone">
              <img src={src} alt={`${alt} - Frame 1`} className="w-full h-full object-cover object-left" />
            </div>
            <div className="overflow-hidden bg-bone">
              <img src={src} alt={`${alt} - Frame 2`} className="w-full h-full object-cover object-center" />
            </div>
            <div className="overflow-hidden bg-bone">
              <img src={src} alt={`${alt} - Frame 3`} className="w-full h-full object-cover object-right" />
            </div>
          </div>
        );

      case 'offset-duplicate':
        return (
          <div className="relative w-full h-full">
            {/* Ghost offset duplicate image */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 opacity-25 border border-ink bg-ink/10 overflow-hidden pointer-events-none">
              <img src={src} alt="" aria-hidden="true" className="w-full h-full object-cover filter grayscale" />
            </div>
            {/* Foreground crisp image */}
            <div className="relative z-10 w-full h-full border border-line bg-paper overflow-hidden shadow-sm">
              <img src={src} alt={alt} className="w-full h-full object-cover" />
            </div>
          </div>
        );

      case 'inset':
      default:
        return (
          <div className="w-full h-full p-4 border border-line bg-paper flex flex-col justify-between">
            <div className="overflow-hidden border border-line-soft bg-bone flex-1">
              <img src={src} alt={alt} className="w-full h-full object-cover" />
            </div>
          </div>
        );
    }
  };

  return (
    <figure className={`flex flex-col space-y-2 ${className}`}>
      <div className={`w-full ${aspectClass} relative`}>{renderFrameContent()}</div>
      {caption && (
        <figcaption className="micro-label text-smoke text-[9px] pt-1 flex items-center justify-between">
          <span>// {caption.toUpperCase()}</span>
          <span className="font-mono text-smoke/70">[{variant.toUpperCase()}]</span>
        </figcaption>
      )}
    </figure>
  );
}
