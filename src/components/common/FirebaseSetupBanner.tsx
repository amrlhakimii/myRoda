import { AlertTriangle } from 'lucide-react'

export function FirebaseSetupBanner() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3.5 text-left">
      <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
      <div className="text-sm text-amber-800">
        <p className="font-semibold">Firebase isn't connected yet</p>
        <p className="mt-0.5 text-amber-700">
          Add your project keys to a <code className="rounded bg-amber-100 px-1 py-0.5">.env</code> file
          (see <code className="rounded bg-amber-100 px-1 py-0.5">.env.example</code>) and restart the dev
          server to enable sign in.
        </p>
      </div>
    </div>
  )
}
