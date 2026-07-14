'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Plus,
  Calendar,
  BookOpen,
  CircleDollarSign,
  Settings,
  CircleHelp,
  Network,
} from 'lucide-react'
import { recentSessions } from '@/lib/synapse-data'

const primaryNav = [
  { href: '/', label: 'New Chat', icon: Plus },
  { href: '/schedules', label: 'Schedules', icon: Calendar },
  { href: '/library', label: 'Prompt Library', icon: BookOpen },
]

const footerNav = [
  { href: '/pricing', label: 'See plans and pricing', icon: CircleDollarSign },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/help', label: 'Help', icon: CircleHelp },
]

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-[#0c0c13]/90 backdrop-blur-xl">
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-gradient text-white">
          <Network size={16} aria-hidden />
        </span>
        <span className="text-[15px] font-semibold tracking-tight">Synapse</span>
        <span className="rounded-full border border-brand-blue/40 bg-brand-blue/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-brand-blue">
          Beta
        </span>
      </div>

      {/* Primary nav */}
      <nav className="flex flex-col gap-1 px-3" aria-label="Primary">
        {primaryNav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          const isNewChat = href === '/'
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={[
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isNewChat
                  ? 'border border-white/10 bg-white/5 font-medium text-foreground hover:bg-white/10'
                  : active
                    ? 'bg-brand-blue/15 font-medium text-foreground'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground',
              ].join(' ')}
            >
              <Icon size={16} aria-hidden />
              <span className="flex-1">{label}</span>
              {label === 'Schedules' && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-foreground">
                  Pro
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Recent sessions */}
      <div className="mt-6 flex-1 overflow-y-auto px-3">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Recent Sessions
        </p>
        <ul className="flex flex-col gap-0.5">
          {recentSessions.map((s) => (
            <li key={s.id}>
              <Link
                href="/"
                onClick={onNavigate}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: s.color }}
                  aria-hidden
                />
                <span className="truncate">{s.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer nav */}
      <nav className="flex flex-col gap-1 px-3 pb-2" aria-label="Secondary">
        {footerNav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={[
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                active
                  ? 'bg-white/5 text-foreground'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground',
              ].join(' ')}
            >
              <Icon size={16} aria-hidden />
              <span className="flex-1 text-left">{label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center justify-between border-t border-border px-5 py-4">
        <span className="text-sm text-muted-foreground">Free Plan</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-gradient text-xs font-semibold text-white">
          J
        </span>
      </div>
    </aside>
  )
}
