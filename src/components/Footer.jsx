import React from 'react'

export default function Footer({ className = '' }) {
  return (
    <footer className={`text-center text-mute text-sm ${className}`}>
      <div className="glass px-4 py-3 inline-block">
        <span>Made with 🧡 for a birthday hunt. Keep clues safe & avoid outdoor hazards.</span>
      </div>
    </footer>
  )
}