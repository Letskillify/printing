import { lazy, Suspense } from 'react'
import { CTA } from '../components/sections/CTA'
import { Categories } from '../components/sections/Categories'
import { FAQ } from '../components/sections/FAQ'
import { FeaturedProducts } from '../components/sections/FeaturedProducts'
import { Hero } from '../components/sections/Hero'
import { Industries } from '../components/sections/Industries'
import { PrintingProcess } from '../components/sections/PrintingProcess'
import { QualityShowcase } from '../components/sections/QualityShowcase'
import { TrustedBy } from '../components/sections/TrustedBy'
import { WhyChooseUs } from '../components/sections/WhyChooseUs'

const Testimonials = lazy(() =>
  import('../components/sections/Testimonials').then((module) => ({ default: module.Testimonials })),
)

function TestimonialsSkeleton() {
  return (
    <section className="section-pad bg-white dark:bg-slate-950">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 sm:px-6 md:grid-cols-3 lg:px-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-72 animate-pulse rounded-[2rem] bg-slate-100 dark:bg-white/10" />
        ))}
      </div>
    </section>
  )
}

export function HomePage() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <Categories />
      <WhyChooseUs />
      <FeaturedProducts />
      <PrintingProcess />
      <QualityShowcase />
      {/* <Stats /> */}
      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials />
      </Suspense>
      <Industries />
      <FAQ />
      <CTA />
    </main>
  )
}
