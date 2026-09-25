'use client';

import { useEffect, useRef, useState } from 'react';

export default function Background() {
  const [trail, setTrail] = useState([]);
  const canvasRef = useRef(null);
  const heartsParticles = useRef([]);
  const animationFrameId = useRef(null);

  const heartTypes = ['💖', '💕', '💓', '💗', '❤️', '💞'];

  // 1. Moving Cursor Trail
  useEffect(() => {
    const handlePointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
      if (!clientX || !clientY) return;

      const id = Math.random();
      const glyph = heartTypes[Math.floor(Math.random() * heartTypes.length)];
      const size = Math.floor(Math.random() * 8) + 14;

      setTrail((prev) => [
        ...prev.slice(-15),
        { id, x: clientX, y: clientY, glyph, size }
      ]);

      setTimeout(() => {
        setTrail((prev) => prev.filter((p) => p.id !== id));
      }, 600);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  // 2. Exploding Heart Burst on Any Click/Tap
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const spawnHearts = (x, y) => {
      const count = 22;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 7 + 3;
        heartsParticles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2.5,
          size: Math.random() * 16 + 18,
          glyph: heartTypes[Math.floor(Math.random() * heartTypes.length)],
          alpha: 1,
          rot: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 8,
          decay: Math.random() * 0.02 + 0.018
        });
      }
    };

    const handleGlobalClick = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
      if (clientX != null && clientY != null) {
        spawnHearts(clientX, clientY);
      }
    };

    window.addEventListener('pointerdown', handleGlobalClick);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = heartsParticles.current.length - 1; i >= 0; i--) {
        const p = heartsParticles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.vx *= 0.96;
        p.rot += p.rotSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          heartsParticles.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.glyph, 0, 0);
        ctx.restore();
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointerdown', handleGlobalClick);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <>
      {/* Background Doodle Wallpaper */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.18,
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><path d='M25,25 Q35,10 45,25 Q55,40 25,60 Q-5,40 5,25 Q15,10 25,25 Z' fill='none' stroke='%23ff7597' stroke-width='2' stroke-linecap='round'/><path d='M120,40 L125,55 L140,58 L128,68 L132,82 L118,74 L106,82 L110,68 L98,58 L114,55 Z' fill='none' stroke='%23f472b6' stroke-width='1.8' stroke-linejoin='round'/><circle cx='135' cy='130' r='5' fill='%23ff7597'/><circle cx='80' cy='30' r='3' fill='%23f472b6'/></svg>")`,
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Floating Stickers */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
        <div className="floating" style={{ position: 'absolute', top: '40px', left: '30px', opacity: 0.35 }}>
          <span style={{ fontSize: '42px' }}>🐱</span>
        </div>
        <div className="floating" style={{ position: 'absolute', bottom: '60px', right: '30px', opacity: 0.35, animationDelay: '-2s' }}>
          <span style={{ fontSize: '40px' }}>🌸</span>
        </div>
      </div>

      {/* Watermark: Bottom Right Corner */}
      <div
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '20px',
          zIndex: 5,
          pointerEvents: 'none',
          userSelect: 'none',
          fontSize: '12px',
          letterSpacing: '1px',
          color: 'rgba(255, 182, 198, 0.45)',
          fontFamily: "'Caveat', cursive",
          fontSize: '17px'
        }}
      >
        Perseen's creation ✨
      </div>

      {/* Heart Cursor Trail */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99998, overflow: 'hidden' }}>
        {trail.map((point) => (
          <span
            key={point.id}
            style={{
              position: 'absolute',
              left: point.x - 10,
              top: point.y - 10,
              fontSize: `${point.size}px`,
              opacity: 0.85,
              transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
              transform: 'scale(0.3) translateY(-20px)'
            }}
          >
            {point.glyph}
          </span>
        ))}
      </div>

      {/* Pop Canvas */}
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99999 }} />
    </>
  );
}