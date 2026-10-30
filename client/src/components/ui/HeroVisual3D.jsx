import React, { useEffect, useRef } from 'react';

/**
 * SolveSpace Abstract Metallic 3D Sculpture
 * Renders interconnected silver-chrome parametric ribbon geometries
 * with real-time studio specular lighting, smooth cursor parallax,
 * and graceful fallback for mobile / reduced-motion.
 */
export default function HeroVisual3D() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let time = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const numPoints = 260;
    const ribbons = 3;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReducedMotion = mediaQuery.matches;

    const render = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Soft studio contact shadow beneath the chrome sculpture on white
      const shadowGrad = ctx.createRadialGradient(cx, cy + 140, 20, cx, cy + 140, 180);
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.07)');
      shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.02)');
      shadowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(cx, cy + 140, 180, 45, 0, 0, Math.PI * 2);
      ctx.fill();

      // Smooth lerp mouse parallax on desktop
      currentPosRef.current.x += (mousePosRef.current.x - currentPosRef.current.x) * 0.06;
      currentPosRef.current.y += (mousePosRef.current.y - currentPosRef.current.y) * 0.06;

      // Studio rotation angles
      const rotX = 0.52 + (currentPosRef.current.y * 0.12) + Math.sin(time * 0.28) * 0.04;
      const rotY = time * 0.38 + (currentPosRef.current.x * 0.16);
      const rotZ = Math.cos(time * 0.22) * 0.05;

      // Draw 3 interconnected silver chrome ribbon loops
      for (let r = 0; r < ribbons; r++) {
        const ribbonPhase = (r * (Math.PI * 2)) / ribbons;
        const points = [];

        for (let i = 0; i <= numPoints; i++) {
          const t = (i / numPoints) * Math.PI * 4;

          // Parametric Torus knot with smooth silver ribbon curvature
          const rBase = 110 + Math.sin(t * 3 + ribbonPhase) * 20;
          const x0 = rBase * (Math.cos(2 * t) + 1.8 * Math.cos(t));
          const y0 = rBase * (Math.sin(2 * t) - 1.8 * Math.sin(t));
          const z0 = 70 * Math.sin(3 * t + ribbonPhase + time * 0.32);

          // 3D rotations
          let x1 = x0 * Math.cos(rotY) + z0 * Math.sin(rotY);
          let y1 = y0;
          let z1 = -x0 * Math.sin(rotY) + z0 * Math.cos(rotY);

          let x2 = x1;
          let y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
          let z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);

          let x3 = x2 * Math.cos(rotZ) - y2 * Math.sin(rotZ);
          let y3 = x2 * Math.sin(rotZ) + y2 * Math.cos(rotZ);
          let z3 = z2;

          // Perspective projection
          const fov = 420;
          const pScale = fov / (fov + z3);
          const screenX = cx + x3 * pScale;
          const screenY = cy + y3 * pScale;

          points.push({ x: screenX, y: screenY, z: z3, scale: pScale });
        }

        // Draw segmented chrome strokes with studio highlights
        for (let i = 0; i < points.length - 1; i++) {
          const pA = points[i];
          const pB = points[i + 1];

          // Depth factor (0 = back, 1 = front)
          const depthNorm = Math.min(1, Math.max(0, (pA.z + 120) / 240));

          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);

          ctx.lineWidth = Math.max(2, 6.5 * pA.scale);

          // Pure chrome metallic gradient (charcoal -> silver -> specular white)
          const grad = ctx.createLinearGradient(pA.x, pA.y, pB.x, pB.y);
          const baseAlpha = 0.5 + depthNorm * 0.5;

          if (depthNorm > 0.65) {
            // Front specular crest highlight
            grad.addColorStop(0, `rgba(40, 40, 40, ${baseAlpha})`);
            grad.addColorStop(0.35, `rgba(185, 185, 190, ${baseAlpha})`);
            grad.addColorStop(0.7, `rgba(250, 250, 255, ${baseAlpha})`);
            grad.addColorStop(1, `rgba(90, 90, 95, ${baseAlpha})`);
          } else {
            // Receded curve
            grad.addColorStop(0, `rgba(70, 70, 75, ${baseAlpha * 0.7})`);
            grad.addColorStop(0.5, `rgba(140, 140, 145, ${baseAlpha * 0.75})`);
            grad.addColorStop(1, `rgba(60, 60, 65, ${baseAlpha * 0.7})`);
          }

          ctx.strokeStyle = grad;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Specular chrome light gleams on the closest crests
        for (let i = 0; i < points.length; i += 22) {
          const p = points[i];
          if (p.z > 25) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.5 * p.scale, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      if (!isReducedMotion) {
        time += 0.011;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mousePosRef.current = { x, y };
    };

    const handleMouseLeave = () => {
      mousePosRef.current = { x: 0, y: 0 };
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[480px] lg:max-w-[540px] mx-auto flex items-center justify-center select-none hero-visual-entrance animate-sculpture-float"
      aria-label="Abstract metallic engineering sculpture visual"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full relative z-10 cursor-default"
      />
    </div>
  );
}
