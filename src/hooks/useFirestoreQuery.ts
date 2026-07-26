import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useToastStore } from '@/store/toastStore'

type Subscribe<T> = (
  callback: (items: T[]) => void,
  onError: (error: Error) => void,
) => () => void

/**
 * Bridges a Firestore onSnapshot subscription into the TanStack Query cache.
 * The query never fetches on its own (enabled: false) — every update comes
 * from the live subscription via queryClient.setQueryData, so `data` stays
 * in sync in real time per PRD NFR.
 */
export function useFirestoreQuery<T>(queryKey: readonly unknown[], subscribe: Subscribe<T> | null) {
  const queryClient = useQueryClient()
  const pushToast = useToastStore((s) => s.push)
  const key = [...queryKey]
  const keySignature = JSON.stringify(key)

  const query = useQuery<T[]>({
    queryKey: key,
    queryFn: () => Promise.resolve([] as T[]),
    enabled: false,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    if (!subscribe) return
    const unsubscribe = subscribe(
      (items) => queryClient.setQueryData(key, items),
      (error) => {
        // Resolve to empty instead of leaving `data` undefined forever, so the UI
        // falls through to an empty state instead of an infinite skeleton.
        queryClient.setQueryData(key, [])
        pushToast(error.message || 'Failed to load data', 'error')
      },
    )
    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keySignature, Boolean(subscribe)])

  return {
    data: query.data ?? [],
    isLoading: query.data === undefined && Boolean(subscribe),
  }
}
