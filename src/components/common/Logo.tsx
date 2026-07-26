import { clsx } from 'clsx'

interface LogoProps {
  /** 'full' renders the icon + wordmark lockup, 'mark' renders the icon alone. */
  variant?: 'full' | 'mark'
  /** Use on dark/navy surfaces (e.g. the sidebar) — drops the tile background and switches to light ink. */
  inverted?: boolean
  /** Pixel size of the icon tile / glyph. */
  size?: number
  className?: string
}

export function Logo({ variant = 'full', inverted = false, size = 36, className }: LogoProps) {
  return (
    <span className={clsx('inline-flex items-center gap-2.5', className)}>
      <GaugeMark size={size} inverted={inverted} />
      {variant === 'full' && (
        <span
          className={clsx(
            'font-extrabold tracking-tight leading-none',
            inverted ? 'text-mist-50' : 'text-navy-800',
          )}
          style={{ fontSize: size * 0.62 }}
        >
          my
          <span className={inverted ? 'text-blush-300' : 'text-steel-500'}>Roda</span>
        </span>
      )}
    </span>
  )
}

function GaugeMark({ size, inverted }: { size: number; inverted: boolean }) {
  const r = size * 0.31
  const c = 2 * Math.PI * r
  const dashOn = c * 0.75
  const dashOff = c * 0.25
  const cx = size / 2
  const cy = size / 2
  const needleTip = {
    x: cx + r * 0.78,
    y: cy - r * 0.78,
  }

  if (inverted) {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="currentColor"
          className="text-mist-100/70"
          strokeWidth={size * 0.09}
          strokeLinecap="round"
          strokeDasharray={`${dashOn} ${dashOff}`}
          transform={`rotate(135 ${cx} ${cy})`}
        />
        <line
          x1={cx}
          y1={cy}
          x2={needleTip.x}
          y2={needleTip.y}
          stroke="#DDAED3"
          strokeWidth={size * 0.065}
          strokeLinecap="round"
        />
        <circle cx={needleTip.x} cy={needleTip.y} r={size * 0.05} fill="#DDAED3" />
        <circle cx={cx} cy={cy} r={size * 0.09} fill="#F7F7F7" />
      </svg>
    )
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      <rect width={size} height={size} rx={size * 0.28} fill="#213C51" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke="#6594B1"
        strokeWidth={size * 0.09}
        strokeLinecap="round"
        strokeDasharray={`${dashOn} ${dashOff}`}
        transform={`rotate(135 ${cx} ${cy})`}
      />
      <line
        x1={cx}
        y1={cy}
        x2={needleTip.x}
        y2={needleTip.y}
        stroke="#DDAED3"
        strokeWidth={size * 0.065}
        strokeLinecap="round"
      />
      <circle cx={needleTip.x} cy={needleTip.y} r={size * 0.05} fill="#DDAED3" />
      <circle cx={cx} cy={cy} r={size * 0.09} fill="#EEEEEE" />
    </svg>
  )
}
