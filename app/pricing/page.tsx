import { CircleDollarSign, Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    features: ['5 agent runs / day', 'Prompt library', 'Community support'],
    cta: 'Current plan',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    features: [
      'Unlimited agent runs',
      'Automated schedules',
      'Priority models',
      'Email support',
    ],
    cta: 'Upgrade to Pro',
    highlight: true,
  },
  {
    name: 'Team',
    price: '$99',
    period: '/mo',
    features: ['Everything in Pro', 'Shared workspaces', 'Roles & permissions', 'SSO'],
    cta: 'Contact sales',
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 md:px-8 md:py-14">
      <header className="mb-8 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white">
            <CircleDollarSign size={18} aria-hidden />
          </span>
          <h1 className="text-2xl font-semibold tracking-tight">Plans &amp; Pricing</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Scale your talent pipeline automation as you grow.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`glass flex flex-col gap-5 rounded-2xl p-6 ${
              plan.highlight ? 'border-brand-purple/50 ring-1 ring-brand-purple/40' : ''
            }`}
          >
            <div>
              <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>
              <p className="mt-1 flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </p>
            </div>

            <ul className="flex flex-1 flex-col gap-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                  <Check size={15} className="shrink-0 text-brand-blue" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                plan.highlight
                  ? 'bg-brand-gradient text-white shadow-lg shadow-brand-blue/30 hover:scale-[1.02]'
                  : 'border border-white/10 bg-white/5 text-foreground hover:bg-white/10'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
