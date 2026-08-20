import type { ComponentType, SVGProps } from 'react'
import {
  BillingIcon,
  DiscordIcon,
  DocsIcon,
  HomeIcon,
  IndexesIcon,
  KeyIcon,
  LogoutIcon,
  ProjectIcon,
  SettingsIcon,
} from './components/agndex/icons'
export type NavIcon = ComponentType<SVGProps<SVGSVGElement>>

export type NavigationItem = {
  name: string
  href: string
  icon: NavIcon
  external?: boolean
}

export type NavigationGroup = {
  label: string
  items: NavigationItem[]
}

export const navigationGroups: NavigationGroup[] = [
  {
    label: 'General',
    items: [{ name: 'Dashboard', href: '/', icon: HomeIcon }],
  },
  {
    label: 'Settings',
    items: [
      { name: 'API Keys', href: '/api-keys', icon: KeyIcon },
      { name: 'Billing', href: '/billing', icon: BillingIcon },
    ],
  },
  {
    label: 'Support',
    items: [
      { name: 'Docs', href: '/docs', icon: DocsIcon },
      {
        name: 'Discord',
        href: 'https://discord.com',
        icon: DiscordIcon,
        external: true,
      },
    ],
  },
]

export const footerNavigation: NavigationItem[] = [
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
]

export const logoutItem = {
  name: 'Logout',
  icon: LogoutIcon,
}

export const currentUser = {
  name: 'Vansh Patel',
  email: 'vansh@agndex.com',
  avatar:
    'https://api.dicebear.com/9.x/avataaars/svg?seed=Vansh%20Patel',
  initials: 'VP',
}

export const projects = [
  { name: 'Default Project', id: 'default' },
  { name: 'Staging', id: 'staging' },
  { name: 'Production', id: 'production' },
] as const

export type Project = (typeof projects)[number]

export const indexes = [
  {
    id: '1',
    name: 'demo-customer_faqs',
    updatedAt: '3/16/2026',
    docs: 55,
  },
  {
    id: '2',
    name: 'demo-customer_faqs',
    updatedAt: '3/16/2026',
    docs: 55,
  },
]

export const projectCredentials = {
  projectId: 'c101d38e-0555-421b-be6d-5699ed27c9aa',
  projectKey: 'sk_live_agndex_demo_secret_key_12345',
}

export const projectSummary = {
  tier: 'Developer',
  indexesUsed: 1,
  indexesLimit: 3,
}

export const subscription = {
  tier: 'Developer Tier',
  plan: 'Free',
  billingCycle: 'Mar 1, 2026 - Mar 31,2026',
}

export const usageStats = [
  { label: 'Projects', value: '12,847', icon: ProjectIcon },
  { label: 'Indexes per Project', value: '140', icon: IndexesIcon },
  { label: 'Items per Index', value: '47', icon: ProjectIcon },
] as const

export const resourceRows = [
  { resource: 'Storage', included: '500 MB cap', overage: '- -' },
  { resource: 'Egress', included: '10 GB cap', overage: '- -' },
  { resource: 'Ingest', included: '50 MB cap', overage: '- -' },
  { resource: 'Control API ops', included: '1K / month', overage: '- -' },
  { resource: 'Cloud query calls', included: '1K / month', overage: '- -' },
] as const
