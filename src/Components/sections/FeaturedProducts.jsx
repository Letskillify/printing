import { FiEye, FiStar } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { products } from '../../data/siteData'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { ProductVisual } from '../ui/ProductVisual'
import { SectionTitle } from '../ui/SectionTitle'

export function FeaturedProducts() {
  return (
    <section className="section-pad bg-slate-50 dark:bg-slate-900">
      <Container>
        <SectionTitle eyebrow="Featured products" title="Luxury ecommerce cards built to convert." text="Three fast-start bestsellers with premium finishes, beautiful proofs, and production-ready specs." />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.article
              key={product.title}
              className="group rounded-[2rem] border border-white/80 bg-white/80 p-4 shadow-[0_24px_90px_rgba(15,23,42,.08)] backdrop-blur transition hover:-translate-y-2 hover:shadow-[0_34px_110px_rgba(37,99,235,.16)] dark:border-white/10 dark:bg-white/5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="relative overflow-hidden rounded-[1.75rem]">
                <ProductVisual tone={product.tone} type={index === 1 ? 'box' : index === 2 ? 'label' : 'card'} />
                <button className="absolute right-4 top-4 flex min-h-11 translate-y-2 items-center gap-2 rounded-full bg-white/90 px-4 text-sm font-bold text-slate-900 opacity-0 shadow-xl backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100" aria-label={`Quick view ${product.title}`}>
                  <FiEye />
                  Quick View
                </button>
              </div>
              <div className="p-3 pt-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">{product.title}</h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700 dark:bg-white/10 dark:text-slate-200">{product.price}</span>
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{product.finish}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-500">
                    <FiStar className="fill-current" />
                    {product.rating}
                  </span>
                  <Button className="px-5" icon={false}>Order</Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}
