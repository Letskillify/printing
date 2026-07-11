import { useEffect, useState } from 'react'
import { FiMenu, FiMoon, FiSearch, FiShoppingBag, FiSun, FiUser, FiX } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems, megaMenu } from '../../data/siteData'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function Navbar({ darkMode, onToggleDark, onOpenCommand }) {
  const [open, setOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', open)
    return () => document.body.classList.remove('overflow-hidden')
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/50 bg-white/75 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/75">
      <Container>
        <nav className="flex h-20 items-center justify-between gap-4" aria-label="Main navigation">
          <a href="#home" className="group flex items-center gap-3" aria-label="PrismPrint home">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white shadow-xl shadow-blue-500/20 dark:bg-white dark:text-slate-950">
              PP
            </span>
            <span>
              <span className="block text-base font-extrabold tracking-tight text-slate-950 dark:text-white">PrismPrint</span>
              <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">Enterprise print studio</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => setMegaOpen(item.label === 'Products')}
                className="nav-link"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <button className="icon-btn" aria-label="Search" onClick={onOpenCommand}>
              <FiSearch />
            </button>
            <button className="icon-btn" aria-label="Cart">
              <FiShoppingBag />
            </button>
            <button className="icon-btn" aria-label="Account">
              <FiUser />
            </button>
            <button className="icon-btn" aria-label="Toggle theme" onClick={onToggleDark}>
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
            <Button className="ml-2" onClick={() => document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' })}>
              Get Quote
            </Button>
          </div>

          <button className="icon-btn lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
            <FiMenu />
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {megaOpen && (
          <motion.div
            className="hidden border-y border-slate-200/70 bg-white/90 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90 lg:block"
            onMouseLeave={() => setMegaOpen(false)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Container className="grid grid-cols-6 gap-3 py-5">
              {megaMenu.map((item) => (
                <a key={item} href="#products" className="rounded-3xl border border-slate-200/70 bg-slate-50/80 p-4 text-sm font-semibold text-slate-700 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                  {item}
                </a>
              ))}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="ml-auto h-full w-full max-w-sm bg-white p-5 shadow-2xl dark:bg-slate-950"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-extrabold text-slate-950 dark:text-white">Menu</span>
                <button className="icon-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
                  <FiX />
                </button>
              </div>
              <div className="mt-8 grid gap-3">
                {[...navItems, { label: 'Search', href: '#search' }].map((item) => (
                  <a key={item.label} href={item.href} className="rounded-3xl border border-slate-200 p-4 font-semibold text-slate-800 dark:border-white/10 dark:text-slate-100" onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                ))}
              </div>
              <Button className="mt-8 w-full" onClick={() => setOpen(false)}>Get Instant Quote</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
