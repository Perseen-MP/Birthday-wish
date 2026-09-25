'use client';

export default function Music({ audioRef, isPlaying, setIsPlaying }) {
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      <div
        onClick={togglePlay}
        className="glass-card"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          borderRadius: '50px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <div
            className={isPlaying ? 'spinning' : ''}
            style={{
              width: '14px',
              height: '14px',
              border: '2px dashed #f472b6',
              borderRadius: '50%'
            }}
          />
          <div style={{ width: '8px', height: '1.5px', background: '#f472b6' }} />
          <div
            className={isPlaying ? 'spinning' : ''}
            style={{
              width: '14px',
              height: '14px',
              border: '2px dashed #f472b6',
              borderRadius: '50%'
            }}
          />
        </div>
        <span style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fce7f3', fontWeight: 500 }}>
          {isPlaying ? 'Our Song ♪' : 'Play Music'}
        </span>
      </div>
    </>
  );
}