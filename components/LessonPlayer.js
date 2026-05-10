'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import TheoryScreen from './lesson/TheoryScreen'
import AlphabetScreen from './lesson/AlphabetScreen'
import SpecialLettersScreen from './lesson/SpecialLettersScreen'
import VocabularyScreen from './lesson/VocabularyScreen'
import MultipleChoiceScreen from './lesson/MultipleChoiceScreen'
import MatchPairsScreen from './lesson/MatchPairsScreen'

const CONTENT_TYPES = new Set(['theory', 'alphabet', 'special_letters', 'vocabulary'])

function buildScreens(lesson) {
  const screens = []
  if (lesson.grammar) screens.push({ type: 'theory', data: lesson.grammar })
  if (lesson.alphabet) screens.push({ type: 'alphabet', data: lesson.alphabet })
  if (lesson.specialLetters) screens.push({ type: 'special_letters', data: lesson.specialLetters })
  if (lesson.vocabulary) {
    screens.push({ type: 'vocabulary', data: { words: lesson.vocabulary, note: lesson.note } })
  }
  for (const ex of lesson.exercises || []) {
    if (ex.type === 'multiple_choice') {
      for (const q of ex.questions) {
        screens.push({ type: 'multiple_choice', data: { instruction: ex.instruction, ...q } })
      }
    } else if (ex.type === 'match_pairs' || ex.type === 'match_pairs_emoji') {
      screens.push({ type: ex.type, data: ex })
    }
  }
  return screens
}

function saveProgress(topic, lesson, score) {
  try {
    const lessons = JSON.parse(localStorage.getItem('srb_lessons') || '{}')
    lessons[lesson.id] = { completed: true, score }
    localStorage.setItem('srb_lessons', JSON.stringify(lessons))

    const topicProg = JSON.parse(localStorage.getItem('srb_progress') || '{}')
    const completedCount = topic.lessons.filter((l) => lessons[l.id]?.completed).length
    topicProg[topic.id] = Math.round((completedCount / topic.lessons.length) * 100)
    localStorage.setItem('srb_progress', JSON.stringify(topicProg))
  } catch {}
}

export default function LessonPlayer({ topic, lesson }) {
  const router = useRouter()
  const screens = useMemo(() => buildScreens(lesson), [lesson])

  const [idx, setIdx] = useState(0)
  const [canAdvance, setCanAdvance] = useState(CONTENT_TYPES.has(screens[0]?.type))
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [completed, setCompleted] = useState(false)

  const screen = screens[idx]
  const isLast = idx === screens.length - 1
  const progressPct = screens.length > 0 ? (idx / screens.length) * 100 : 0

  function handleAnswer(isCorrect) {
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }))
  }

  function advance() {
    if (isLast) {
      saveProgress(topic, lesson, score)
      setCompleted(true)
      return
    }
    const next = screens[idx + 1]
    setIdx(idx + 1)
    setCanAdvance(CONTENT_TYPES.has(next?.type))
  }

  if (completed) {
    const nextLesson = topic.lessons.find((l) => l.order === lesson.order + 1)
    return (
      <CompletionScreen
        lesson={lesson}
        score={score}
        onBack={() => router.push(`/course/${topic.id}`)}
        onNext={nextLesson ? () => router.push(`/course/${topic.id}/${nextLesson.id}`) : null}
      />
    )
  }

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-gray-10">

      <header className="shrink-0 flex items-center gap-3 px-4 pt-10 pb-4">
        <button
          onClick={() => router.push(`/course/${topic.id}`)}
          className="shrink-0 text-gray-60 p-1 -ml-1"
          aria-label="Назад к теме"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 4L7 10l6 6-.8.7L5.5 10 12.2 3.3z" />
          </svg>
        </button>
        <div className="flex-1 h-0.5 bg-gray-20 overflow-hidden">
          <div
            className="h-full bg-blue-60"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <span className="shrink-0 text-xs text-gray-40 tabular-nums">
          {idx + 1} / {screens.length}
        </span>
      </header>

      <main className="flex-1 overflow-y-auto px-4">
        {screen.type === 'theory' && <TheoryScreen data={screen.data} />}
        {screen.type === 'alphabet' && <AlphabetScreen data={screen.data} />}
        {screen.type === 'special_letters' && <SpecialLettersScreen data={screen.data} />}
        {screen.type === 'vocabulary' && <VocabularyScreen data={screen.data} />}
        {screen.type === 'multiple_choice' && (
          <MultipleChoiceScreen
            key={idx}
            data={screen.data}
            onReady={() => setCanAdvance(true)}
            onAnswer={handleAnswer}
          />
        )}
        {(screen.type === 'match_pairs' || screen.type === 'match_pairs_emoji') && (
          <MatchPairsScreen
            key={idx}
            data={screen.data}
            onReady={() => setCanAdvance(true)}
            onAnswer={handleAnswer}
          />
        )}
      </main>

      <footer className="shrink-0 px-4 pb-8 pt-3">
        <button
          onClick={advance}
          disabled={!canAdvance}
          className="w-full bg-blue-60 text-white py-4 text-sm font-semibold disabled:bg-gray-20 disabled:text-gray-40 disabled:cursor-not-allowed"
        >
          {isLast ? 'Завершить' : 'Далее →'}
        </button>
      </footer>

    </div>
  )
}

function CompletionScreen({ lesson, score, onBack, onNext }) {
  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 100

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-gray-10 px-4">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-4xl mb-4 text-green-40">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" />
            <path d="M15 26l8 8 14-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-100 mb-1">Урок завершён!</h2>
        <p className="text-sm text-gray-60 mb-8">{lesson.titleRu}</p>

        {score.total > 0 && (
          <div className="flex gap-3 w-full mb-8">
            <div className="flex-1 bg-white border border-gray-20 p-4 text-center">
              <div className="text-2xl font-semibold text-gray-100">{score.correct}</div>
              <div className="text-xs text-gray-50 mt-1">верно</div>
            </div>
            <div className="flex-1 bg-white border border-gray-20 p-4 text-center">
              <div className="text-2xl font-semibold text-gray-100">{score.total - score.correct}</div>
              <div className="text-xs text-gray-50 mt-1">ошибок</div>
            </div>
            <div className="flex-1 bg-white border border-gray-20 p-4 text-center">
              <div className="text-2xl font-semibold text-gray-100">{pct}%</div>
              <div className="text-xs text-gray-50 mt-1">результат</div>
            </div>
          </div>
        )}
      </div>

      <div className="shrink-0 pb-8 flex flex-col gap-2">
        {onNext && (
          <button
            onClick={onNext}
            className="w-full bg-blue-60 text-white py-4 text-sm font-semibold"
          >
            Следующий урок →
          </button>
        )}
        <button
          onClick={onBack}
          className={`w-full py-4 text-sm font-semibold border ${
            onNext
              ? 'bg-white border-gray-20 text-gray-70'
              : 'bg-blue-60 border-blue-60 text-white'
          }`}
        >
          ← Назад к теме
        </button>
      </div>
    </div>
  )
}
