'use client'

import { motion } from 'framer-motion'
import { Bookmark, Copy } from 'lucide-react'
import type { Prompt } from '@/lib/synapse-data'

export function GlassCard({ prompt }: { prompt: Prompt }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="glass group relative flex flex-col gap-4 rounded-2xl p-5 transition-colors hover:border-brand-purple/40"
    >
      {/* hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow:
            '0 0 0 1px rgba(168,85,247,0.25), 0 12px 40px -12px rgba(59,130,246,0.4)',
        }}
      />

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-medium leading-snug text-foreground">
          {prompt.title}
        </h3>
        <div className="flex shrink-0 items-center gap-1 text-muted-foreground">
          <button
            type="button"
            aria-label={`Bookmark ${prompt.title}`}
            className="rounded-md p-1 transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Bookmark size={15} aria-hidden />
          </button>
          <button
            type="button"
            aria-label={`Copy ${prompt.title}`}
            className="rounded-md p-1 transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Copy size={15} aria-hidden />
          </button>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {prompt.description}
      </p>

      <div className="mt-auto flex items-center justify-between pt-2">
        <div className="flex flex-wrap gap-2">
          {prompt.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">
          {prompt.uses} uses
        </span>
      </div>
    </motion.article>
  )
}
