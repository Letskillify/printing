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
import { BlogPage } from './pages/BlogPage'
import { CartPage } from './pages/CartPage'
import { CustomQuotePage } from './pages/CustomQuotePage'
import { AdminApp } from './admin/AdminApp'

import { AuthProvider } from './context/AuthContext'
import { AuthModal } from './Components/auth/AuthModal'

function AppContent() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname.toLowerCase()
    return (path === '/admin' || path.startsWith('/admin/')) ? 'admin' : 'home'
  })
  const [commandOpen, setCommandOpen] = useState(false)
  const progress = useScrollProgress()
  useLenis()

  // Sync state with URL pathname & browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase()
      if (path === '/admin' || path.startsWith('/admin/')) {
        setCurrentPage('admin')
      } else {
        setCurrentPage('home')
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Sync URL when currentPage state changes
  useEffect(() => {
    window.scrollTo(0, 0)
    if (currentPage === 'admin') {
      if (window.location.pathname !== '/admin') {
        window.history.pushState(null, '', '/admin')
      }
    } else {
      if (window.location.pathname === '/admin') {
        window.history.pushState(null, '', '/')
      }
    }
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

  if (currentPage === 'admin') {
    return <AdminApp onSwitchToWebsite={() => setCurrentPage('home')} />
  }

  // Page switcher renderer helper
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />
      case 'products':
        return <ProductsPage onNavigateCart={() => setCurrentPage('cart')} />
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
      case 'blog':
        return <BlogPage />
      case 'cart':
        return <CartPage setCurrentPage={setCurrentPage} />
      case 'quote':
        return <CustomQuotePage />
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
      />
      
      {/* Switcher Main */}
      {renderCurrentPage()}
      
      <Footer setCurrentPage={setCurrentPage} />
      <FloatingActions />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      <AuthModal />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
