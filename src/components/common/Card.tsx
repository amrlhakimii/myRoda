import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('glass-surface rounded-2xl shadow-soft', className)}
      {...props}
    />
  )
}
