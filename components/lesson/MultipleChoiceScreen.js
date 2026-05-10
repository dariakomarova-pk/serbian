'use client'

import { useState } from 'react'

export default function MultipleChoiceScreen({ data, onReady, onAnswer }) {
  const { instruction, question, options, answer, hint } = data
  const [selected, setSelected] = useState(null)
  const answered = selected !== null

  function handleSelect(opt) {
    if (answered) return
    setSelected(opt)
    onAnswer(opt === answer)
    onReady()
  }

  function optionClass(opt) {
    const base = 'w-full border p-3.5 text-sm font-medium text-left'
    if (!answered) return `${base} bg-white border-gray-20 text-gray-100 active:bg-gray-10`
    if (opt === answer) return `${base} bg-green-10 border-green-40 text-green-60`
    if (opt === selected) return `${base} bg-red-10 border-red-40 text-red-60`
    return `${base} bg-white border-gray-20 text-gray-40`
  }

  const isCorrect = selected === answer

  return (
    <div className="py-4 pb-8">
      <p className="text-xs text-gray-50 mb-4">{instruction}</p>

      <div className="bg-white border border-gray-20 py-8 px-4 mb-6 flex items-center justify-center">
        <span className="text-4xl font-semibold text-gray-100 font-mono tracking-wide">
          {question}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            disabled={answered}
            className={optionClass(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      {answered && (
        <div
          className={`mt-4 px-4 py-3 text-sm font-medium ${
            isCorrect ? 'bg-green-10 text-green-60' : 'bg-red-10 text-red-60'
          }`}
        >
          {isCorrect
            ? 'Правильно!'
            : `Правильный ответ: ${answer}${hint ? ` (${hint})` : ''}`}
        </div>
      )}
    </div>
  )
}
