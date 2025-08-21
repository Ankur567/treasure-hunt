import React from 'react'

export default function Progress({ total, current }) {
  const pct = Math.min(100, Math.round((current / total) * 100))
  return (
    <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-green-500 to-lime-400" style={{ width: `${pct}%` }} />
    </div>
  )
}