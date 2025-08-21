import React from 'react'

export default function HintDialog({ open, onClose, step, used }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg glass p-6">
        <h4 className="text-xl font-bold">Hint</h4>
        <p className="mt-2 text-ink/90">{step.hint}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-brand-1 hover:brightness-110 font-semibold">Got it</button>
          <span className="text-mute text-xs self-center">{used ? 'Hint already used for this step' : 'Hint token spent'}</span>
        </div>
      </div>
    </div>
  )
}