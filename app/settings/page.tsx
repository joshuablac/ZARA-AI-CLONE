'use client'

import { useState } from 'react'
import { Settings as SettingsIcon } from 'lucide-react'

type ToggleKey = 'emailUpdates' | 'autoRun' | 'compactMode'

export default function SettingsPage() {
  const [name, setName] = useState('Jordan Lee')
  const [email, setEmail] = useState('jordan@synapse.ai')
  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    emailUpdates: true,
    autoRun: false,
    compactMode: true,
  })
  const [saved, setSaved] = useState(false)

  const toggle = (key: ToggleKey) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }))

  const toggleRows: { key: ToggleKey; label: string; desc: string }[] = [
    { key: 'emailUpdates', label: 'Email updates', desc: 'Get notified when agents finish runs.' },
    { key: 'autoRun', label: 'Auto-run schedules', desc: 'Start scheduled agents without confirmation.' },
    { key: 'compactMode', label: 'Compact mode', desc: 'Denser layout across the workspace.' },
  ]

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 md:px-8 md:py-14">
      <header className="mb-8 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white">
          <SettingsIcon size={18} aria-hidden />
        </span>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSaved(true)
          setTimeout(() => setSaved(false), 2000)
        }}
        className="flex flex-col gap-6"
      >
        <section className="glass-strong flex flex-col gap-4 rounded-2xl p-5">
          <h2 className="text-sm font-medium text-foreground">Profile</h2>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-medium text-muted-foreground">
              Display name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-brand-blue/50 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-brand-blue/50 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </section>

        <section className="glass-strong flex flex-col gap-3 rounded-2xl p-5">
          <h2 className="text-sm font-medium text-foreground">Preferences</h2>
          {toggleRows.map((row) => (
            <div key={row.key} className="flex items-center justify-between gap-4 py-1.5">
              <div className="min-w-0">
                <p className="text-sm text-foreground">{row.label}</p>
                <p className="text-xs text-muted-foreground">{row.desc}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={toggles[row.key]}
                aria-label={row.label}
                onClick={() => toggle(row.key)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  toggles[row.key] ? 'bg-brand-blue' : 'bg-white/15'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    toggles[row.key] ? 'translate-x-[22px]' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </section>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-lg bg-brand-gradient px-4 py-2 text-sm font-medium text-white shadow-lg shadow-brand-blue/30 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Save changes
          </button>
          {saved && (
            <span className="text-sm text-brand-blue" role="status">
              Saved
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
