'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Plus, Trash2, Zap } from 'lucide-react'
import {
  cadenceOptions,
  initialSchedules,
  quickActions,
  type Cadence,
  type Schedule,
} from '@/lib/synapse-data'

let idCounter = 100

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules)
  const [title, setTitle] = useState('')
  const [action, setAction] = useState(quickActions[0].label)
  const [cadence, setCadence] = useState<Cadence>('Daily')
  const [time, setTime] = useState('09:00')

  const addSchedule = (e: React.FormEvent) => {
    e.preventDefault()
    const name = title.trim()
    if (!name) return
    setSchedules((prev) => [
      {
        id: `sch${++idCounter}`,
        title: name,
        action,
        cadence,
        time,
        enabled: true,
      },
      ...prev,
    ])
    setTitle('')
  }

  const toggle = (id: string) =>
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    )

  const remove = (id: string) =>
    setSchedules((prev) => prev.filter((s) => s.id !== id))

  const activeCount = schedules.filter((s) => s.enabled).length

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 md:px-8 md:py-14">
      {/* Header */}
      <header className="mb-8 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white">
            <Calendar size={18} aria-hidden />
          </span>
          <h1 className="text-2xl font-semibold tracking-tight">Schedules</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Automate recurring agent runs. {activeCount} of {schedules.length}{' '}
          schedules active.
        </p>
      </header>

      {/* Create form */}
      <form
        onSubmit={addSchedule}
        className="glass-strong mb-8 flex flex-col gap-4 rounded-2xl p-5"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sch-title" className="text-xs font-medium text-muted-foreground">
              Schedule name
            </label>
            <input
              id="sch-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Daily candidate digest"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand-blue/50 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sch-action" className="text-xs font-medium text-muted-foreground">
              Agent action
            </label>
            <select
              id="sch-action"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-brand-blue/50 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {quickActions.map((a) => (
                <option key={a.id} value={a.label} className="bg-[#0c0c13]">
                  {a.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sch-cadence" className="text-xs font-medium text-muted-foreground">
              Cadence
            </label>
            <select
              id="sch-cadence"
              value={cadence}
              onChange={(e) => setCadence(e.target.value as Cadence)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-brand-blue/50 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {cadenceOptions.map((c) => (
                <option key={c} value={c} className="bg-[#0c0c13]">
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sch-time" className="text-xs font-medium text-muted-foreground">
              Run time
            </label>
            <input
              id="sch-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-brand-blue/50 focus:outline-none focus:ring-2 focus:ring-ring [color-scheme:dark]"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 self-start rounded-lg bg-brand-gradient px-4 py-2 text-sm font-medium text-white shadow-lg shadow-brand-blue/30 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Plus size={16} aria-hidden />
          Add schedule
        </button>
      </form>

      {/* List */}
      <ul className="flex flex-col gap-3">
        <AnimatePresence initial={false}>
          {schedules.map((s) => (
            <motion.li
              key={s.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="glass flex items-center gap-4 rounded-2xl p-4"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  s.enabled
                    ? 'bg-brand-blue/15 text-brand-blue'
                    : 'bg-white/5 text-muted-foreground'
                }`}
              >
                <Zap size={18} aria-hidden />
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {s.title}
                </p>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span>{s.action}</span>
                  <span aria-hidden>•</span>
                  <span>{s.cadence}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} aria-hidden />
                    {s.time}
                  </span>
                </div>
              </div>

              {/* Toggle */}
              <button
                type="button"
                role="switch"
                aria-checked={s.enabled}
                aria-label={`${s.enabled ? 'Disable' : 'Enable'} ${s.title}`}
                onClick={() => toggle(s.id)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  s.enabled ? 'bg-brand-blue' : 'bg-white/15'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    s.enabled ? 'translate-x-[22px]' : 'translate-x-0.5'
                  }`}
                />
              </button>

              <button
                type="button"
                aria-label={`Delete ${s.title}`}
                onClick={() => remove(s.id)}
                className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/5 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Trash2 size={16} aria-hidden />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>

        {schedules.length === 0 && (
          <li className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">
            No schedules yet. Create one above to automate your agent.
          </li>
        )}
      </ul>
    </div>
  )
}
