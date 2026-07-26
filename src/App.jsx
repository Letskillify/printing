import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CommandPalette } from './Components/layout/CommandPalette'
import { CursorGlow } from './Components/layout/CursorGlow'
import { FloatingActions } from './Components/layout/FloatingActions'
import { Footer } from './Components/layout/Footer'
import { Navbar } from './Components/layout/Navbar'
import { useLenis } from './hooks/useLenis'
import { useScrollProgress } from './hooks/useScrollProgress'
import { HomePage } from './pages/HomePage'

// Sub pages imports
import { ProductsPage } from './pages/ProductsPage'
import { ServicesPage } from './pages/ServicesPage'
import { TemplatesPage } from './pages/TemplatesPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { TrackOrderPage } from './pages/TrackOrderPage'
import { HelpCenterPage } from './pages/HelpCenterPage'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [cartCount, setCartCount] = useState(0)
  const [commandOpen, setCommandOpen] = useState(false)
  const progress = useScrollProgress()
  useLenis()

  // Reset scroll whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

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

  // Page switcher renderer helper
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />
      case 'products':
        return <ProductsPage onAddToCart={() => setCartCount((c) => c + 1)} />
      case 'services':
        return <ServicesPage />
      case 'templates':
        return <TemplatesPage />
      case 'about':
        return <AboutPage />
      case 'contact':
        return <ContactPage />
      case 'track':
        return <TrackOrderPage />
      case 'help':
        return <HelpCenterPage />
      default:
        return <HomePage setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      {/* Scroll progress indicator */}
      <div className="fixed inset-x-0 top-0 z-[100] h-[3px] bg-slate-200/50">
        <motion.div
          className="h-full origin-left bg-[#FF5A1F]"
          animate={{ scaleX: progress / 100 }}
          transition={{ type: 'spring', stiffness: 120, damping: 25 }}
        />
      </div>
      <CursorGlow />
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartCount}
      />
      
      {/* Switcher Main */}
      {renderCurrentPage()}
      
      <Footer setCurrentPage={setCurrentPage} />
      <FloatingActions />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  )
}

export default App
