import React from 'react'

export default function Header({ playerName, setPlayerName, onReset }) {
  return (
    <header className="glass p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥷</span>
            <h2 className="text-xl font-bold">Birthday Treasure Hunt</h2>
          </div>
          <p className="text-mute text-sm">Naruto figurines → Harry Potter finale</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            value={playerName}
            onChange={(e)=>setPlayerName(e.target.value)}
            placeholder="Player name (optional)"
            className="w-full sm:w-64 px-3 py-2 rounded-xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-brand-2"
          />
          <button onClick={onReset} className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20">Reset</button>
        </div>
      </div>
    </header>
  )
}