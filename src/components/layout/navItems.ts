import type { LucideIcon } from 'lucide-react'
import { LayoutDashboard, Car, CalendarDays, PieChart, Settings } from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/vehicles', label: 'Vehicles', icon: Car },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/expenses', label: 'Expenses', icon: PieChart },
  { to: '/settings', label: 'Settings', icon: Settings },
]
