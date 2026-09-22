'use client'

import { useState } from 'react'
import {
  Bell,
  Edit3,
  Menu,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'

const stories = [
  {
    author: 'Maya Chen',
    initials: 'MC',
    category: 'Design',
    title: 'The quiet power of making space for better ideas',
    excerpt: 'A practical guide to designing calmer products, teams, and moments of focus in a noisy digital world.',
    date: 'May 18',
    read: '7 min read',
    claps: '4.8K',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
    tone: 'bg-[#e7efe6]',
  },
  {
    author: 'Jon Bell',
    initials: 'JB',
    category: 'Technology',
    title: 'What we get wrong about building for the future',
    excerpt: 'The most useful technology is often the kind that gives people more agency, not less.',
    date: 'May 17',
    read: '9 min read',
    claps: '2.1K',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    tone: 'bg-[#ece9f4]',
  },
  {
    author: 'Leila Okafor',
    initials: 'LO',
    category: 'Culture',
    title: 'A field guide to noticing your own life',
    excerpt: 'Small rituals, long walks, and the surprising practice of paying attention.',
    date: 'May 16',
    read: '5 min read',
    claps: '1.6K',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80',
    tone: 'bg-[#f4ebdf]',
  },
]

function Avatar({ initials, large = false }: { initials: string; large?: boolean }) {
  return (
    <div className={`flex shrink-0 items-center justify-center rounded-full bg-[#d8ead3] font-semibold text-[#315b39] ${large ? 'size-11 text-sm' : 'size-8 text-xs'}`}>
      {initials}
    </div>
  )
}

export default function Page() {
  const [modal, setModal] = useState<'signin' | 'signup' | 'write' | null>(null)
  const [activeTab, setActiveTab] = useState('For you')
  const [published, setPublished] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[#fafafa] text-[#242424]">
      <header className="sticky top-0 z-20 border-b border-[#e5e5e5] bg-[#fafafa]/95 backdrop-blur">
        <div className="mx-auto flex h-[74px] max-w-[1260px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-8">
            <a href="#" className="font-serif text-[30px] font-bold tracking-[-1.8px] text-[#242424]" aria-label="Mediumly home">mediumly</a>
            <div className="hidden items-center gap-2 rounded-full bg-[#f0f0f0] px-4 py-2.5 text-sm text-[#6b6b6b] md:flex md:w-[250px]">
              <Search className="size-4" aria-hidden="true" />
              <span>Search stories</span>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-sm text-[#6b6b6b]" aria-label="Account navigation">
            <button className="hidden items-center gap-2 transition hover:text-[#242424] sm:flex" onClick={() => setModal('write')}>
              <Edit3 className="size-4" aria-hidden="true" /> Write
            </button>
            <button className="hidden sm:block" aria-label="Notifications"><Bell className="size-[18px]" /></button>
            <button className="rounded-full px-4 py-2 transition hover:bg-[#efefef]" onClick={() => setModal('signin')}>Sign in</button>
            <button className="rounded-full bg-[#242424] px-4 py-2 text-white transition hover:bg-black" onClick={() => setModal('signup')}>Get started</button>
            <button className="sm:hidden" aria-label="Open navigation"><Menu className="size-5" /></button>
          </nav>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1260px] grid-cols-1 lg:grid-cols-[minmax(0,760px)_300px] lg:gap-24 lg:px-8">
        <section>
          <div className="flex items-center gap-7 overflow-x-auto border-b border-[#e5e5e5] px-5 pt-8 text-sm whitespace-nowrap lg:px-0">
            {['For you', 'Following', 'Technology', 'Design', 'Culture'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`border-b-2 pb-4 transition ${activeTab === tab ? 'border-[#242424] font-medium text-[#242424]' : 'border-transparent text-[#6b6b6b] hover:text-[#242424]'}`}>
                {tab}
              </button>
            ))}
            <button className="pb-4 text-[#6b6b6b]" aria-label="More topics"><MoreHorizontal className="size-5" /></button>
          </div>
          <div className="flex flex-col gap-0 px-5 lg:px-0">
            {published && (
              <div className="mt-7 flex items-center gap-3 rounded-xl border border-[#b9d8b6] bg-[#eef8ed] px-4 py-3 text-sm text-[#315b39]">
                <ShieldCheck className="size-4" /> Your story is saved as a draft. Publish flow is ready for your backend.
                <button className="ml-auto" onClick={() => setPublished(false)} aria-label="Dismiss notice"><X className="size-4" /></button>
              </div>
            )}
            {stories.map((story) => (
              <article key={story.title} className="grid grid-cols-[1fr_118px] gap-6 border-b border-[#e5e5e5] py-8 sm:grid-cols-[1fr_170px]">
                <div className="min-w-0">
                  <div className="mb-3 flex items-center gap-2 text-xs text-[#6b6b6b]"><Avatar initials={story.initials} /><span className="font-medium text-[#242424]">{story.author}</span><span>·</span><span>{story.category}</span></div>
                  <h2 className="font-serif text-[21px] leading-[1.16] font-bold tracking-[-.3px] sm:text-[24px]">{story.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-[#6b6b6b] sm:text-[15px]">{story.excerpt}</p>
                  <div className="mt-5 flex items-center gap-3 text-xs text-[#8a8a8a]"><span>{story.date}</span><span>·</span><span>{story.read}</span><span>·</span><span>{story.claps} claps</span></div>
                </div>
                <img src={story.image} alt="" className={`h-[100px] w-full rounded-sm object-cover sm:h-[115px] ${story.tone}`} />
              </article>
            ))}
          </div>
        </section>

        <aside className="hidden border-l border-[#e5e5e5] pl-8 pt-12 lg:block">
          <div className="border-b border-[#e5e5e5] pb-8">
            <div className="mb-4 flex items-center gap-2"><Sparkles className="size-4" /><h2 className="font-medium">Staff picks</h2></div>
            <div className="flex flex-col gap-5">
              <div><p className="text-xs text-[#6b6b6b]">MORGAN HARPER</p><p className="mt-1 font-serif text-lg font-bold leading-5">The things we carry forward</p></div>
              <div><p className="text-xs text-[#6b6b6b]">THE DAILY EDIT</p><p className="mt-1 font-serif text-lg font-bold leading-5">A better internet is possible</p></div>
              <div><p className="text-xs text-[#6b6b6b]">RINA SATO</p><p className="mt-1 font-serif text-lg font-bold leading-5">Notes from the edge of attention</p></div>
            </div>
            <button className="mt-6 text-sm text-[#315b39]">See all recommendations →</button>
          </div>
          <div className="py-8"><h2 className="mb-4 font-medium">Recommended topics</h2><div className="flex flex-wrap gap-2">{['Productivity', 'Self', 'UX Design', 'Writing', 'Life Lessons', 'Future'].map((topic) => <button key={topic} className="rounded-full bg-[#efefef] px-3 py-2 text-xs text-[#555] hover:bg-[#e4e4e4]">{topic}</button>)}</div></div>
          <div className="border-t border-[#e5e5e5] pt-7 text-xs leading-5 text-[#8a8a8a]"><p>Help · Status · About · Careers · Press</p><p className="mt-3">A calm place for curious people to read and write.</p></div>
        </aside>
      </div>

      <button onClick={() => setModal('write')} className="fixed right-5 bottom-5 flex items-center gap-2 rounded-full bg-[#242424] px-5 py-3 text-sm text-white shadow-lg transition hover:bg-black sm:hidden"><Edit3 className="size-4" /> Write</button>

      {modal && <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/35 p-4" role="dialog" aria-modal="true" aria-label={modal === 'write' ? 'Write a story' : modal === 'signin' ? 'Sign in' : 'Create account'}>
        <div className="relative max-h-[90vh] w-full max-w-[460px] overflow-y-auto rounded-2xl bg-white p-7 shadow-2xl sm:p-10">
          <button onClick={() => setModal(null)} className="absolute top-5 right-5 rounded-full p-2 text-[#6b6b6b] hover:bg-[#f0f0f0]" aria-label="Close dialog"><X className="size-5" /></button>
          {modal === 'write' ? <>
            <p className="mb-2 text-xs font-medium tracking-[.18em] text-[#6b6b6b] uppercase">New story</p><h2 className="font-serif text-3xl font-bold">What do you want to say?</h2>
            <input className="mt-8 w-full border-b border-[#d0d0d0] pb-3 font-serif text-2xl outline-none placeholder:text-[#b5b5b5] focus:border-[#242424]" placeholder="Title" aria-label="Story title" />
            <textarea className="mt-6 min-h-[160px] w-full resize-none border-b border-[#d0d0d0] pb-3 text-base leading-7 outline-none placeholder:text-[#b5b5b5] focus:border-[#242424]" placeholder="Tell your story..." aria-label="Story body" />
            <div className="mt-7 flex items-center justify-between"><span className="text-xs text-[#8a8a8a]">Drafts are private until you publish.</span><button onClick={() => { setPublished(true); setModal(null) }} className="rounded-full bg-[#315b39] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#25472c]">Save draft</button></div>
          </> : <>
            <div className="mb-8 flex justify-center"><div className="flex size-12 items-center justify-center rounded-full bg-[#242424] text-xl font-bold text-white">m</div></div>
            <h2 className="text-center font-serif text-3xl font-bold">{modal === 'signin' ? 'Welcome back.' : 'Join Mediumly.'}</h2>
            <p className="mt-3 text-center text-sm text-[#6b6b6b]">{modal === 'signin' ? 'Sign in to continue reading.' : 'Create an account to read and write.'}</p>
            <div className="mt-8 flex flex-col gap-4"><label className="text-sm font-medium">Email<input type="email" className="mt-2 w-full rounded-md border border-[#cfcfcf] px-3 py-3 text-sm outline-none focus:border-[#315b39]" placeholder="you@example.com" /></label>{modal === 'signup' && <label className="text-sm font-medium">Name<input type="text" className="mt-2 w-full rounded-md border border-[#cfcfcf] px-3 py-3 text-sm outline-none focus:border-[#315b39]" placeholder="Your name" /></label>}<button onClick={() => setModal(null)} className="mt-2 rounded-full bg-[#315b39] py-3 text-sm font-medium text-white hover:bg-[#25472c]">{modal === 'signin' ? 'Continue with email' : 'Create account'}</button></div>
            <p className="mt-7 text-center text-xs leading-5 text-[#8a8a8a]">By continuing, you agree to our Terms and acknowledge our Privacy Policy.</p>
            <button onClick={() => setModal(modal === 'signin' ? 'signup' : 'signin')} className="mx-auto mt-7 block text-sm font-medium text-[#315b39]">{modal === 'signin' ? 'No account? Sign up' : 'Already have an account? Sign in'}</button>
          </>}
        </div>
      </div>}
    </main>
  )
}
