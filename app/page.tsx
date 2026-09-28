import { HomePage } from '@/lib/content'

export const metadata = {
  title: 'Mediumly — Ideas worth sharing',
  description: 'Read and share thoughtful stories on Mediumly.',
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <HomePage />
}
