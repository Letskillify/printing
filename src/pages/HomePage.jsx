import { lazy, Suspense } from 'react'
import { CTA } from '../Components/sections/CTA'
import { Categories } from '../Components/sections/Categories'
import { FAQ } from '../Components/sections/FAQ'
import { FeaturedProducts } from '../Components/sections/FeaturedProducts'
import { Hero } from '../Components/sections/Hero'
import { Industries } from '../Components/sections/Industries'
import { PrintingProcess } from '../Components/sections/PrintingProcess'
import { QualityShowcase } from '../Components/sections/QualityShowcase'
import { TrustedBy } from '../Components/sections/TrustedBy'
import { WhyChooseUs } from '../Components/sections/WhyChooseUs'

const Testimonials = lazy(() =>
  import('../Components/sections/Testimonials').then((module) => ({ default: module.Testimonials })),
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
