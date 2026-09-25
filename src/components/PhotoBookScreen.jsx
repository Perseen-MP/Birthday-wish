'use client';

import { useState, useEffect, useRef } from 'react';

const memories = [
  {
    src: '/her1.jpg',
    tag: 'Chapter 01',
    caption: 'Your first smile on my mobile 💕',
    note: 'This is the first pic I secretly stole from the Spectra album 😅❤️… and probably the first smile of yours that made my heart fall for you a little more 🤭🥹❤️'
  },
  {
    src: '/her2.jpg',
    tag: 'Chapter 02',
    caption: 'That little smile of yours has my heart every single time 🫣💞',
    note: 'That little smile of yours has my heart every single time 🫣🎀 There’s something so effortlessly beautiful about it—it can brighten my mood, calm my heart, and make me fall for you all over again. Maybe you don’t even realize how special that smile is to me 🤭💞'
  },
  {
    src: '/her3.jpg',
    tag: 'Chapter 03',
    caption: 'That tiny smile of yours is dangerously beautiful 😮‍💨🎀',
    note: 'That tiny smile of yours is dangerously beautiful 😮‍💨🎀I swear, there’s something about it that instantly catches my attention. It’s so cute, effortless, and warm that I could honestly look at it a hundred times and still fall for it all over again🫠💞'
  },
  {
    src: '/her4.jpg',
    tag: 'Chapter 04',
    caption: 'The first photo you sent me… still one of my favourite memories of you 😌🤌🎀',
    note: 'It may have been just a simple picture for you, but for me, it became something I wanted to keep close. There was just something about seeing you like that for the first time—it felt so special and made me smile without even realizing it. 🥹❤️ Even now, whenever I look at it, I remember that little moment and how happy I felt. Maybe that’s why your first photo will always have a special place in my heart. 🤍✨'
  },
  {
    src: '/her5.jpg',
    tag: 'Chapter 05',
    caption: 'You were just laughing casually, but that smile made me fall for you instantly 😩💗 ',
    note: 'You were just being yourself, laughing so casually… but somehow, I completely fell for that smile 😩💗 There was nothing special about the moment, yet your smile made it one of my favourite pictures of you 🤭🎀'
  },
  {
    src: '/her6.jpg',
    tag: 'Chapter 06',
    caption: 'I begged you for a selfie 😹 and you sent me this one… remember? 😂❤️',
    note: 'I literally begged you for a selfie 😹, and you finally sent me this one 😂❤️. I still remember how happy I was when you sent it. It was such a small moment, but somehow it became one of those cute little memories I still smile about. 🤭🎀'
  },
  {
    src: '/her7.jpg',
    tag: 'Chapter 07',
    caption: 'On an unexpected evening… a little moment I never knew I’d cherish this much 🫠🎀',
    note: 'It was just an unexpected evening, nothing planned or extraordinary, but somehow being with you made it feel so special. 🥹❤️ A simple moment turned into a beautiful memory that I’ll always carry with me. Sometimes, the moments we never expect become the ones we remember the most. 🤍✨'
  },
  {
    src: '/her8.jpg',
    tag: 'Chapter 08',
    caption: 'I could get lost in the way you look when you’re simply being yourself… there’s a kind of beauty in you that my heart can’t ignore 🫠🎀',
    note: 'There’s something so beautiful about seeing you completely lost in your own little moment 🫠❤️ The way you laugh, the way you look so carefree, and that happiness on your face… it makes me wish I could pause that moment forever✨'
  },
  {
    src: '/her9.jpg',
    tag: 'Chapter 09',
    caption: 'That half-face, those pretty eyes, and those little earrings… 😩💗 Everything about this picture is just beautiful 🤌🎀',
    note: 'That half-face, those pretty eyes, and those little earrings… 😩💗 Everything about this picture is just beautiful 🤌🎀 Honestly, I could keep looking at this picture and still fall for you a little more every time 🤭💗'
  },
  {
    src: '/her10.jpg',
    tag: 'Chapter 10',
    caption: 'My favourite pic of you… that smile literally kills me. 😩💗🤌',
    note: 'And lastly… this is my favourite picture of you. 🥹💗 That smile of yours literally kills me every single time. 😩🤌 There’s just something about the way you smile that makes this picture so special to me. I could look at it a hundred times and still fall for that smile all over again. 🫠🎀❤️'
  },
  {
    src: '/together1.jpg',
    tag: 'Forever',
    caption: 'Our first selfie… 🤭💗',
    note: 'Our first selfie… 🥹💗 Just one simple picture, but it became such a special memory for me. I’ll always smile whenever I look back at this moment. 🤌🎀❤️'
  },
  {
    src: '/together2.jpg',
    tag: 'Forever',
    caption: 'Last but not least… my favourite little memory with you 🫣💞',
    note: 'Last but not least… 🤌💗 This little moment with you feels so special to me. Out of all the memories we’ve made, this is one I’ll always look back at with a smile 🤭💞'
  }
];

export default function PhotoBookScreen({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Drag / Touch Tracking
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);

  const current = memories[index];

  const handleNext = () => {
    if (index === memories.length - 1) {
      if (onComplete) onComplete();
    } else {
      setIsFlipped(false);
      setIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  // Keyboard Navigation: ArrowLeft / ArrowRight / Space
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        setIsFlipped((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Gesture Handlers (Swipe & Drag)
  const onTouchStart = (e) => {
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    touchEndX.current = touchStartX.current;
    isDragging.current = true;
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    touchEndX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const onTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const swipeDistance = touchStartX.current - touchEndX.current;

    // Threshold of 45px to distinguish a swipe from an intentional tap
    if (swipeDistance > 45) {
      handleNext();
    } else if (swipeDistance < -45) {
      handlePrev();
    } else {
      // Tap without drag triggers the card flip
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <div style={{
      zIndex: 10,
      width: '92%',
      maxWidth: '380px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '14px'
    }}>
      {/* 3D Flip Container with Swipe and Drag Handlers */}
      <div
        className="book-perspective"
        style={{
          width: '100%',
          height: '470px',
          position: 'relative',
          cursor: 'grab',
          touchAction: 'pan-y'
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onTouchStart}
        onMouseMove={onTouchMove}
        onMouseUp={onTouchEnd}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.75s cubic-bezier(0.4, 0.2, 0.2, 1)',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front Face (Photo & Caption) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              backgroundColor: '#ffffff',
              borderRadius: '22px',
              padding: '16px',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.4)',
              border: '2px solid #fbcfe8',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              height: '330px',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#fce7f3'
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.src}
                alt={current.caption}
                draggable={false}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#be185d',
                padding: '4px 12px',
                borderRadius: '50px',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.5px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}>
                {current.tag}
              </span>
            </div>

            <div style={{ textAlign: 'center', marginTop: '14px' }}>
              <h3 style={{ margin: '0 0 4px', fontSize: '15px', color: '#1f2937' }}>
                {current.caption}
              </h3>
              <p style={{ margin: 0, fontSize: '11.5px', color: '#be185d', fontWeight: '600' }}>
                (Tap to read note 💌 • Swipe or use arrow keys)
              </p>
            </div>
          </div>

          {/* Back Face (Secret Message Revealed Upon Rotation) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              backgroundColor: '#fffdf5',
              borderRadius: '22px',
              padding: '24px 20px',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.4)',
              border: '2px solid #fbcfe8',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              overflowY: 'auto'
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>💌</div>
            <span style={{
              fontSize: '11px',
              color: '#be185d',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '8px'
            }}>
              Secret Note
            </span>
            <p className="handwritten" style={{
              fontSize: '20px',
              lineHeight: '1.45',
              color: '#3b2820',
              margin: '0 0 14px'
            }}>
              "{current.note}"
            </p>
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>
              (Tap to flip back)
            </span>
          </div>
        </div>
      </div>

      {/* Minimal Progress Dots / Indicators */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        marginTop: '6px'
      }}>
        {memories.map((_, i) => (
          <span
            key={i}
            style={{
              width: i === index ? '18px' : '6px',
              height: '6px',
              borderRadius: '50px',
              backgroundColor: i === index ? '#ff7597' : 'rgba(255, 255, 255, 0.25)',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
}