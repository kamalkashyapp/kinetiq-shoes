'use client';

import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Play, Pause } from 'lucide-react';
import { useReducedMotion } from '@/providers/ReducedMotionProvider';

interface HeroShoe3DProps {
  className?: string;
}

export function HeroShoe3D({ className = '' }: HeroShoe3DProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(!shouldReduceMotion);
  const [azimuthDeg, setAzimuthDeg] = useState(0);

  // References for Three.js state
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const shoeGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationFrameId: number;
    let isDisposed = false;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    // Initial camera position: slightly elevated 3/4 perspective
    camera.position.set(1.4, 0.5, 2.2);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key Light (warm white directional)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Fill Light (soft cool bone fill)
    const fillLight = new THREE.DirectionalLight(0xf3f0e9, 1.2);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    // KINETIQ Acid Accent Rim Light (creates signature electric edge highlight)
    const rimLight = new THREE.DirectionalLight(0xd9ff43, 0.85);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);

    // Bottom Bounce Light (illuminates outsole lugs)
    const bounceLight = new THREE.DirectionalLight(0xffffff, 0.6);
    bounceLight.position.set(0, -3, 0);
    scene.add(bounceLight);

    // 5. Ground Contact Shadow (Soft procedural radial gradient)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(11, 11, 12, 0.45)');
      gradient.addColorStop(0.4, 'rgba(11, 11, 12, 0.22)');
      gradient.addColorStop(0.8, 'rgba(11, 11, 12, 0.05)');
      gradient.addColorStop(1, 'rgba(11, 11, 12, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(1.8, 1.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.52;
    scene.add(shadowMesh);

    // 6. OrbitControls (Full 360-degree interactive freedom)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = !shouldReduceMotion;
    controls.autoRotateSpeed = 2.4; // Smooth ~24 deg/sec orbit
    controls.maxPolarAngle = Math.PI - 0.08; // Allow viewing full 360 vertical orbit including outsole
    controls.minPolarAngle = 0.08; // Allow viewing full top dorsal angle
    controls.minDistance = 1.2;
    controls.maxDistance = 3.8;
    controls.enableZoom = true;
    controls.target.set(0, -0.05, 0);
    controlsRef.current = controls;

    // 7. Load Real 3D Sneaker GLTF/GLB
    const shoeGroup = new THREE.Group();
    scene.add(shoeGroup);
    shoeGroupRef.current = shoeGroup;

    const loader = new GLTFLoader();
    loader.load(
      '/models/sneaker.glb',
      (gltf) => {
        if (isDisposed) return;

        const model = gltf.scene;

        // Compute Bounding Box to center the shoe at exact (0, 0, 0)
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;

        // Normalize scale to fit container view
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1.75 / maxDim;
        shoeGroup.scale.set(scale, scale, scale);

        // Enhance material shaders for athletic sneaker sheen
        model.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material.roughness !== undefined) {
              child.material.roughness = Math.max(0.3, child.material.roughness);
            }
          }
        });

        shoeGroup.add(model);
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error('Failed to load 3D sneaker GLB:', error);
        if (!isDisposed) {
          setIsLoading(false);
          setLoadError(true);
        }
      }
    );

    // 8. Render Animation Loop with Smooth Floating Levitation
    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Subtle floating levitation
      if (shoeGroup) {
        shoeGroup.position.y = Math.sin(elapsed * 1.6) * 0.035;
        shadowMesh.scale.setScalar(1 - Math.sin(elapsed * 1.6) * 0.06);
      }

      controls.update();

      // Calculate current azimuthal rotation in degrees (0 to 360)
      const rawAzimuth = controls.getAzimuthalAngle();
      const deg = Math.round(((rawAzimuth * (180 / Math.PI)) % 360 + 360) % 360);
      setAzimuthDeg(deg);

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Observer for dynamic responsiveness
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      shadowTexture.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
    };
  }, [shouldReduceMotion]);

  // Toggle Auto Rotation
  const toggleAutoRotate = () => {
    if (!controlsRef.current) return;
    const next = !isAutoRotate;
    setIsAutoRotate(next);
    controlsRef.current.autoRotate = next;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[460px] sm:h-[500px] lg:h-[540px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing ${className}`}
    >
      {/* Real WebGL 3D Canvas - completely borderless, seamless on bone background */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Loading State Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 z-40 bg-bone/70 backdrop-blur-xs">
          <div className="w-8 h-8 border-2 border-line border-t-ink rounded-full animate-spin" />
          <span className="micro-label text-ink font-bold text-[9px] tracking-widest block">
            INITIALIZING 3D SNEAKER
          </span>
        </div>
      )}

      {/* Fallback if WebGL unavailable */}
      {loadError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/products/pulse-01.jpg"
            alt="PULSE 01"
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Subtle Floating 360° Telemetry Pill (No borders around the shoe, No preset buttons) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-paper/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-line/60 shadow-xs pointer-events-auto transition-all text-smoke hover:text-ink">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isAutoRotate ? 'bg-acid animate-pulse' : 'bg-smoke'
          }`}
        />
        <span className="micro-label text-[9px] font-mono tracking-wider font-bold text-ink">
          360° INTERACTIVE
        </span>
        <span className="text-smoke/40 text-[9px]">/</span>
        <span className="micro-label text-[9px] font-mono tracking-wider text-smoke hidden sm:inline">
          DRAG TO ROTATE
        </span>
        <span className="text-smoke/40 text-[9px]">/</span>
        <span className="font-mono text-[10px] font-bold text-ink">
          {azimuthDeg.toString().padStart(3, '0')}°
        </span>
        <button
          onClick={toggleAutoRotate}
          className="ml-1 p-1 rounded-full hover:bg-ink/5 text-smoke hover:text-ink transition-colors"
          title={isAutoRotate ? 'Pause 360 Auto Orbit' : 'Start 360 Auto Orbit'}
        >
          {isAutoRotate ? (
            <Pause className="w-3 h-3 fill-ink text-ink" />
          ) : (
            <Play className="w-3 h-3 fill-smoke text-smoke" />
          )}
        </button>
      </div>
    </div>
  );
}
