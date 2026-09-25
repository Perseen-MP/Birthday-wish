'use client';

import { useState } from 'react';

export default function IntroScreen({ onContinue }) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => {
      onContinue();
    }, 1200);
  };

  return (
    <div style={{
      zIndex: 10,
      width: '90%',
      maxWidth: '380px',
      position: 'relative',
      textAlign: 'center'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '240px',
        background: '#fff2f5',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        border: '3px solid #ffb3c6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        transform: opened ? 'scale(0.9) translateY(40px)' : 'none',
        opacity: opened ? 0 : 1,
        transition: 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <h3 className="handwritten" style={{ fontSize: '28px', color: '#be185d', margin: '0 0 6px' }}>
          For Someone Very Special
        </h3>
        <p style={{ fontSize: '13px', color: '#705e68', margin: '0 0 20px' }}>
          A collection of moments that mean everything.
        </p>

        <button
          onClick={handleOpen}
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #e11d48 0%, #9f1239 100%)',
            border: '3px solid #fecdd3',
            color: '#fff',
            fontSize: '26px',
            cursor: 'pointer',
            boxShadow: '0 8px 18px rgba(159, 18, 57, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          💌
        </button>
        <span style={{ fontSize: '11px', color: '#9d8591', marginTop: '10px' }}>Tap seal to unwrap</span>
      </div>
    </div>
  );
}