'use client'

import { useState } from 'react'
import { TopNav } from '@/components/top-nav'
import { HeroInput } from '@/components/hero-input'
import { PromptLibrary } from '@/components/prompt-library'
import { quickActions } from '@/lib/synapse-data'

export default function Page() {
  const [activeId, setActiveId] = useState(quickActions[0].id)
  const active = quickActions.find((a) => a.id === activeId) ?? quickActions[0]

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 py-10 md:px-8 md:py-14">
      <div className="flex justify-center">
        <TopNav activeId={activeId} onSelect={setActiveId} />
      </div>
      <HeroInput placeholder={active.prompt} />
      <PromptLibrary />
    </div>
  )
}
