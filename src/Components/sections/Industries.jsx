import { motion } from 'framer-motion'
import { industries } from '../../data/siteData'
import { Container } from '../ui/Container'
import { SectionTitle } from '../ui/SectionTitle'

export function Industries() {
  return (
    <section className="section-pad bg-slate-50 dark:bg-slate-900">
      <Container>
        <SectionTitle eyebrow="Industries" title="Purpose-built for every category." text="From luxury retail to healthcare compliance, every vertical gets the right material, finish, and ordering workflow." />
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.label}
                className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-white/5"
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-xl text-slate-700 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-white/10 dark:text-white">
                  <Icon />
                </div>
                <h3 className="mt-4 font-extrabold text-slate-950 dark:text-white">{industry.label}</h3>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
