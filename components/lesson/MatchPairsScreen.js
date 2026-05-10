'use client'

import { useState, useEffect } from 'react'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function MatchPairsScreen({ data, onReady, onAnswer }) {
  const { instruction, pairs } = data
  const isEmoji = data.type === 'match_pairs_emoji'

  const [items] = useState(() => {
    const lefts = pairs.map((p, i) => ({
      id: `l${i}`,
      text: isEmoji ? p.emoji : p.serbian,
      pairId: i,
    }))
    const rights = pairs.map((p, i) => ({
      id: `r${i}`,
      text: isEmoji ? p.serbian : p.russian,
      pairId: i,
    }))
    return shuffle([...lefts, ...rights])
  })

  const [selected, setSelected] = useState(null)
  const [matched, setMatched] = useState([])
  const [wrongFlash, setWrongFlash] = useState([])

  const allMatched = matched.length === pairs.length

  useEffect(() => {
    if (allMatched) {
      onAnswer(true)
      onReady()
    }
  }, [allMatched])

  function handleClick(item) {
    if (matched.includes(item.pairId)) return
    if (wrongFlash.length > 0) return

    if (!selected) {
      setSelected(item.id)
      return
    }
    if (selected === item.id) {
      setSelected(null)
      return
    }

    const selItem = items.find((i) => i.id === selected)

    if (selItem.pairId === item.pairId) {
      setMatched((prev) => [...prev, item.pairId])
      setSelected(null)
    } else {
      setWrongFlash([selected, item.id])
      setTimeout(() => {
        setWrongFlash([])
        setSelected(null)
      }, 500)
    }
  }

  function itemClass(item) {
    const base = 'border p-3 text-sm font-medium min-h-[52px] flex items-center justify-center text-center leading-tight'
    if (matched.includes(item.pairId)) return `${base} bg-green-10 border-green-40 text-green-60`
    if (wrongFlash.includes(item.id)) return `${base} bg-red-10 border-red-40 text-red-60`
    if (selected === item.id) return `${base} bg-blue-10 border-blue-60 text-blue-60`
    return `${base} bg-white border-gray-20 text-gray-100 active:bg-gray-10`
  }

  return (
    <div className="py-4 pb-8">
      <p className="text-xs text-gray-50 mb-4">{instruction}</p>

      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item)}
            disabled={matched.includes(item.pairId)}
            className={itemClass(item)}
          >
            {item.text}
          </button>
        ))}
      </div>

      {allMatched && (
        <div className="mt-4 px-4 py-3 bg-green-10 text-green-60 text-sm font-medium">
          Все пары найдены!
        </div>
      )}
    </div>
  )
}
