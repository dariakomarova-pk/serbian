'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

function lessonsLabel(n) {
  if (n === 1) return 'урок'
  if (n >= 2 && n <= 4) return 'урока'
  return 'уроков'
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M11 6V5A3 3 0 005 5v1H3v9h10V6h-2zm-4-1a1 1 0 012 0v1H7V5zm4 8H5V8h6v5z" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M6 3l5 5-5 5-.7-.7L9.6 8 5.3 3.7z" />
    </svg>
  )
}

function ProgressBar({ pct, completed }) {
  return (
    <div className="h-0.5 w-full bg-gray-20 overflow-hidden">
      <div
        className={`h-full ${completed ? 'bg-green-40' : 'bg-blue-60'}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

function TopicCard({ topic, pct }) {
  const completed = pct >= 100

  return (
    <Link
      href={`/course/${topic.id}`}
      className="block bg-white border border-gray-20 p-4 active:bg-gray-10"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-40 font-mono tabular-nums">
              {String(topic.order).padStart(2, '0')}
            </span>
            {completed && (
              <span className="text-xs text-green-50 font-medium">Пройдено</span>
            )}
          </div>
          <div className="text-sm font-semibold text-gray-100 leading-snug">
            {topic.title}
          </div>
          <div className="text-xs text-gray-60 mt-0.5">
            {topic.titleRu}
          </div>
        </div>
        <span className="text-gray-40 mt-0.5 shrink-0">
          <ChevronIcon />
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex-1">
          <ProgressBar pct={pct} completed={completed} />
        </div>
        <span className="text-xs text-gray-40 shrink-0 whitespace-nowrap">
          {topic.lessonsTotal} {lessonsLabel(topic.lessonsTotal)}
        </span>
      </div>
    </Link>
  )
}

function LockedCard({ topic }) {
  return (
    <div className="bg-white border border-gray-20 p-4 opacity-40 select-none">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <span className="text-xs text-gray-40 font-mono tabular-nums block mb-1">
            {String(topic.order).padStart(2, '0')}
          </span>
          <div className="text-sm font-semibold text-gray-100 leading-snug">
            {topic.title}
          </div>
          <div className="text-xs text-gray-60 mt-0.5">
            {topic.titleRu}
          </div>
        </div>
        <span className="text-gray-40 mt-0.5 shrink-0">
          <LockIcon />
        </span>
      </div>
      <div className="mt-3">
        <span className="text-xs text-gray-40">
          {topic.lessonsTotal} {lessonsLabel(topic.lessonsTotal)}
        </span>
      </div>
    </div>
  )
}

export default function CourseHome({ topics }) {
  const [progress, setProgress] = useState({})

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('srb_progress') || '{}')
      setProgress(stored)
    } catch {
      // localStorage недоступен
    }
  }, [])

  const totalUnlocked = topics.filter((t) => t.isUnlocked).length
  const totalCompleted = topics.filter((t) => (progress[t.id] ?? 0) >= 100).length

  return (
    <div className="min-h-screen bg-gray-10">
      <div className="max-w-lg mx-auto">

        <header className="px-4 pt-6 pb-6">
          <div className="flex items-baseline justify-between mb-1">
            <h1 className="text-2xl font-semibold text-gray-100 tracking-tight">
              Srpski jezik
            </h1>
            <span className="text-xs font-medium text-blue-60 bg-blue-10 px-2 py-0.5">
              A1
            </span>
          </div>
          <p className="text-sm text-gray-60">
            {totalCompleted > 0
              ? `${totalCompleted} из ${topics.length} тем пройдено`
              : `${topics.length} тем · начни с первой`}
          </p>
        </header>

        <section className="px-4 pb-10">
          <p className="text-xs font-medium text-gray-50 uppercase tracking-widest mb-3">
            Уровень A1
          </p>

          <div className="flex flex-col gap-px">
            {topics.map((topic) =>
              topic.isUnlocked ? (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  pct={progress[topic.id] ?? 0}
                />
              ) : (
                <LockedCard key={topic.id} topic={topic} />
              )
            )}
          </div>
        </section>

      </div>
    </div>
  )
}
