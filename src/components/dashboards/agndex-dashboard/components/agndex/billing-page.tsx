import {
  ArrowRightIcon,
  BillingIcon,
  CalendarIcon,
  PackageIcon,
  SettingsIcon,
} from './icons'
import { Button } from '@/components/ui/button'
import { resourceRows, subscription, usageStats } from '../../data'

export function BillingPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 p-4 md:gap-11 md:p-8">
      <div className="flex flex-col md:gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and payment details
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BillingIcon />
            <h2 className="font-medium">Subscription</h2>
          </div>
          <Button
            type="button"
            variant="outline"
            className="h-11 gap-2 px-4 font-normal"
          >
            <SettingsIcon />
            Manage Plan
          </Button>
        </div>

        <div className="flex flex-col gap-3 rounded-xl bg-card p-0.5 pb-3 dark:bg-sidebar">
          <div className="flex flex-col gap-3 rounded-lg bg-background p-4 dark:bg-card">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-lg font-medium tracking-tight">
                {subscription.tier}
              </p>
              <span className="text-sm text-info">{subscription.plan}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <CalendarIcon />
                Billing Cycle
              </div>
              <p className="text-sm font-medium tracking-tight">
                {subscription.billingCycle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 px-3">
            <p className="text-sm text-muted-foreground">Pricing & Features</p>
            <button
              type="button"
              className="group flex items-center gap-2 text-sm text-primary"
            >
              View Feature Comparison
              <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <PackageIcon />
            <h2 className="font-medium">Plan Limits & Usage</h2>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {usageStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-6 rounded-xl bg-(--card-hover) p-4 dark:bg-sidebar"
              >
                <div className="flex items-center gap-2 text-sm">
                  <stat.icon className="text-foreground" />
                  <span className="text-muted-foreground opacity-80">
                    {stat.label}
                  </span>
                </div>
                <p className="text-3xl leading-none font-medium">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="custom-scrollbar-x rounded-xl bg-card">
          <table className="w-full min-w-xl text-left">
            <thead>
              <tr className="bg-(--card-hover) text-sm dark:bg-sidebar">
                <th className="px-6 py-3 font-normal">Resource</th>
                <th className="px-6 py-3 font-normal">Included</th>
                <th className="px-6 py-3 font-normal">Overage</th>
              </tr>
            </thead>
            <tbody>
              {resourceRows.map((row) => (
                <tr key={row.resource} className="border-t border-border">
                  <td className="px-6 py-3.5 tracking-tight">{row.resource}</td>
                  <td className="px-6 py-3.5 tracking-tight">{row.included}</td>
                  <td className="px-6 py-3.5 tracking-tight">{row.overage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-muted-foreground">
          Need custom limits?{' '}
          <button
            type="button"
            className="cursor-pointer text-foreground underline underline-offset-2 transition-opacity hover:opacity-60"
          >
            Contact us
          </button>
        </p>
      </div>
    </div>
  )
}
