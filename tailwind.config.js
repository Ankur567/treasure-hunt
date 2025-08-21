export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0b0f19',
        panel: '#0f172a',
        panel2: '#111827',
        ink: '#e5e7eb',
        mute: '#94a3b8',
        brand: {
          1: '#ff7a18',
          2: '#f97316',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.35)'
      },
      borderRadius: {
        xl2: '1rem'
      },
      keyframes: {
        confetti: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '1' }
        }
      },
      animation: {
        confetti: 'confetti var(--d,3s) linear forwards'
      }
    },
  },
  plugins: [],
}