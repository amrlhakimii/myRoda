import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { Button } from '@/components/common/Button'

export function NotFoundPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-mist-100 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-700 text-white">
        <Compass size={26} />
      </div>
      <h1 className="text-2xl font-extrabold text-navy-900">Page not found</h1>
      <p className="max-w-sm text-sm text-navy-500">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/dashboard">
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  )
}
