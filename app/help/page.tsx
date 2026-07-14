'use client'

import { useState } from 'react'
import { CircleHelp, ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What can Synapse agents do?',
    a: 'Agents can analyze resumes, screen candidates, generate interview questions, and draft outreach — autonomously across your talent pipeline.',
  },
  {
    q: 'How do schedules work?',
    a: 'Create a schedule to run any agent action on a recurring cadence. Toggle schedules on or off at any time from the Schedules page.',
  },
  {
    q: 'Can I reuse prompts?',
    a: 'Yes. Save and search reusable prompts in the Prompt Library, then launch them in one click.',
  },
  {
    q: 'How do I upgrade my plan?',
    a: 'Visit Plans & Pricing from the sidebar to compare Free, Pro, and Team tiers.',
  },
]

export default function HelpPage() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 md:px-8 md:py-14">
      <header className="mb-8 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white">
          <CircleHelp size={18} aria-hidden />
        </span>
        <h1 className="text-2xl font-semibold tracking-tight">Help &amp; FAQ</h1>
      </header>

      <ul className="flex flex-col gap-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i
          return (
            <li key={faq.q} className="glass overflow-hidden rounded-2xl">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {faq.q}
                <ChevronDown
                  size={16}
                  aria-hidden
                  className={`shrink-0 text-muted-foreground transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              )}
            </li>
          )
        })}
      </ul>

      <div className="glass-strong mt-6 flex flex-col gap-1 rounded-2xl p-5">
        <p className="text-sm font-medium text-foreground">Still need help?</p>
        <p className="text-sm text-muted-foreground">
          Reach our team at{' '}
          <a
            href="mailto:support@synapse.ai"
            className="text-brand-blue underline-offset-4 hover:underline"
          >
            support@synapse.ai
          </a>
          .
        </p>
      </div>
    </div>
  )
}
