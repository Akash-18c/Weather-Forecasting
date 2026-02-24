import { memo } from 'react';
import StarField from './StarField';
import MoonGlow from './MoonGlow';

const NightTheme = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-night-gradient">
      {/* Gradient Shift Animation */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent opacity-50"
      />

      {/* Star Field */}
      <StarField />

      {/* Moon Glow */}
      <MoonGlow />

      {/* Dark Cloud Layer 1 */}
      <div
        className="absolute top-32 w-[350px] h-[90px] opacity-5 animate-slow-drift"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)',
          filter: 'blur(30px)',
          left: '-350px',
        }}
      />

      {/* Dark Cloud Layer 2 */}
      <div
        className="absolute top-48 w-[300px] h-[80px] opacity-4"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)',
          filter: 'blur(35px)',
          right: '100vw',
          animation: 'drift-reverse 60s linear infinite 10s',
        }}
      />

      {/* Atmospheric Fog */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(100,150,200,0.3) 0%, transparent 60%)',
        }}
      />

      {/* Vignette Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,26,47,0.4) 100%)',
        }}
      />

      {/* Subtle Grain Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
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

export default memo(NightTheme);
