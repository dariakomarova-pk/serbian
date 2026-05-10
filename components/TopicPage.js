'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M6 3l5 5-5 5-.7-.7L9.6 8 5.3 3.7z" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M11 6V5A3 3 0 005 5v1H3v9h10V6h-2zm-4-1a1 1 0 012 0v1H7V5zm4 8H5V8h6v5z" />
    </svg>
  )
}

function lessonsLabel(n) {
  if (n === 1) return 'урок'
  if (n >= 2 && n <= 4) return 'урока'
  return 'уроков'
}

export default function TopicPage({ topic }) {
  const router = useRouter()
  const [completedLessons, setCompletedLessons] = useState([])

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('srb_lessons') || '{}')
      const done = topic.lessons.filter((l) => stored[l.id]?.completed).map((l) => l.id)
      setCompletedLessons(done)
    } catch {}
  }, [topic.lessons])

  const allLessonsCompleted = completedLessons.length === topic.lessons.length

  return (
    <div className="min-h-screen bg-gray-10">
      <div className="max-w-lg mx-auto">

        <header className="px-4 pt-10 pb-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1 text-sm text-gray-60 mb-5"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M10 3L5 8l5 5-.7.7L3.6 8 9.3 2.3z" />
            </svg>
            Назад
          </button>
          <span className="text-xs font-medium text-blue-60">
            A1 · Тема {String(topic.order).padStart(2, '0')}
          </span>
          <h1 className="text-xl font-semibold text-gray-100 mt-1 leading-snug">
            {topic.title}
          </h1>
          <p className="text-sm text-gray-60 mt-0.5">{topic.titleRu}</p>
        </header>

        <section className="px-4 pb-10">
          <p className="text-xs font-medium text-gray-50 uppercase tracking-widest mb-3">
            Уроки
          </p>

          <div className="flex flex-col gap-px">
            {topic.lessons.map((lesson, i) => {
              const isCompleted = completedLessons.includes(lesson.id)
              const prevDone = i === 0 || completedLessons.includes(topic.lessons[i - 1].id)

              if (!prevDone) {
                return (
                  <div key={lesson.id} className="bg-white border border-gray-20 p-4 opacity-40 select-none">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-gray-40 font-mono block mb-1">
                          {String(lesson.order).padStart(2, '0')}
                        </span>
                        <div className="text-sm font-semibold text-gray-100 leading-snug">
                          {lesson.title}
                        </div>
                        <div className="text-xs text-gray-60 mt-0.5">{lesson.titleRu}</div>
                      </div>
                      <span className="text-gray-40 mt-0.5 shrink-0"><LockIcon /></span>
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={lesson.id}
                  href={`/course/${topic.id}/${lesson.id}`}
                  className="block bg-white border border-gray-20 p-4 active:bg-gray-10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-40 font-mono">
                          {String(lesson.order).padStart(2, '0')}
                        </span>
                        {isCompleted && (
                          <span className="text-xs text-green-50 font-medium">Пройдено</span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-gray-100 leading-snug">
                        {lesson.title}
                      </div>
                      <div className="text-xs text-gray-60 mt-0.5">{lesson.titleRu}</div>
                    </div>
                    <span className="text-gray-40 mt-0.5 shrink-0"><ChevronIcon /></span>
                  </div>
                </Link>
              )
            })}

            {/* Topic test */}
            <div className={`bg-white border border-gray-20 p-4 ${!allLessonsCompleted ? 'opacity-40 select-none' : ''}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-mono text-gray-40 block mb-1">T</span>
                  <div className="text-sm font-semibold text-gray-100 leading-snug">
                    Тест темы
                  </div>
                  <div className="text-xs text-gray-60 mt-0.5">
                    {topic.test.totalQuestions} вопросов · нужно {topic.test.passingScore} правильных
                  </div>
                </div>
                <span className="text-gray-40 mt-0.5 shrink-0">
                  {allLessonsCompleted ? <ChevronIcon /> : <LockIcon />}
                </span>
              </div>
            </div>
          </div>

          {/* Culture note */}
          {topic.cultureNote && (
            <div className="mt-6 bg-white border border-gray-20 p-4">
              <p className="text-xs font-medium text-gray-50 uppercase tracking-widest mb-2">
                Культурная заметка
              </p>
              <p className="text-sm font-semibold text-gray-100 mb-1">{topic.cultureNote.titleRu}</p>
              <p className="text-sm text-gray-60 leading-relaxed">{topic.cultureNote.textRu}</p>
              <p className="text-xs text-gray-40 mt-2">
                Ключевое слово:{' '}
                <span className="font-semibold text-blue-60">{topic.cultureNote.keyWord}</span>
                {' '}— {topic.cultureNote.keyWordTranslation}
              </p>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
