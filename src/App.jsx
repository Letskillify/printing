import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CommandPalette } from './components/layout/CommandPalette.jsx'
import { CursorGlow } from './components/layout/CursorGlow.jsx'
import { FloatingActions } from './components/layout/FloatingActions.jsx'
import { Footer } from './components/layout/Footer.jsx'
import { Navbar } from './components/layout/Navbar.jsx'
import { useLenis } from './hooks/useLenis'
import { useScrollProgress } from './hooks/useScrollProgress'
import { HomePage } from './pages/HomePage.jsx'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const progress = useScrollProgress()
  useLenis()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    const onKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen(true)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased transition-colors dark:bg-slate-950 dark:text-white">
      <div className="fixed inset-x-0 top-0 z-[80] h-1 bg-slate-200/70 dark:bg-white/10">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400"
          animate={{ scaleX: progress / 100 }}
          transition={{ type: 'spring', stiffness: 120, damping: 25 }}
        />
      </div>
      <CursorGlow />
      <Navbar
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((value) => !value)}
        onOpenCommand={() => setCommandOpen(true)}
      />
      <HomePage />
      <Footer />
      <FloatingActions />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  )
}

export default App
