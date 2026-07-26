import { NavLink } from 'react-router-dom'
import { clsx } from 'clsx'
import { NAV_ITEMS } from './navItems'

export function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/8 bg-navy-900/90 px-1 py-1.5 shadow-soft-lg backdrop-blur-xl"
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto flex w-full max-w-md">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-medium',
                isActive ? 'text-steel-300' : 'text-mist-500',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
