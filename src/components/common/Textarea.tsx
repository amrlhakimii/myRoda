import { type TextareaHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, className, id, ...props },
  ref,
) {
  const areaId = id ?? props.name
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={areaId} className="text-sm font-medium text-mist-300">
          {label}
        </label>
      )}
      <textarea
        id={areaId}
        ref={ref}
        rows={4}
        className={clsx(
          'resize-none rounded-xl border bg-navy-950/60 px-3.5 py-3 text-sm text-mist-50 placeholder:text-mist-600 outline-none transition-colors focus:border-steel-400 focus:ring-4 focus:ring-steel-500/15',
          error ? 'border-red-400/60' : 'border-white/10',
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  )
})
