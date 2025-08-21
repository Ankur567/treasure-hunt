import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Progress from './components/Progress.jsx'
import Step from './components/Step.jsx'
import HintDialog from './components/HintDialog.jsx'
import Confetti from './components/Confetti.jsx'
import { steps, finale } from './gameData.js'
import { loadState, saveState, clearState } from './utils/storage.js'

const STORAGE_KEY = 'naruto-hunt-v1'

export default function App() {
  const [state, setState] = useState(() => loadState(STORAGE_KEY, {
    current: 0,
    hintsLeft: 3,
    startedAt: Date.now(),
    usedHints: [],
    solved: Array(steps.length).fill(false),
    playerName: ''
  }))

  const [hintOpen, setHintOpen] = useState(false)
  const [hintFor, setHintFor] = useState(0)

  const percent = useMemo(() => Math.round((state.current / steps.length) * 100), [state.current])
  const done = state.current >= steps.length

  useEffect(() => { saveState(STORAGE_KEY, state) }, [state])

  const onSolve = (idx) => {
    if (idx !== state.current) return
    setState(s => {
      const solved = [...s.solved]
      solved[idx] = true
      const next = Math.min(s.current + 1, steps.length)
      return { ...s, solved, current: next }
    })
  }

  const requestHint = (idx) => {
    if (state.usedHints.includes(idx)) { setHintFor(idx); setHintOpen(true); return }
    if (state.hintsLeft <= 0) return
    setState(s => ({ ...s, hintsLeft: s.hintsLeft - 1, usedHints: [...s.usedHints, idx] }))
    setHintFor(idx)
    setHintOpen(true)
  }

  const reset = () => {
    clearState(STORAGE_KEY)
    setState({ current: 0, hintsLeft: 3, startedAt: Date.now(), usedHints: [], solved: Array(steps.length).fill(false), playerName: '' })
  }

  return (
    <div className="min-h-screen gradient-bg">
      {done && <Confetti pieces={200} />}

      <div className="max-w-5xl mx-auto px-4 py-6">
        <Header playerName={state.playerName} setPlayerName={(n) => setState(s => ({ ...s, playerName: n }))} onReset={reset} />

        <div className="glass p-5 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="title">Ninja Missions → Wizard Portal</h1>
              <p className="subtitle">A 7‑step birthday treasure hunt starring Naruto figurines, ending in a Harry Potter surprise.</p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-full border border-white/10 bg-white/5">
              <span>🧠 Hints left:</span>
              <span className="font-bold">{state.hintsLeft}</span>
            </div>
          </div>

          <div className="mt-4">
            <Progress total={steps.length} current={state.current} />
            <p className="text-mute text-sm mt-2">Progress: {percent}% {done ? '(Complete!)' : `— Step ${state.current + 1} of ${steps.length}`}</p>
          </div>
        </div>

        {!done ? (
          <Step
            key={state.current}
            index={state.current}
            data={steps[state.current]}
            onSolve={() => onSolve(state.current)}
            onHint={() => requestHint(state.current)}
            hintsLeft={state.hintsLeft}
            usedHint={state.usedHints.includes(state.current)}
          />
        ) : (
          <div className="glass p-6 mt-4">
            <h2 className="text-2xl font-bold">🎉 Mission Complete{state.playerName ? `, ${state.playerName}` : ''}!</h2>
            <p className="mt-2 text-mute">You opened the portal from Konoha to Hogwarts. Your final magic awaits at the <strong>{finale.locationLabel}</strong> — enjoy your Harry Potter Funko! ✨</p>
            <div className="mt-4 flex gap-2">
              <button onClick={reset} className="px-4 py-2 rounded-xl bg-brand-1 hover:brightness-110 font-semibold">Play again</button>
              <a href="#" onClick={(e)=>{e.preventDefault(); window.print();}} className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10">Print certificate</a>
            </div>
          </div>
        )}

        <Footer className="mt-8" />
      </div>

      <HintDialog open={hintOpen} onClose={()=>setHintOpen(false)} step={steps[hintFor]} used={state.usedHints.includes(hintFor)} />
    </div>
  )
}
