export function FloatingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="animate-drift-a absolute -top-32 -right-24 h-[42rem] w-[42rem] rounded-full opacity-60 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(101,148,177,0.22) 0%, transparent 68%)',
        }}
      />
      <div
        className="animate-drift-b absolute top-1/3 -left-32 h-[36rem] w-[36rem] rounded-full opacity-50 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(221,174,211,0.16) 0%, transparent 68%)',
        }}
      />
      <div
        className="animate-drift-c absolute -bottom-40 right-1/4 h-[34rem] w-[34rem] rounded-full opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(101,148,177,0.12) 0%, transparent 68%)',
        }}
      />
    </div>
  )
}
