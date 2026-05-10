'use client'

import { useState } from 'react'
import Link from 'next/link'

function chunkArray(arr, size) {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size))
  return chunks
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function MatchMode({ words, categoryId, categoryName }) {
  const rounds = chunkArray(words, 6)

  const [roundIndex, setRoundIndex] = useState(0)
  const [matched, setMatched] = useState(new Set())
  const [selected, setSelected] = useState(null)
  const [wrong, setWrong] = useState(null) // { left, right }
  const [done, setDone] = useState(false)
  const [shuffledRight, setShuffledRight] = useState(() => shuffle(rounds[0] || []))

  const round = rounds[roundIndex] || []

  const handleLeft = (id) => {
    if (matched.has(id) || wrong) return
    setSelected(id)
  }

  const handleRight = (id) => {
    if (matched.has(id) || !selected || wrong) return

    if (selected === id) {
      const next = new Set(matched)
      next.add(id)
      setMatched(next)
      setSelected(null)

      if (next.size === round.length) {
        setTimeout(() => {
          if (roundIndex + 1 >= rounds.length) {
            setDone(true)
          } else {
            const nextRound = rounds[roundIndex + 1]
            setRoundIndex(r => r + 1)
            setMatched(new Set())
            setSelected(null)
            setShuffledRight(shuffle(nextRound))
          }
        }, 400)
      }
    } else {
      setWrong({ left: selected, right: id })
      setTimeout(() => {
        setWrong(null)
        setSelected(null)
      }, 700)
    }
  }

  const restart = () => {
    setRoundIndex(0)
    setMatched(new Set())
    setSelected(null)
    setWrong(null)
    setDone(false)
    setShuffledRight(shuffle(rounds[0] || []))
  }

  if (done) {
    return (
      <div className="max-w-lg mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="text-5xl">🎉</div>
        <p className="text-lg font-semibold text-gray-100">Все пары найдены!</p>
        <p className="text-sm text-gray-60">{rounds.length} {roundLabel(rounds.length)}, {words.length} слов</p>
        <div className="flex gap-3 w-full">
          <button onClick={restart} className="flex-1 py-3 text-sm font-medium text-blue-60 border border-blue-60 active:bg-blue-10">
            Ещё раз
          </button>
          <Link href={`/recnik/${categoryId}`} className="flex-1 py-3 text-sm font-medium bg-blue-60 text-white text-center active:bg-blue-70">
            К категории
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <Link href={`/recnik/${categoryId}`} className="text-sm text-gray-60 active:text-gray-100">
          ← Назад
        </Link>
        <span className="text-sm text-gray-50">Раунд {roundIndex + 1} / {rounds.length}</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          {round.map(w => {
            const isMatched = matched.has(w.id)
            const isSelected = selected === w.id
            const isWrong = wrong?.left === w.id
            return (
              <button
                key={w.id + '-l'}
                onClick={() => handleLeft(w.id)}
                disabled={isMatched}
                className={`py-3 px-3 text-sm font-medium text-left border transition-colors ${
                  isMatched  ? 'bg-green-10 border-green-40 text-green-60 opacity-50' :
                  isWrong    ? 'bg-red-10 border-red-40 text-red-60' :
                  isSelected ? 'bg-blue-10 border-blue-60 text-blue-60' :
                               'bg-white border-gray-20 text-gray-100 active:bg-gray-10'
                }`}
              >
                {w.word}
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-2">
          {shuffledRight.map(w => {
            const isMatched = matched.has(w.id)
            const isWrong = wrong?.right === w.id
            return (
              <button
                key={w.id + '-r'}
                onClick={() => handleRight(w.id)}
                disabled={isMatched}
                className={`py-3 px-3 text-sm text-left border transition-colors ${
                  isMatched ? 'bg-green-10 border-green-40 text-green-60 opacity-50' :
                  isWrong   ? 'bg-red-10 border-red-40 text-red-60' :
                              'bg-white border-gray-20 text-gray-100 active:bg-gray-10'
                }`}
              >
                {w.translation}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function roundLabel(n) {
  if (n % 10 === 1 && n % 100 !== 11) return 'раунд'
  if ([2,3,4].includes(n % 10) && ![12,13,14].includes(n % 100)) return 'раунда'
  return 'раундов'
}
