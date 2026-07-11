import { motion } from 'framer-motion'
import { reasons } from '../../data/siteData'
import { Container } from '../ui/Container'
import { SectionTitle } from '../ui/SectionTitle'

export function WhyChooseUs() {
  return (
    <section className="section-pad bg-white dark:bg-slate-950">
      <Container>
        <SectionTitle eyebrow="Why brands choose us" title="Production calm for high-stakes launches." text="A senior print team, modern systems, and finishing standards built for founders, marketers, and operations teams." />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <motion.article
                key={reason.title}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,.06)] transition hover:-translate-y-1 hover:border-blue-200 dark:border-white/10 dark:bg-white/5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="grid h-13 w-13 place-items-center rounded-2xl bg-blue-50 text-xl text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">
                  <Icon />
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-slate-950 dark:text-white">{reason.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{reason.text}</p>
              </motion.article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
