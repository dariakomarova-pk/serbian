import Link from 'next/link'
import wordsData from '@/data/vocabulary/a1-words.json'

const CATEGORIES = [
  { id: '01-alfabet',    emoji: '🔤', name: 'Алфавит' },
  { id: '02-pozdravi',  emoji: '👋', name: 'Приветствия и знакомство' },
  { id: '03-porodica',  emoji: '👨‍👩‍👧', name: 'Семья' },
  { id: '04-profesije', emoji: '💼', name: 'Профессии' },
  { id: '05-brojevi',   emoji: '🔢', name: 'Числа и времена года' },
  { id: '06-zemlje',    emoji: '🌍', name: 'Страны и национальности' },
  { id: '07-restoran',  emoji: '☕', name: 'Еда и кафе' },
  { id: '08-grad',      emoji: '🏙️', name: 'Город и транспорт' },
  { id: '09-putovanja', emoji: '✈️', name: 'Путешествия' },
  { id: '10-dom',       emoji: '🏠', name: 'Дом и быт' },
  { id: '11-slobodno',  emoji: '🎸', name: 'Досуг и хобби' },
  { id: '12-prodavnica',emoji: '🛍️', name: 'Магазин и покупки' },
  { id: '13-posao',     emoji: '💻', name: 'Работа и учёба' },
  { id: '14-glagoli',   emoji: '⚡', name: 'Глаголы A1' },
]

export const metadata = {
  title: 'Слова — Srpski jezik',
}

export default function RecnikPage() {
  const countByCategory = {}
  for (const word of wordsData) {
    countByCategory[word.category] = (countByCategory[word.category] || 0) + 1
  }

  return (
    <div className="max-w-lg mx-auto">
      <header className="px-4 pt-6 pb-4">
        <h1 className="text-xl font-semibold text-gray-100">Слова</h1>
        <p className="text-sm text-gray-60 mt-0.5">{wordsData.length} слов · уровень A1</p>
      </header>

      <div className="flex flex-col gap-px px-4">
        {CATEGORIES.map(cat => {
          const count = countByCategory[cat.id] || 0
          return (
            <Link
              key={cat.id}
              href={`/recnik/${cat.id}`}
              className="flex items-center gap-3 bg-white px-4 py-3 active:bg-gray-10"
            >
              <span className="text-2xl w-8 text-center">{cat.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-100">{cat.name}</div>
                <div className="text-xs text-gray-50 mt-0.5">{count} слов</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-gray-40 shrink-0" aria-hidden>
                <path d="M6 3l5 5-5 5-.7-.7L9.6 8 5.3 3.7z" />
              </svg>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
