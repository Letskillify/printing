import { FiCheckCircle, FiPlay } from 'react-icons/fi'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { GlassCard } from '../ui/GlassCard'

const floatingItems = ['Business Cards', 'Packaging Box', 'Sticker', 'Label', 'Invitation Card']

export function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, -70])

  return (
    <section id="home" className="relative overflow-hidden pt-32 sm:pt-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,.18),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,.16),transparent_34%),linear-gradient(180deg,#fff,#f8fafc)] dark:bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,.26),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,.20),transparent_34%),linear-gradient(180deg,#020617,#0f172a)]" />
      <Container className="grid min-h-[calc(100vh-5rem)] items-center gap-12 pb-16 lg:grid-cols-[1fr_.9fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
          <Badge>Luxury print production</Badge>
          <h1 className="mt-7 max-w-5xl text-[38px] font-extrabold leading-[1.02] tracking-tight text-slate-950 dark:text-white sm:text-[52px] lg:text-[72px]">
            Print that Builds Brands. Not Just Products.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Enterprise-grade packaging, cards, labels, and retail print with proof-perfect color, tactile finishes, and a storefront your team can trust.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}>Explore Products</Button>
            <Button variant="secondary" onClick={() => document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' })}>Get Instant Quote</Button>
          </div>
          <div className="mt-9 flex flex-wrap gap-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
            {['Press-calibrated color', 'Human proofing', 'Global shipping'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <FiCheckCircle className="text-blue-600" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div className="relative min-h-[560px]" style={{ y }}>
          <GlassCard className="absolute left-0 top-12 w-[78%] p-4">
            <div className="rounded-[1.5rem] bg-slate-950 p-3 shadow-2xl">
              <div className="h-7 rounded-t-2xl bg-slate-800" />
              <div className="grid gap-3 rounded-b-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500 p-5">
                <div className="h-32 rounded-2xl bg-white/80" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-16 rounded-xl bg-white/70" />
                  <div className="h-16 rounded-xl bg-white/50" />
                  <div className="h-16 rounded-xl bg-white/60" />
                </div>
              </div>
            </div>
          </GlassCard>

          <motion.div className="absolute right-0 top-3 w-48 rounded-[2rem] border border-white/70 bg-white/85 p-4 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-white/10" animate={{ y: [0, -16, 0], rotate: [2, -2, 2] }} transition={{ duration: 7, repeat: Infinity }}>
            <div className="mx-auto h-48 rounded-[1.5rem] bg-slate-950 p-3">
              <div className="h-full rounded-[1rem] bg-gradient-to-br from-white via-cyan-100 to-blue-200" />
            </div>
          </motion.div>

          {floatingItems.map((item, index) => (
            <motion.div
              key={item}
              className="absolute rounded-full border border-white/70 bg-white/85 px-4 py-3 text-xs font-bold text-slate-800 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/80 dark:text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, index % 2 ? 14 : -14, 0] }}
              transition={{ delay: index * 0.12, duration: 5 + index, repeat: Infinity }}
              style={{
                left: `${[6, 58, 12, 62, 34][index]}%`,
                top: `${[3, 22, 66, 73, 47][index]}%`,
              }}
            >
              {item}
            </motion.div>
          ))}

          <GlassCard className="absolute bottom-10 right-8 flex w-72 items-center gap-4 p-5">
            <button className="grid h-12 w-12 place-items-center rounded-full bg-blue-600 text-white" aria-label="Play brand film">
              <FiPlay />
            </button>
            <div>
              <p className="text-sm font-bold text-slate-950 dark:text-white">See finishing in motion</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Foil, emboss, texture, edge paint</p>
            </div>
          </GlassCard>
        </motion.div>
      </Container>
    </section>
  )
}
