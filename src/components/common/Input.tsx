import { type InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, className, id, ...props },
  ref,
) {
  const inputId = id ?? props.name
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-mist-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={clsx(
          'h-11 rounded-xl border bg-navy-950/60 px-3.5 text-sm text-mist-50 placeholder:text-mist-600 outline-none transition-colors focus:border-steel-400 focus:ring-4 focus:ring-steel-500/15',
          error ? 'border-red-400/60' : 'border-white/10',
          className,
        )}
        {...props}
      />
      {hint && !error && <span className="text-xs text-mist-500">{hint}</span>}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  )
})
