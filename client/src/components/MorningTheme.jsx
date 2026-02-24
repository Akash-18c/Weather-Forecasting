import { memo } from 'react';

const MorningTheme = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-morning-gradient">
      {/* Sun Glow */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full animate-sun-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(255, 223, 100, 0.35) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Atmospheric Haze */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
        }}
      />

      {/* Cloud Layer 1 */}
      <div
        className="absolute top-20 w-[300px] h-[80px] opacity-10 animate-slow-drift"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 70%)',
          filter: 'blur(20px)',
          left: '-300px',
        }}
      />

      {/* Cloud Layer 2 */}
      <div
        className="absolute top-40 w-[250px] h-[70px] opacity-8"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.5) 0%, transparent 70%)',
          filter: 'blur(25px)',
          left: '-250px',
          animation: 'drift 60s linear infinite 10s',
        }}
      />

      {/* Cloud Layer 3 */}
      <div
        className="absolute top-32 w-[280px] h-[75px] opacity-12"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.7) 0%, transparent 70%)',
          filter: 'blur(18px)',
          right: '100vw',
          animation: 'drift-reverse 50s linear infinite 5s',
        }}
      />

      {/* Subtle Grain Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default memo(MorningTheme);
