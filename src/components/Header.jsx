import React from "react";

export default function Header({ playerName, onReset }) {
  return (
    <header className="glass p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥷</span>
            <h2 className="text-xl font-bold">Birthday Treasure Hunt</h2>
          </div>
          <p className="text-mute text-sm">
            For our shinobi:{" "}
            <span className="font-bold text-orange-300">{playerName}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onReset}
            className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20"
          >
            Reset Game
          </button>
        </div>
      </div>
    </header>
  );
}
