'use client';

import { useState, useRef } from 'react';
import PasswordScreen from '../components/PasswordScreen';
import IntroScreen from '../components/IntroScreen';
import ApologySlide from '../components/ApologySlide';
import PhotoBookScreen from '../components/PhotoBookScreen';
import GreetingCard from '../components/GreetingCard';
import Background from '../components/Background';
import Music from '../components/Music';

export default function Home() {
  // Steps: 'password' -> 'intro' -> 'apology' -> 'book' -> 'greeting'
  const [currentStep, setCurrentStep] = useState('password'); 
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const startMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => console.log('Autoplay blocked:', err));
    }
  };

  return (
    <main style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1a162b',
      fontFamily: 'sans-serif',
      overflow: 'hidden'
    }}>
      <Background />
      <Music audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

      {currentStep === 'password' && (
        <PasswordScreen 
          onSuccess={() => {
            startMusic();
            setCurrentStep('intro');
          }} 
        />
      )}

      {currentStep === 'intro' && (
        <IntroScreen onContinue={() => setCurrentStep('apology')} />
      )}

      {currentStep === 'apology' && (
        <ApologySlide onProceed={() => setCurrentStep('book')} />
      )}

      {currentStep === 'book' && (
        <PhotoBookScreen onComplete={() => setCurrentStep('greeting')} />
      )}

      {currentStep === 'greeting' && (
        <GreetingCard onReplay={() => setCurrentStep('book')} />
      )}
    </main>
  );
}