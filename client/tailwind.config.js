/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'morning-gradient': 'linear-gradient(to bottom, #1E90FF, #4FB3FF, #BFE9FF)',
        'night-gradient': 'linear-gradient(to bottom, #0A1A2F 0%, #0F2A4A 40%, #1B3B6F 100%)',
      },
      animation: {
        'gradient': 'gradient 30s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'rain': 'rain 1s linear infinite',
        'snow': 'snow 10s linear infinite',
        'cloud': 'cloud 60s linear infinite',
        'star-twinkle': 'star-twinkle 3s ease-in-out infinite',
        'shimmer': 'shimmer 8s linear infinite',
        'breath': 'breath 6s ease-in-out infinite',
        'slow-float': 'slow-float 30s ease-in-out infinite',
        'light-sweep': 'light-sweep 8s linear infinite',
        'sun-pulse': 'sun-pulse 6s ease-in-out infinite',
        'twinkle': 'twinkle 6s ease-in-out infinite',
        'slow-drift': 'drift 40s linear infinite',
        'moon-glow': 'moon-glow 8s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 35s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(30px)' },
        },
        rain: {
          '0%': { transform: 'translateY(-100vh) translateX(0)' },
          '100%': { transform: 'translateY(100vh) translateX(10px)' },
        },
        snow: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)' },
        },
        cloud: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        'star-twinkle': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        breath: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
        'slow-float': {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(100px) translateY(-20px)' },
        },
        'light-sweep': {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
        'sun-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.25' },
          '50%': { transform: 'scale(1.1)', opacity: '0.35' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'drift': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        'drift': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(100vw + 350px))' },
        },
        'drift-reverse': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100vw - 300px))' },
        },
        'moon-glow': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.05)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '0% 100%' },
        },
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
    },
  },
  plugins: [],
}
