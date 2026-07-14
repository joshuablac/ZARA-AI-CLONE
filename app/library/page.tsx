'use client'

import { useMemo, useState } from 'react'
import { BookOpen, Search } from 'lucide-react'
import { prompts } from '@/lib/synapse-data'
import { GlassCard } from '@/components/glass-card'

export default function LibraryPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return prompts
    return prompts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }, [query])

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 md:px-8 md:py-14">
      <header className="mb-6 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white">
            <BookOpen size={18} aria-hidden />
          </span>
          <h1 className="text-2xl font-semibold tracking-tight">Prompt Library</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Reusable prompts to kick off your agents in one click.
        </p>
      </header>

      <div className="relative mb-8 max-w-md">
        <Search
          size={16}
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <label htmlFor="library-search" className="sr-only">
          Search prompts
        </label>
        <input
          id="library-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search prompts, tags..."
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand-blue/50 focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((prompt) => (
            <GlassCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">
          No prompts match &ldquo;{query}&rdquo;.
        </div>
      )}
    </div>
  )
}
