'use client'

import { StoryPage } from '@/lib/content'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <StoryPage slug={slug} />
}
