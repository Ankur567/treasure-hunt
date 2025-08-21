import React, { useEffect, useMemo, useState } from 'react'

export default function Confetti({ pieces = 150 }) {
  const [items, setItems] = useState([])
  useEffect(() => {
    const arr = Array.from({ length: pieces }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      dur: 3 + Math.random() * 2,
      hue: Math.floor(200 + Math.random() * 160),
      rot: Math.random() * 360,
      sizeW: 6 + Math.random() * 6,
      sizeH: 10 + Math.random() * 10,
    }))
    setItems(arr)
  }, [pieces])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {items.map(item => (
        <i
          key={item.id}
          className="absolute top-[-10vh] animate-confetti"
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            ['--d']: `${item.dur}s`,
            background: `hsl(${item.hue} 90% 60% / .9)`,
            width: item.sizeW,
            height: item.sizeH,
            transform: `rotate(${item.rot}deg)`,
            borderRadius: 3
          }}
        />
      ))}
    </div>
  )
}
