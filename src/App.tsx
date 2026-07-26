import { useEffect } from 'react'
import { AppRouter } from '@/routes/AppRouter'
import { ToastViewport } from '@/components/common/ToastViewport'
import { initAuthListener } from '@/store/authStore'

function App() {
  useEffect(() => {
    initAuthListener()
  }, [])

  return (
    <>
      <AppRouter />
      <ToastViewport />
    </>
  )
}

export default App
