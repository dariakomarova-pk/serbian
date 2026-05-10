import Link from 'next/link'
import { notFound } from 'next/navigation'
import wordsData from '@/data/vocabulary/a1-words.json'

const CATEGORIES = {
  '01-alfabet':    { emoji: '🔤', name: 'Алфавит' },
  '02-pozdravi':  { emoji: '👋', name: 'Приветствия и знакомство' },
  '03-porodica':  { emoji: '👨‍👩‍👧', name: 'Семья' },
  '04-profesije': { emoji: '💼', name: 'Профессии' },
  '05-brojevi':   { emoji: '🔢', name: 'Числа и времена года' },
  '06-zemlje':    { emoji: '🌍', name: 'Страны и национальности' },
  '07-restoran':  { emoji: '☕', name: 'Еда и кафе' },
  '08-grad':      { emoji: '🏙️', name: 'Город и транспорт' },
  '09-putovanja': { emoji: '✈️', name: 'Путешествия' },
  '10-dom':       { emoji: '🏠', name: 'Дом и быт' },
  '11-slobodno':  { emoji: '🎸', name: 'Досуг и хобби' },
  '12-prodavnica':{ emoji: '🛍️', name: 'Магазин и покупки' },
  '13-posao':     { emoji: '💻', name: 'Работа и учёба' },
  '14-glagoli':   { emoji: '⚡', name: 'Глаголы A1' },
}

export default function CategoryPage({ params }) {
  const { categoryId } = params
  const cat = CATEGORIES[categoryId]
  if (!cat) notFound()

  const words = wordsData.filter(w => w.category === categoryId)

  return (
    <div className="max-w-lg mx-auto">
      <header className="px-4 pt-6 pb-4">
        <Link href="/recnik" className="text-sm text-gray-60 active:text-gray-100 block mb-3">
          ← Слова
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{cat.emoji}</span>
          <div>
            <h1 className="text-lg font-semibold text-gray-100">{cat.name}</h1>
            <p className="text-xs text-gray-50">{words.length} слов</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/recnik/${categoryId}/flashcard`}
            className="flex-1 py-2.5 text-sm font-medium text-center bg-blue-60 text-white active:bg-blue-70"
          >
            Флэшкарты
          </Link>
          <Link
            href={`/recnik/${categoryId}/match`}
            className="flex-1 py-2.5 text-sm font-medium text-center border border-blue-60 text-blue-60 active:bg-blue-10"
          >
            Найди пару
          </Link>
        </div>
      </header>

      <div className="px-4 pb-6">
        <p className="text-xs font-medium text-gray-50 uppercase tracking-widest mb-3">Все слова</p>
        <div className="flex flex-col gap-px">
          {words.map(w => (
            <div key={w.id} className="bg-white px-4 py-3 flex items-center gap-3">
              {w.emoji && <span className="text-xl w-7 text-center">{w.emoji}</span>}
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-gray-100">{w.word}</span>
                <span className="text-xs text-gray-50 font-mono ml-2">[{w.transcription}]</span>
              </div>
              <span className="text-sm text-gray-60 shrink-0">{w.translation}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
