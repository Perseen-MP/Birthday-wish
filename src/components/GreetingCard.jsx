'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function GreetingCard({ onReplay }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  const fullLetter = `My Dearest,

Happy Birthday to the one who makes my entire world softer, brighter, and infinitely more beautiful. 🎂✨

From that first photo I secretly saved to every unexpected smile and silly selfie we have shared, every single moment with you has quietly become my favorite memory. You bring a gentle peace to my heart that I never knew I was missing.

Thank you for your warmth, your effortless laughter, and for simply being the wonderful soul that you are. On your special day, I hope you truly feel how deeply cherished and adored you are.

May all your quiet wishes come true this year. Happy Birthday, my dear💖`;

  // Celebration Confetti
  useEffect(() => {
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#ff7597', '#f472b6', '#fde047', '#ffffff'];

    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.7 },
        colors: colors
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Smooth Typewriter
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(fullLetter.slice(0, i));
      i++;
      if (i > fullLetter.length) {
        clearInterval(timer);
        setIsTypingDone(true);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [fullLetter]);

  return (
    <div
      style={{
        zIndex: 10,
        width: '92%',
        maxWidth: '430px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        perspective: '1000px',
        padding: '10px 0'
      }}
    >
      {/* Hide Scrollbar Style Rule */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Parchment Letter */}
      <div
        className="no-scrollbar"
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#fffcf5',
          backgroundImage: 'radial-gradient(#f3e8d2 1px, transparent 1px)',
          backgroundSize: '16px 16px',
          borderRadius: '18px',
          padding: '36px 26px 28px',
          boxShadow:
            '0 24px 60px rgba(0, 0, 0, 0.65), 0 2px 8px rgba(0,0,0,0.1), inset 0 0 40px rgba(224, 203, 169, 0.4)',
          border: '1.5px solid #e7d8c3',
          boxSizing: 'border-box',
          overflowY: 'auto',
          maxHeight: '78vh'
        }}
      >
        {/* Vintage Stamp */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '52px',
            height: '62px',
            border: '2px dashed #d4bda1',
            borderRadius: '4px',
            padding: '4px',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            transform: 'rotate(4deg)'
          }}
        >
          <span style={{ fontSize: '20px' }}>🌸</span>
          <span
            style={{
              fontSize: '8px',
              fontWeight: '800',
              color: '#9c7c58',
              letterSpacing: '0.5px',
              marginTop: '2px'
            }}
          >
            AIRMAIL
          </span>
        </div>

        {/* Delivery Header Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontSize: '24px' }}>💌</span>
          <span
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#a1785c',
              fontWeight: '700'
            }}
          >
            A Special Delivery
          </span>
        </div>

        {/* Handwritten Letter Content */}
        <div
          className="handwritten"
          style={{
            fontSize: '22px',
            lineHeight: '1.6',
            color: '#2d221e',
            whiteSpace: 'pre-line',
            minHeight: '260px'
          }}
        >
          {displayedText}
          {!isTypingDone && (
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '20px',
                backgroundColor: '#e11d48',
                marginLeft: '4px',
                verticalAlign: 'bottom',
                animation: 'spin 0.8s infinite'
              }}
            />
          )}
        </div>

        {/* Signature Line */}
        {isTypingDone && (
          <div
            style={{
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: '1px dashed #e2d2be',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end'
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: '11px',
                  color: '#9c8270',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                With All My Heart,
              </p>
              <p
                className="handwritten"
                style={{
                  margin: '2px 0 0',
                  fontSize: '26px',
                  color: '#be185d',
                  fontWeight: '700'
                }}
              >
                Perseen 💖
              </p>
            </div>
            <span style={{ fontSize: '32px', transform: 'rotate(-10deg)' }}>🎂✨</span>
          </div>
        )}
      </div>

      {/* Replay Button */}
      {isTypingDone && (
        <button
          onClick={onReplay}
          style={{
            marginTop: '16px',
            backgroundColor: 'rgba(255, 117, 151, 0.2)',
            border: '1px solid #ff7597',
            color: '#ffccd5',
            borderRadius: '50px',
            padding: '10px 24px',
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '0.5px',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            transition: 'all 0.2s'
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          ↻ Relive our story from Chapter 1
        </button>
      )}
    </div>
  );
}