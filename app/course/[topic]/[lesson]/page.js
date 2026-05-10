import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import LessonPlayer from '@/components/LessonPlayer'

export default function LessonRoute({ params }) {
  const filePath = path.join(
    process.cwd(),
    'data', 'course', 'topics',
    `topic-${params.topic}.json`
  )

  let topicData
  try {
    topicData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch {
    notFound()
  }

  const lessonData = topicData.lessons.find((l) => l.id === params.lesson)
  if (!lessonData) notFound()

  return <LessonPlayer topic={topicData} lesson={lessonData} />
}
