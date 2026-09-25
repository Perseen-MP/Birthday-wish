'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function ApologySlide({ onProceed }) {
  const [forgiven, setForgiven] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const dodgeMessages = [
    '💔 Not Yet',
    'I’ll wait… because you’re worth waiting for. 🥺',
    'Please? 🥺👉👈',
    'Think of all our good times 🌸',
    'You really cannot click this button 🙈',
    'I am not letting you stay mad! 💕'
  ];

  const handleForgive = () => {
    setForgiven(true);
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#ff7597', '#ffb3c6', '#ffffff']
    });
  };

  const handleDodging = () => {
    setNoCount((prev) => prev + 1);
    const randomX = (Math.random() - 0.5) * 160;
    const randomY = (Math.random() - 0.5) * 120;
    setNoPos({ x: randomX, y: randomY });
  };

  return (
    <div style={{
      zIndex: 10,
      width: '92%',
      maxWidth: '390px',
      background: 'rgba(32, 25, 48, 0.96)',
      backdropFilter: 'blur(12px)',
      border: '2px solid #ff7597',
      borderRadius: '24px',
      padding: '28px 22px',
      textAlign: 'center',
      boxShadow: '0 20px 45px rgba(0,0,0,0.5)',
      color: '#fff',
      animation: 'float 5s ease-in-out infinite'
    }}>
      {!forgiven ? (
        <>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>💔</div>
          <h2 style={{
            fontSize: '20px',
            color: '#ffb3c6',
            margin: '0 0 14px',
            fontWeight: '700'
          }}>
            Before you go… I have something to say.
          </h2>

          <div style={{
            fontSize: '13.5px',
            lineHeight: '1.65',
            color: '#e2d9eb',
            textAlign: 'left',
            background: 'rgba(255,255,255,0.06)',
            padding: '16px',
            borderRadius: '14px',
            marginBottom: '22px'
          }}>
            <p style={{ margin: '0 0 8px' }}>I know I’ve made mistakes.</p>
            <p style={{ margin: '0 0 8px' }}>
              I know there were moments when I hurt you, disappointed you, or made you feel like you didn’t matter.
            </p>
            <p style={{ margin: '0 0 8px' }}>
              I'm genuinely sorry for every moment I made you feel that way. 🥺
            </p>
            <p style={{ margin: '0 0 8px' }}>
              I don't want one mistake to erase all the beautiful memories we've made together. You mean far too much to me for that.
            </p>
            <p style={{ margin: 0, fontWeight: '700', color: '#ff7597', textAlign: 'center' }}>
              So, from the bottom of my heart… forgive me? 🫂❤️
            </p>
          </div>

          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80px',
            gap: '12px'
          }}>
            <button
              onClick={handleForgive}
              style={{
                backgroundColor: '#ec4899',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '50px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: `${14 + Math.min(noCount * 1.5, 8)}px`,
                boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)',
                transition: 'all 0.2s ease',
                zIndex: 2
              }}
            >
              🥺 Forgive Me
            </button>

            <button
              onMouseEnter={handleDodging}
              onTouchStart={handleDodging}
              onClick={handleDodging}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#ffccd5',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '10px 16px',
                borderRadius: '50px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '12px',
                position: noCount > 0 ? 'absolute' : 'relative',
                transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                transition: 'transform 0.25s ease-out',
                zIndex: 1,
                maxWidth: '220px'
              }}
            >
              {dodgeMessages[Math.min(noCount, dodgeMessages.length - 1)]}
            </button>
          </div>
        </>
      ) : (
        <div style={{ padding: '16px 8px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🥹❤️</div>
          <h2 className="handwritten" style={{
            fontSize: '32px',
            color: '#ff7597',
            margin: '0 0 10px',
            lineHeight: '1.2'
          }}>
            I knew you would… 
          </h2>
          <p className="handwritten" style={{
            fontSize: '24px',
            color: '#fce7f3',
            margin: '0 0 24px'
          }}>
            Thank you for forgiving me 🫶
          </p>

          <button
            onClick={onProceed}
            style={{
              backgroundColor: '#ec4899',
              color: 'white',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '50px',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(236, 72, 153, 0.5)'
            }}
          >
            A Little Collections of You 🫶✨
          </button>
        </div>
      )}
    </div>
  );
}