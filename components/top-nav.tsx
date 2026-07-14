'use client'

import { motion } from 'framer-motion'
import { quickActions } from '@/lib/synapse-data'

export function TopNav({
  activeId,
  onSelect,
}: {
  activeId: string
  onSelect: (id: string) => void
}) {
  return (
    <nav
      aria-label="Quick actions"
      className="flex items-center gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-xl"
    >
      {quickActions.map((action) => {
        const active = action.id === activeId
        return (
          <button
            key={action.id}
            type="button"
            onClick={() => onSelect(action.id)}
            aria-pressed={active}
            className={`relative shrink-0 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              active ? 'text-white' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {active && (
              <motion.span
                layoutId="nav-pill"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-xl bg-brand-gradient shadow-lg shadow-brand-blue/30"
                aria-hidden
              />
            )}
            <span className="relative z-10">{action.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
