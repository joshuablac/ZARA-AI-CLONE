'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { prompts } from '@/lib/synapse-data'
import { GlassCard } from './glass-card'

export function PromptLibrary() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
      className="mx-auto w-full max-w-5xl"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-foreground">
          Most Used Prompt Library
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Browse All
          <ArrowRight size={14} aria-hidden />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {prompts.map((prompt) => (
          <GlassCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </motion.section>
  )
}
