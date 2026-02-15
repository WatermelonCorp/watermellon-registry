import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    if (window.location.pathname !== '/') {
      window.location.replace('/')
    }
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-neutral-100">
      <section className="w-full max-w-xl rounded-2xl border border-neutral-800 bg-neutral-900/70 p-10 text-center">
        <p className="text-sm font-medium tracking-[0.3em] text-neutral-400">404</p>
        <h1 className="mt-4 text-3xl font-semibold">Page not found</h1>
        <p className="mt-4 text-neutral-300">
          This registry is not browsable. Use the UI site instead.
        </p>
        <a
          href="https://ui.watermelon.sh"
          className="mt-8 inline-flex rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-20 items-center gap-2"
        >
          Go to <img src="https://ui.watermelon.sh/logo.png" alt="Watermelon UI" className="w-4 h-4" /> ui.watermelon.sh
        </a>
      </section>
    </main>
  )
}

export default App
