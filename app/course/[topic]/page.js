import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import TopicPage from '@/components/TopicPage'

export default function TopicRoute({ params }) {
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

  return <TopicPage topic={topicData} />
}
