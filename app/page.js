import topicsData from '@/data/a1-topics.json'
import CourseHome from '@/components/CourseHome'

export const metadata = {
  title: 'Srpski jezik',
  description: 'Учи сербский с нуля — курс для русскоязычных',
}

export default function Home() {
  return <CourseHome topics={topicsData.topics} />
}
