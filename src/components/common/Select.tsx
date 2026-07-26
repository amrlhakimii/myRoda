import { type SelectHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, className, id, children, ...props },
  ref,
) {
  const selectId = id ?? props.name
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-mist-300">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          className={clsx(
            'h-11 w-full appearance-none rounded-xl border bg-navy-950/60 px-3.5 pr-9 text-sm text-mist-50 outline-none transition-colors focus:border-steel-400 focus:ring-4 focus:ring-steel-500/15',
            error ? 'border-red-400/60' : 'border-white/10',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-mist-500"
        />
      </div>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  )
})
