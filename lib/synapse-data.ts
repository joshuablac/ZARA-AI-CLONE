export type Session = {
  id: string
  title: string
  color: string
}

export type Prompt = {
  id: string
  title: string
  description: string
  tags: string[]
  uses: number
}

export type QuickAction = {
  id: string
  label: string
  prompt: string
}

export type Cadence = 'Daily' | 'Weekdays' | 'Weekly' | 'Monthly'

export type Schedule = {
  id: string
  title: string
  action: string
  cadence: Cadence
  time: string
  enabled: boolean
}

export const recentSessions: Session[] = [
  { id: 's1', title: 'Screen 5 SWE candidates', color: '#3b82f6' },
  { id: 's2', title: 'Resume match — backend role', color: '#a855f7' },
  { id: 's3', title: 'Interview prep — product', color: '#22d3ee' },
  { id: 's4', title: 'Cover letter — Stripe', color: '#8b5cf6' },
]

export const quickActions: QuickAction[] = [
  {
    id: 'qa1',
    label: 'Analyze Resume',
    prompt: 'Analyze this resume against the job description and score the fit...',
  },
  {
    id: 'qa2',
    label: 'Screen Candidate',
    prompt: 'Screen this candidate and summarize strengths, risks, and next steps...',
  },
  {
    id: 'qa3',
    label: 'Generate Questions',
    prompt: 'Generate tailored technical interview questions from this resume...',
  },
  {
    id: 'qa4',
    label: 'Draft Outreach',
    prompt: 'Draft a personalized recruiter outreach email for this candidate...',
  },
  {
    id: 'qa5',
    label: 'AI Guidance',
    prompt: 'Give me hiring guidance and a recommended pipeline for this role...',
  },
]

export const initialSchedules: Schedule[] = [
  {
    id: 'sch1',
    title: 'Daily candidate digest',
    action: 'Screen Candidate',
    cadence: 'Weekdays',
    time: '09:00',
    enabled: true,
  },
  {
    id: 'sch2',
    title: 'Weekly pipeline report',
    action: 'AI Guidance',
    cadence: 'Weekly',
    time: '08:30',
    enabled: true,
  },
  {
    id: 'sch3',
    title: 'Outreach follow-ups',
    action: 'Draft Outreach',
    cadence: 'Daily',
    time: '14:00',
    enabled: false,
  },
]

export const cadenceOptions: Cadence[] = ['Daily', 'Weekdays', 'Weekly', 'Monthly']

export const prompts: Prompt[] = [
  {
    id: 'p1',
    title: 'Create a resume',
    description:
      'Create a resume based on the JD provided. Keep the summary short and focus on key achievements.',
    tags: ['resume', 'job application'],
    uses: 128,
  },
  {
    id: 'p2',
    title: 'Identify Skill Gaps for Target Role',
    description:
      'I want to transition into [role]. Based on my background, identify skill gaps and suggest resources.',
    tags: ['career', 'skills'],
    uses: 94,
  },
  {
    id: 'p3',
    title: 'Career Post Advice',
    description:
      'I am a [position] with [experience]. Help me write a professional LinkedIn post about [topic].',
    tags: ['linkedin', 'content'],
    uses: 94,
  },
  {
    id: 'p4',
    title: 'Analyze Resume Fit',
    description:
      'Evaluate a resume against the job requirements and return a candidate fit score with reasoning.',
    tags: ['screening', 'analysis'],
    uses: 76,
  },
  {
    id: 'p5',
    title: 'Generate Interview Questions',
    description:
      'Create tailored technical and behavioral interview questions from the attached resume.',
    tags: ['interview', 'questions'],
    uses: 61,
  },
  {
    id: 'p6',
    title: 'Draft Outreach Email',
    description:
      'Compose a warm, personalized recruiter outreach email referencing the candidate background.',
    tags: ['outreach', 'email'],
    uses: 58,
  },
]
