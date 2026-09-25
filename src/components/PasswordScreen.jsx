'use client';

import { useState, useEffect } from 'react';

export default function PasswordScreen({ onSuccess }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const TARGET_CODE = 'meow';
  const MAX_FREE_ATTEMPTS = 3;

  // Escalating penalty ladder after the 3 free attempts are used up:
  // 1st lockout: 30s | 2nd lockout: 2m | 3rd lockout: 15m | 4th+ lockout: 1 hour
  const PENALTY_LADDER = [30, 120, 900, 3600];

  useEffect(() => {
    if (lockoutTimer <= 0) return;

    const interval = setInterval(() => {
      setLockoutTimer((prev) => {
        if (prev <= 1) {
          setError(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutTimer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;

    if (code.trim().toLowerCase() === TARGET_CODE.toLowerCase()) {
      onSuccess();
    } else {
      const newFailedCount = failedAttempts + 1;
      setFailedAttempts(newFailedCount);
      setError(true);

      // Check if free attempts are exhausted
      if (newFailedCount >= MAX_FREE_ATTEMPTS) {
        const penaltyIndex = Math.min(
          newFailedCount - MAX_FREE_ATTEMPTS,
          PENALTY_LADDER.length - 1
        );
        setLockoutTimer(PENALTY_LADDER[penaltyIndex]);
      }
    }
  };

  const formatTime = (totalSec) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;

    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const isLocked = lockoutTimer > 0;
  const attemptsRemaining = Math.max(0, MAX_FREE_ATTEMPTS - failedAttempts);

  return (
    <div style={{
      zIndex: 10,
      background: 'rgba(30, 24, 46, 0.95)',
      backdropFilter: 'blur(10px)',
      border: `2px solid ${error ? '#ef4444' : '#ff7597'}`,
      padding: '34px 26px',
      borderRadius: '24px',
      textAlign: 'center',
      width: '90%',
      maxWidth: '330px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ fontSize: '38px', marginBottom: '4px' }}>
        {isLocked ? '⏳' : '🔒'}
      </div>

      <h2 style={{ 
        color: '#ff7597', 
        margin: '0 0 6px', 
        fontSize: '18px', 
        letterSpacing: '1px',
        fontWeight: '700'
      }}>
        PROTECTED BY PERSEEN
      </h2>

      <p style={{ color: '#a79ab2', fontSize: '12px', margin: '0 0 20px' }}>
        Enter the secret code
      </p>

      {/* Attempt counter badges */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '18px' }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              fontSize: '16px',
              opacity: i < attemptsRemaining ? 1 : 0.25,
              transition: 'opacity 0.3s'
            }}
          >
            💖
          </span>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <input
          type="text"
          placeholder={isLocked ? 'Security Lockout...' : 'Type code here...'}
          value={code}
          disabled={isLocked}
          onChange={(e) => {
            setCode(e.target.value);
            if (error && !isLocked) setError(false);
          }}
          autoFocus
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '14px',
            border: `1.5px solid ${error ? '#ef4444' : '#4a3b63'}`,
            background: isLocked ? '#191325' : '#231b34',
            color: isLocked ? '#716382' : '#ffffff',
            fontSize: '16px',
            textAlign: 'center',
            outline: 'none',
            letterSpacing: '1px',
            boxSizing: 'border-box',
            cursor: isLocked ? 'not-allowed' : 'text',
            transition: 'all 0.2s'
          }}
        />

        {error && !isLocked && (
          <span style={{ color: '#ef4444', fontSize: '12.5px', lineHeight: '1.4' }}>
            Incorrect code! ({attemptsRemaining} attempt{attemptsRemaining === 1 ? '' : 's'} remaining) 🥺
          </span>
        )}

        {isLocked && (
          <span style={{ color: '#ef4444', fontSize: '12.5px', lineHeight: '1.4' }}>
            No attempts left! Try again in <strong>{formatTime(lockoutTimer)}</strong> ⏳
          </span>
        )}

        <button
          type="submit"
          disabled={isLocked}
          style={{
            width: '100%',
            padding: '13px',
            borderRadius: '14px',
            border: 'none',
            background: isLocked ? '#473656' : '#ff7597',
            color: isLocked ? '#9588a8' : '#ffffff',
            fontSize: '15px',
            fontWeight: 'bold',
            cursor: isLocked ? 'not-allowed' : 'pointer',
            boxShadow: isLocked ? 'none' : '0 4px 15px rgba(255, 117, 151, 0.4)',
            transition: 'all 0.2s'
          }}
          onMouseDown={(e) => {
            if (!isLocked) e.currentTarget.style.transform = 'scale(0.98)';
          }}
          onMouseUp={(e) => {
            if (!isLocked) e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isLocked ? `Locked (${formatTime(lockoutTimer)})` : 'Unlock 🐾'}
        </button>
      </form>
    </div>
  );
}