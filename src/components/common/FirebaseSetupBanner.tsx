import { AlertTriangle } from 'lucide-react'

export function FirebaseSetupBanner() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3.5 text-left backdrop-blur-xl">
      <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-400" />
      <div className="text-sm text-amber-200">
        <p className="font-semibold">Firebase isn't connected yet</p>
        <p className="mt-0.5 text-amber-300/80">
          Add your project keys to a <code className="rounded bg-amber-500/15 px-1 py-0.5">.env</code> file
          (see <code className="rounded bg-amber-500/15 px-1 py-0.5">.env.example</code>) and restart the
          dev server to enable sign in.
        </p>
      </div>
    </div>
  )
}
