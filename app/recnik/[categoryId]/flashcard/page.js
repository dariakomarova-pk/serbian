import { notFound } from 'next/navigation'
import wordsData from '@/data/vocabulary/a1-words.json'
import FlashcardMode from '@/components/vocab/FlashcardMode'

const CATEGORY_NAMES = {
  '01-alfabet': 'Алфавит', '02-pozdravi': 'Приветствия и знакомство',
  '03-porodica': 'Семья', '04-profesije': 'Профессии',
  '05-brojevi': 'Числа и времена года', '06-zemlje': 'Страны и национальности',
  '07-restoran': 'Еда и кафе', '08-grad': 'Город и транспорт',
  '09-putovanja': 'Путешествия', '10-dom': 'Дом и быт',
  '11-slobodno': 'Досуг и хобби', '12-prodavnica': 'Магазин и покупки',
  '13-posao': 'Работа и учёба', '14-glagoli': 'Глаголы A1',
}

export default function FlashcardPage({ params }) {
  const { categoryId } = params
  if (!CATEGORY_NAMES[categoryId]) notFound()

  const words = wordsData.filter(w => w.category === categoryId)

  return (
    <FlashcardMode
      words={words}
      categoryId={categoryId}
      categoryName={CATEGORY_NAMES[categoryId]}
    />
  )
}
