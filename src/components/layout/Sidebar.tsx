import { NavLink } from 'react-router-dom'
import { clsx } from 'clsx'
import { Logo } from '@/components/common/Logo'
import { NAV_ITEMS } from './navItems'

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-white/8 bg-navy-900 px-4 py-6 md:flex">
      <div className="px-2">
        <Logo variant="full" inverted size={34} />
      </div>
      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-steel-500/15 text-steel-200 shadow-[inset_0_0_0_1px_rgba(101,148,177,0.2)]'
                  : 'text-mist-400 hover:bg-white/5 hover:text-mist-100',
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3 text-xs text-mist-400">
        <p className="font-semibold text-mist-200">myRoda v1.0</p>
        <p className="mt-0.5">Track every service, every fuel, every journey.</p>
      </div>
    </aside>
  )
}
