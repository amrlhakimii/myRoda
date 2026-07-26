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
        <label htmlFor={areaId} className="text-sm font-medium text-navy-700">
          {label}
        </label>
      )}
      <textarea
        id={areaId}
        ref={ref}
        rows={4}
        className={clsx(
          'resize-none rounded-xl border bg-white px-3.5 py-3 text-sm text-navy-900 placeholder:text-mist-500 outline-none transition-colors focus:border-steel-500 focus:ring-4 focus:ring-steel-100',
          error ? 'border-red-400' : 'border-mist-300',
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
})
