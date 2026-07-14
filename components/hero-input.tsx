'use client'

import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown, Paperclip, Send, Loader2, ExternalLink, X } from 'lucide-react'

type SearchSource = { url: string; title: string }

export function HeroInput({
  placeholder = 'Share job description or resume to be screened by your agent...',
}: {
  placeholder?: string
}) {
  const [value, setValue] = useState('')
  const [webSearch, setWebSearch] = useState(false)
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState('')
  const [sources, setSources] = useState<SearchSource[]>([])
  const [error, setError] = useState('')
  const [searchedQuery, setSearchedQuery] = useState('')

  async function runSearch(query: string) {
    setLoading(true)
    setError('')
    setAnswer('')
    setSources([])
    setSearchedQuery(query)
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Search failed.')
      setAnswer(data.text ?? '')
      setSources(Array.isArray(data.sources) ? data.sources : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed.')
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const query = value.trim()
    if (!query || loading) return
    if (webSearch) {
      runSearch(query)
    }
  }

  function clearResults() {
    setAnswer('')
    setSources([])
    setError('')
    setSearchedQuery('')
  }

  const showPanel = loading || !!answer || !!error

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative flex flex-col items-center"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            'radial-gradient(closest-side, rgba(59,130,246,0.35), rgba(168,85,247,0.18), transparent)',
        }}
      />

      <h1 className="relative max-w-2xl text-balance text-center text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
        Run Synapse AI, autonomous agents that
        <br className="hidden sm:block" /> automate your{' '}
        <span className="text-gradient italic">Entire Talent Pipeline..</span>
      </h1>

      {/* Command card */}
      <form
        onSubmit={handleSubmit}
        className="glass-strong relative mt-8 w-full max-w-3xl rounded-2xl p-4 shadow-2xl shadow-black/40"
      >
        <label htmlFor="agent-input" className="sr-only">
          {webSearch ? 'Search the web with Synapse' : 'Share a document with your agent'}
        </label>
        <input
          id="agent-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            webSearch ? 'Search the web — e.g. "2026 salary bands for ML engineers"' : placeholder
          }
          className="w-full bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setWebSearch((v) => !v)}
              aria-pressed={webSearch}
              aria-label="Toggle web search"
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                webSearch
                  ? 'border-brand-blue/40 bg-brand-blue/15 text-foreground'
                  : 'border-white/10 text-muted-foreground hover:text-foreground'
              }`}
            >
              <Globe size={16} aria-hidden />
              Web search
            </button>
            <button
              type="button"
              className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex"
            >
              <span className="text-base leading-none">+</span>
              Connect your accounts
              <ChevronDown size={14} aria-hidden className="text-muted-foreground" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Attach a file"
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Paperclip size={16} aria-hidden />
            </button>
            <button
              type="submit"
              disabled={loading || !value.trim()}
              aria-label={webSearch ? 'Run web search' : 'Send to agent'}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg shadow-brand-blue/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={16} aria-hidden className="animate-spin" />
              ) : (
                <Send size={16} aria-hidden />
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Web search results */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glass-strong relative mt-4 w-full max-w-3xl rounded-2xl p-5 text-left shadow-2xl shadow-black/40"
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Globe size={16} aria-hidden className="text-brand-blue" />
                <span className="truncate">
                  {loading ? 'Searching the web…' : `Results for “${searchedQuery}”`}
                </span>
              </div>
              {!loading && (
                <button
                  type="button"
                  onClick={clearResults}
                  aria-label="Dismiss results"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X size={15} aria-hidden />
                </button>
              )}
            </div>

            {loading && (
              <div className="space-y-2" aria-hidden>
                <div className="h-3 w-4/5 animate-pulse rounded bg-white/10" />
                <div className="h-3 w-full animate-pulse rounded bg-white/10" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-white/10" />
              </div>
            )}

            {error && !loading && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            {answer && !loading && (
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                {answer}
              </p>
            )}

            {sources.length > 0 && !loading && (
              <div className="mt-4 border-t border-white/10 pt-3">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Sources
                </p>
                <ul className="flex flex-col gap-1.5">
                  {sources.map((s, i) => (
                    <li key={`${s.url}-${i}`}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex max-w-full items-center gap-1.5 text-sm text-brand-blue transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <ExternalLink size={13} aria-hidden className="shrink-0" />
                        <span className="truncate">{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
