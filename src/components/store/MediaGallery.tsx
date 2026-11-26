'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, RotateCw, Image as ImageIcon } from 'lucide-react';
import { SpinViewer360 } from './SpinViewer360';
import { useReducedMotion } from '@/providers/ReducedMotionProvider';

interface MediaGalleryProps {
  images: { url: string; alt: string; label: string }[];
  spinFrames?: string[];
  productName: string;
  colorHex?: string;
  collection?: string;
}

export function MediaGallery({
  images,
  spinFrames = [],
  productName,
  colorHex,
  collection,
}: MediaGalleryProps) {
  const shouldReduceMotion = useReducedMotion();
  const mainImageRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [is360Mode, setIs360Mode] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);

  // Desktop hover zoom pointer tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || is360Mode || !mainImageRef.current) return;
    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomOrigin({ x, y });
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, images.length]);

  return (
    <div className="w-full space-y-4">
      {/* Mode Switcher Tabs (3D 360° Interactive vs Still Gallery) */}
      <div className="flex items-center justify-between border-b border-line pb-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIs360Mode(true)}
            className={`px-3 py-1 text-xs font-mono uppercase transition-colors flex items-center gap-1.5 ${
              is360Mode
                ? 'bg-acid text-ink font-bold'
                : 'text-smoke hover:text-ink border border-line bg-paper'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>3D 360° INTERACTIVE</span>
          </button>

          <button
            type="button"
            onClick={() => setIs360Mode(false)}
            className={`px-3 py-1 text-xs font-mono uppercase transition-colors flex items-center gap-1.5 ${
              !is360Mode
                ? 'bg-ink text-bone font-bold'
                : 'text-smoke hover:text-ink border border-line bg-paper'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>STILL GALLERY [{images.length}]</span>
          </button>
        </div>

        {!is360Mode && (
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            aria-label="Open fullscreen gallery"
            className="hidden sm:flex items-center gap-1 text-xs font-mono text-smoke hover:text-ink"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>LIGHTBOX</span>
          </button>
        )}
      </div>

      {/* Main Display Stage */}
      {is360Mode ? (
        <SpinViewer360
          frames={spinFrames}
          productName={productName}
          colorHex={colorHex}
          collection={collection}
          fallbackImage={images[0]?.url}
        />
      ) : (
        <div
          ref={mainImageRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          className="relative aspect-[4/5] w-full bg-bone border border-line overflow-hidden select-none cursor-crosshair group flex items-center justify-center p-4 sm:p-8"
        >
          <img
            src={images[activeIndex]?.url}
            alt={images[activeIndex]?.alt || productName}
            style={{
              transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
              transform: isZoomed && !shouldReduceMotion ? 'scale(1.4)' : 'scale(1)',
            }}
            className="w-full h-full object-contain transition-transform duration-100 ease-out will-change-transform pointer-events-none drop-shadow-[0_20px_24px_rgba(11,11,12,0.12)]"
          />

          {/* Zoom hint micro-badge */}
          <div className="absolute bottom-4 left-4 pointer-events-none bg-paper/90 backdrop-blur-sm border border-line px-2.5 py-1 hidden sm:block">
            <span className="micro-label text-[9px] text-smoke">
              {isZoomed ? 'ZOOM ACTIVE // HOVER TO INSPECT' : 'HOVER TO ZOOM DETAIL'}
            </span>
          </div>

          <div className="absolute top-4 right-4 z-10 sm:hidden">
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="p-2 bg-paper/90 border border-line text-ink"
              aria-label="Open fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Thumbnail Navigation Rail (Dedicated 3D 360° + Photo Angles) */}
      <div className="grid grid-cols-6 gap-2 pt-2">
        {/* 1. 3D 360° Viewer Thumbnail */}
        <button
          type="button"
          onClick={() => setIs360Mode(true)}
          className={`aspect-square border bg-bone overflow-hidden transition-all relative flex flex-col items-center justify-center p-1.5 ${
            is360Mode
              ? 'border-ink ring-1 ring-ink bg-paper'
              : 'border-line opacity-75 hover:opacity-100 hover:border-ink'
          }`}
          title="Interactive 3D 360° Orbit"
        >
          <RotateCw className="w-4 h-4 text-ink mb-1" />
          <span className="micro-label text-[8px] font-bold text-ink text-center">
            3D 360°
          </span>
        </button>

        {/* 2-6. Still Photo Thumbnails */}
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setActiveIndex(idx);
              setIs360Mode(false);
            }}
            className={`aspect-square border bg-bone overflow-hidden transition-all relative flex items-center justify-center p-1.5 ${
              activeIndex === idx && !is360Mode
                ? 'border-ink ring-1 ring-ink bg-paper'
                : 'border-line opacity-75 hover:opacity-100 hover:border-ink'
            }`}
          >
            <img src={img.url} alt={img.label} className="w-full h-full object-contain" />
            <span className="absolute bottom-1 left-1 right-1 micro-label text-[8px] bg-paper/95 backdrop-blur-xs text-center truncate px-0.5 border border-line/40">
              {img.label}
            </span>
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-ink/95 flex flex-col justify-between p-4 md:p-8 animate-in fade-in duration-fast"
        >
          {/* Header */}
          <div className="flex justify-between items-center text-bone">
            <div>
              <p className="font-display font-bold text-lg">{productName}</p>
              <p className="micro-label text-smoke text-[10px]">
                VIEW {activeIndex + 1} OF {images.length} // {images[activeIndex]?.label.toUpperCase()}
              </p>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close fullscreen"
              className="p-2 text-smoke hover:text-bone border border-bone/20 hover:border-bone transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Centered Image with Arrow Navigation */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)}
              aria-label="Previous image"
              className="absolute left-2 md:left-6 z-10 p-3 bg-bone/10 hover:bg-bone/20 text-bone border border-bone/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={images[activeIndex]?.url}
              alt={images[activeIndex]?.alt}
              className="max-h-[75vh] max-w-[85vw] object-contain border border-bone/20"
            />

            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
              aria-label="Next image"
              className="absolute right-2 md:right-6 z-10 p-3 bg-bone/10 hover:bg-bone/20 text-bone border border-bone/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex justify-center gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-14 h-14 border bg-bone overflow-hidden transition-all ${
                  activeIndex === idx ? 'border-acid scale-105' : 'border-bone/20 opacity-50'
                }`}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
