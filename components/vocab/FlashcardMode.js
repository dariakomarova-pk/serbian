'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function FlashcardMode({ words, categoryId, categoryName }) {
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    try {
      const key = `vocab_seen_${categoryId}`
      const seen = new Set(JSON.parse(localStorage.getItem(key) || '[]'))
      seen.add(words[index]?.id)
      localStorage.setItem(key, JSON.stringify([...seen]))
    } catch {}
  }, [index, categoryId, words])

  const word = words[index]

  const handleNext = () => {
    if (index + 1 >= words.length) {
      setDone(true)
    } else {
      setIndex(i => i + 1)
    }
  }

  if (done) {
    return (
      <div className="max-w-lg mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="text-5xl">✅</div>
        <p className="text-lg font-semibold text-gray-100">Все карточки просмотрены</p>
        <p className="text-sm text-gray-60 text-center">{words.length} слов в категории «{categoryName}»</p>
        <div className="flex gap-3 w-full">
          <button
            onClick={() => { setIndex(0); setDone(false) }}
            className="flex-1 py-3 text-sm font-medium text-blue-60 border border-blue-60 active:bg-blue-10"
          >
            Повторить
          </button>
          <Link
            href={`/recnik/${categoryId}/match`}
            className="flex-1 py-3 text-sm font-medium bg-blue-60 text-white text-center active:bg-blue-70"
          >
            Найди пару →
          </Link>
        </div>
        <Link href={`/recnik/${categoryId}`} className="text-sm text-gray-50">
          ← К категории
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <Link href={`/recnik/${categoryId}`} className="text-sm text-gray-60 active:text-gray-100">
          ← Назад
        </Link>
        <span className="text-sm text-gray-50 font-mono">{index + 1} / {words.length}</span>
      </div>

      <div className="bg-white border border-gray-20 p-8 text-center mb-4 min-h-[240px] flex flex-col items-center justify-center gap-3">
        {word.emoji && <div className="text-4xl">{word.emoji}</div>}
        <div className="text-3xl font-semibold text-gray-100">{word.word}</div>
        <div className="text-base text-gray-50 font-mono">[{word.transcription}]</div>
        <div className="text-xl text-gray-80 mt-1">{word.translation}</div>
      </div>

      <div className="h-1 bg-gray-20 mb-4">
        <div
          className="h-full bg-blue-60 transition-all"
          style={{ width: `${((index + 1) / words.length) * 100}%` }}
        />
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-blue-60 text-white py-3 text-sm font-medium active:bg-blue-70"
      >
        {index + 1 >= words.length ? 'Завершить' : 'Дальше →'}
      </button>
    </div>
  )
}
