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
        <label htmlFor={inputId} className="text-sm font-medium text-navy-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={clsx(
          'h-11 rounded-xl border bg-white px-3.5 text-sm text-navy-900 placeholder:text-mist-500 outline-none transition-colors focus:border-steel-500 focus:ring-4 focus:ring-steel-100',
          error ? 'border-red-400' : 'border-mist-300',
          className,
        )}
        {...props}
      />
      {hint && !error && <span className="text-xs text-mist-600">{hint}</span>}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
})
