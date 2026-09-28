'use client'

export type Story = {
  slug: string
  author: string
  initials: string
  category: string
  title: string
  excerpt: string
  body: string
  date: string
  read: string
  claps: string
  image: string
}

export const stories: Story[] = [
  { slug: 'quiet-power', author: 'Maya Chen', initials: 'MC', category: 'Design', title: 'The quiet power of making space for better ideas', excerpt: 'A practical guide to designing calmer products, teams, and moments of focus in a noisy digital world.', body: 'Good ideas rarely arrive on command. They appear when we create enough room to notice them. A calmer product is not an empty product; it is one that respects attention, gives people clear choices, and knows when to get out of the way.', date: 'May 18', read: '7 min read', claps: '4.8K', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80' },
  { slug: 'building-future', author: 'Jon Bell', initials: 'JB', category: 'Technology', title: 'What we get wrong about building for the future', excerpt: 'The most useful technology is often the kind that gives people more agency, not less.', body: 'The future is not a destination we can predict perfectly. It is a collection of small decisions made today. The strongest tools help people understand those decisions and keep control of what happens next.', date: 'May 17', read: '9 min read', claps: '2.1K', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80' },
  { slug: 'noticing-life', author: 'Leila Okafor', initials: 'LO', category: 'Culture', title: 'A field guide to noticing your own life', excerpt: 'Small rituals, long walks, and the surprising practice of paying attention.', body: 'Attention is a practice before it is a personality trait. Start with one ordinary thing: the walk to the store, the sound of a kettle, or the face of someone you love. The ordinary becomes vivid when we stay with it.', date: 'May 16', read: '5 min read', claps: '1.6K', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80' },
  { slug: 'creative-routine', author: 'Nora Williams', initials: 'NW', category: 'Self', title: 'A creative routine that leaves room for surprise', excerpt: 'Structure can make creativity more reliable without making it predictable.', body: 'A routine should be a door, not a cage. Keep the first step small, remove friction from your workspace, and leave one part of the process deliberately open.', date: 'May 15', read: '6 min read', claps: '980', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80' },
]

export function getSessionStories(): Story[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(sessionStorage.getItem('mediumly-stories') || '[]') } catch { return [] }
}

export function saveSessionStory(story: Story) {
  const next = [...getSessionStories(), story]
  sessionStorage.setItem('mediumly-stories', JSON.stringify(next))
}

export function getAllStories() { return [...getSessionStories(), ...stories] }
export function getStory(slug: string) { return getAllStories().find((story) => story.slug === slug) }
export function initialsFor(name: string) { return name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase() }

export const topics = ['Productivity', 'Self', 'UX Design', 'Writing', 'Life Lessons', 'Future']
export const staffPicks = ['The things we carry forward', 'A better internet is possible', 'Notes from the edge of attention']

export function Avatar({ initials, large = false }: { initials: string; large?: boolean }) {
  return <div className={`flex shrink-0 items-center justify-center rounded-full bg-[#d8ead3] font-semibold text-[#315b39] ${large ? 'size-11 text-sm' : 'size-8 text-xs'}`}>{initials}</div>
}

export function Header({ onWrite }: { onWrite?: () => void }) {
  const React = require('react') as typeof import('react')
  const [user, setUser] = React.useState<{ name: string; initials: string } | null>(null)
  React.useEffect(() => setUser(useSessionUser()), [])
  function signOut() { sessionStorage.removeItem('mediumly-user'); setUser(null); window.location.href = '/' }
  return <header className="sticky top-0 z-20 border-b border-[#e5e5e5] bg-[#fafafa]/95 backdrop-blur"><div className="mx-auto flex h-[74px] max-w-[1260px] items-center justify-between px-5 lg:px-8"><div className="flex items-center gap-8"><a href="/" className="font-serif text-[30px] font-bold tracking-[-1.8px] text-[#242424]">mediumly</a><a href="/explore" className="hidden items-center gap-2 rounded-full bg-[#f0f0f0] px-4 py-2.5 text-sm text-[#6b6b6b] md:flex">Search stories</a></div><nav className="flex items-center gap-3 text-sm text-[#6b6b6b]"><a href="/library" className="hidden sm:block rounded-full px-3 py-2 hover:bg-[#efefef]">Reading list</a><button className="hidden sm:flex" onClick={onWrite}>Write</button>{user ? <><span className="hidden text-[#242424] md:block">{user.name}</span><button onClick={signOut} className="rounded-full px-3 py-2 hover:bg-[#efefef]">Sign out</button></> : <><a href="/signin" className="rounded-full px-4 py-2 hover:bg-[#efefef]">Sign in</a><a href="/signup" className="rounded-full bg-[#242424] px-4 py-2 text-white hover:bg-black">Get started</a></>}</nav></div></header>
}

export function StoryCard({ story }: { story: Story }) {
  return <article className="grid grid-cols-[1fr_118px] gap-6 border-b border-[#e5e5e5] py-8 sm:grid-cols-[1fr_170px]"><div className="min-w-0"><div className="mb-3 flex items-center gap-2 text-xs text-[#6b6b6b]"><Avatar initials={story.initials} /><span className="font-medium text-[#242424]">{story.author}</span><span>·</span><span>{story.category}</span></div><a href={`/stories/${story.slug}`}><h2 className="font-serif text-[21px] leading-[1.16] font-bold tracking-[-.3px] sm:text-[24px]">{story.title}</h2></a><p className="mt-2 line-clamp-2 text-sm leading-5 text-[#6b6b6b] sm:text-[15px]">{story.excerpt}</p><div className="mt-5 flex items-center gap-3 text-xs text-[#8a8a8a]"><span>{story.date}</span><span>·</span><span>{story.read}</span><span>·</span><span>{story.claps} claps</span></div></div><img src={story.image} alt="" className="h-[100px] w-full rounded-sm object-cover sm:h-[115px]" /></article>
}

export function useSessionUser() {
  if (typeof window === 'undefined') return null
  try { return JSON.parse(sessionStorage.getItem('mediumly-user') || 'null') } catch { return null }
}

export function AuthForm({ mode }: { mode: 'signin' | 'signup' }) {
  'use client'
  const React = require('react') as typeof import('react')
  const [error, setError] = React.useState('')
  function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); const email = String(data.get('email')); const name = String(data.get('name') || email.split('@')[0]); if (!email.includes('@')) return setError('Enter a valid email address.'); sessionStorage.setItem('mediumly-user', JSON.stringify({ email, name, initials: initialsFor(name) })); window.location.href = '/' }
  return <form onSubmit={submit} className="mt-8 flex flex-col gap-4"><label className="text-sm font-medium">Email<input name="email" type="email" required className="mt-2 w-full rounded-md border border-[#cfcfcf] px-3 py-3 text-sm outline-none focus:border-[#315b39]" placeholder="you@example.com" /></label>{mode === 'signup' && <label className="text-sm font-medium">Name<input name="name" required className="mt-2 w-full rounded-md border border-[#cfcfcf] px-3 py-3 text-sm outline-none focus:border-[#315b39]" placeholder="Your name" /></label>}<label className="text-sm font-medium">Password<input name="password" type="password" required minLength={8} className="mt-2 w-full rounded-md border border-[#cfcfcf] px-3 py-3 text-sm outline-none focus:border-[#315b39]" placeholder="At least 8 characters" /></label>{error && <p className="text-sm text-red-700">{error}</p>}<button className="mt-2 rounded-full bg-[#315b39] py-3 text-sm font-medium text-white hover:bg-[#25472c]">{mode === 'signin' ? 'Sign in' : 'Create account'}</button></form>
}

export function AuthPage({ mode }: { mode: 'signin' | 'signup' }) { return <main className="min-h-screen bg-[#fafafa] text-[#242424]"><Header /><div className="mx-auto flex max-w-md flex-col px-6 py-20"><div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#242424] text-xl font-bold text-white">m</div><h1 className="mt-7 text-center font-serif text-4xl font-bold">{mode === 'signin' ? 'Welcome back.' : 'Join Mediumly.'}</h1><p className="mt-3 text-center text-sm text-[#6b6b6b]">{mode === 'signin' ? 'Sign in to continue reading.' : 'Create an account to read and write.'}</p><AuthForm mode={mode} /><p className="mt-7 text-center text-sm text-[#315b39]"><a href={mode === 'signin' ? '/signup' : '/signin'}>{mode === 'signin' ? 'No account? Sign up' : 'Already have an account? Sign in'}</a></p></div></main> }

export function SiteFooter() { return <footer className="mx-auto max-w-[1260px] px-5 py-10 text-xs text-[#8a8a8a] lg:px-8">Help · Status · About · Careers · Press</footer> }

export function Sidebar() { return <aside className="hidden border-l border-[#e5e5e5] pl-8 pt-12 lg:block"><div className="border-b border-[#e5e5e5] pb-8"><h2 className="mb-4 font-medium">Staff picks</h2><div className="flex flex-col gap-5">{staffPicks.map((pick) => <p key={pick} className="font-serif text-lg font-bold leading-5">{pick}</p>)}</div></div><div className="py-8"><h2 className="mb-4 font-medium">Recommended topics</h2><div className="flex flex-wrap gap-2">{topics.map((topic) => <a href={`/explore?topic=${encodeURIComponent(topic)}`} key={topic} className="rounded-full bg-[#efefef] px-3 py-2 text-xs text-[#555] hover:bg-[#e4e4e4]">{topic}</a>)}</div></div></aside> }

export function PageShell({ children }: { children: React.ReactNode }) { return <main className="min-h-screen bg-[#fafafa] text-[#242424]"><Header />{children}<SiteFooter /></main> }

export function WritePage() {
  'use client'
  const React = require('react') as typeof import('react')
  const [saved, setSaved] = React.useState(false)
  function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); const title = String(form.get('title')); const body = String(form.get('body')); const user = useSessionUser(); if (!user) { window.location.href = '/signin'; return } saveSessionStory({ slug: `${Date.now()}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, title, body, excerpt: body.slice(0, 150), author: user.name, initials: user.initials, category: 'Personal', date: 'Just now', read: '1 min read', claps: '0', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80' }); setSaved(true); (event.currentTarget as HTMLFormElement).reset() }
  return <PageShell><div className="mx-auto max-w-3xl px-6 py-16"><p className="text-xs font-medium tracking-[.18em] text-[#6b6b6b] uppercase">New story</p><h1 className="mt-3 font-serif text-4xl font-bold">What do you want to say?</h1>{saved && <p className="mt-6 rounded-lg bg-[#eef8ed] px-4 py-3 text-sm text-[#315b39]">Your story was saved to this browser session.</p>}<form onSubmit={submit} className="mt-10 flex flex-col gap-6"><input name="title" required className="border-b border-[#d0d0d0] bg-transparent pb-3 font-serif text-3xl outline-none focus:border-[#242424]" placeholder="Title" /><textarea name="body" required className="min-h-[300px] resize-none border-b border-[#d0d0d0] bg-transparent pb-3 text-lg leading-8 outline-none focus:border-[#242424]" placeholder="Tell your story..." /><button className="self-start rounded-full bg-[#315b39] px-5 py-3 text-sm font-medium text-white hover:bg-[#25472c]">Publish story</button></form></div></PageShell> }

export function ExplorePage() { const React = require('react') as typeof import('react'); const [query, setQuery] = React.useState(''); const filtered = getAllStories().filter((story) => `${story.title} ${story.excerpt} ${story.author}`.toLowerCase().includes(query.toLowerCase())); return <PageShell><div className="mx-auto max-w-[1260px] px-5 py-12 lg:px-8"><h1 className="font-serif text-4xl font-bold">Explore</h1><input value={query} onChange={(event) => setQuery(event.target.value)} className="mt-8 w-full max-w-xl rounded-full bg-[#f0f0f0] px-5 py-3 text-sm outline-none" placeholder="Search stories, writers, and topics" /><div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,760px)_300px] lg:gap-24"><section>{filtered.length ? filtered.map((story) => <StoryCard key={story.slug} story={story} />) : <p className="py-12 text-[#6b6b6b]">No stories found.</p>}</section><Sidebar /></div></div></PageShell> }

export function StoryPage({ slug }: { slug: string }) { const React = require('react') as typeof import('react'); const story = getStory(slug); const [saved, setSaved] = React.useState(false); const [clapped, setClapped] = React.useState(false); React.useEffect(() => { const savedSlugs = JSON.parse(sessionStorage.getItem('mediumly-reading-list') || '[]'); setSaved(savedSlugs.includes(slug)); setClapped(JSON.parse(sessionStorage.getItem('mediumly-clapped') || '[]').includes(slug)) }, [slug]); if (!story) return <PageShell><div className="mx-auto max-w-2xl px-6 py-24"><h1 className="font-serif text-4xl font-bold">Story not found</h1><a className="mt-6 inline-block text-[#315b39]" href="/">Return home</a></div></PageShell>; function toggleSaved() { const current: string[] = JSON.parse(sessionStorage.getItem('mediumly-reading-list') || '[]'); const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]; sessionStorage.setItem('mediumly-reading-list', JSON.stringify(next)); setSaved(!saved) } function clap() { const current: string[] = JSON.parse(sessionStorage.getItem('mediumly-clapped') || '[]'); if (!current.includes(slug)) sessionStorage.setItem('mediumly-clapped', JSON.stringify([...current, slug])); setClapped(true) } return <PageShell><article className="mx-auto max-w-2xl px-6 py-16"><div className="flex items-center gap-3 text-sm"><Avatar initials={story.initials} large /><div><p className="font-medium">{story.author}</p><p className="text-xs text-[#8a8a8a]">{story.date} · {story.read}</p></div></div><h1 className="mt-10 font-serif text-5xl leading-tight font-bold">{story.title}</h1><p className="mt-6 text-xl leading-8 text-[#6b6b6b]">{story.excerpt}</p><div className="mt-6 flex gap-3"><button onClick={clap} className="rounded-full border border-[#d0d0d0] px-4 py-2 text-sm hover:bg-[#f0f0f0]">{clapped ? 'Clapped' : 'Clap'} · {story.claps}</button><button onClick={toggleSaved} className="rounded-full border border-[#d0d0d0] px-4 py-2 text-sm hover:bg-[#f0f0f0]">{saved ? 'Saved' : 'Save to reading list'}</button></div><img src={story.image} alt="" className="mt-10 max-h-[420px] w-full object-cover" /><p className="mt-10 whitespace-pre-line text-lg leading-8">{story.body}</p></article></PageShell> }

export function LibraryPage() { const React = require('react') as typeof import('react'); const [saved, setSaved] = React.useState<Story[]>([]); React.useEffect(() => { const slugs: string[] = JSON.parse(sessionStorage.getItem('mediumly-reading-list') || '[]'); setSaved(slugs.map((slug) => getStory(slug)).filter(Boolean) as Story[]) }, []); return <PageShell><div className="mx-auto max-w-3xl px-6 py-14"><p className="text-xs font-medium tracking-[.18em] text-[#6b6b6b] uppercase">Your collection</p><h1 className="mt-3 font-serif text-4xl font-bold">Reading list</h1>{saved.length ? <div className="mt-8">{saved.map((story) => <StoryCard key={story.slug} story={story} />)}</div> : <div className="mt-10 rounded-xl border border-dashed border-[#cfcfcf] px-6 py-12 text-center"><p className="font-serif text-2xl font-bold">Nothing saved yet.</p><p className="mt-2 text-sm text-[#6b6b6b]">Save stories while reading and they&apos;ll appear here.</p><a href="/explore" className="mt-6 inline-block rounded-full bg-[#315b39] px-5 py-3 text-sm font-medium text-white">Explore stories</a></div>}</div></PageShell> }

export function HomePage() { const React = require('react') as typeof import('react'); const [all, setAll] = React.useState<Story[]>(stories); React.useEffect(() => setAll(getAllStories()), []); return <PageShell><div className="mx-auto grid max-w-[1260px] grid-cols-1 lg:grid-cols-[minmax(0,760px)_300px] lg:gap-24 lg:px-8"><section><div className="flex gap-7 overflow-x-auto border-b border-[#e5e5e5] px-5 pt-8 text-sm lg:px-0"><span className="border-b-2 border-[#242424] pb-4 font-medium">For you</span><a href="/explore" className="pb-4 text-[#6b6b6b]">Explore</a></div><div className="px-5 lg:px-0">{all.map((story) => <StoryCard key={story.slug} story={story} />)}</div></section><Sidebar /></div></PageShell> }

export default HomePage
