import { Hero } from '../Components/sections/Hero'
import { ShopByCategory } from '../Components/sections/ShopByCategory'
import { WhyChooseUs } from '../Components/sections/WhyChooseUs'
import { HowItWorks } from '../Components/sections/HowItWorks'
import { StatsBanner } from '../Components/sections/StatsBanner'
import { DiscountCTA } from '../Components/sections/DiscountCTA'
import { Testimonials } from '../Components/sections/Testimonials'
import { LatestBlog } from '../Components/sections/LatestBlog'

export function HomePage({ setCurrentPage }) {
  return (
    <main className="overflow-hidden bg-white">
      {/* 1. Hero — Dark Navy with headline */}
      <Hero setCurrentPage={setCurrentPage} />

      {/* 2. Shop by Category — 8-grid */}
      <ShopByCategory setCurrentPage={setCurrentPage} />

      {/* 3. Why Choose Us — 4 features */}
      <WhyChooseUs />

      {/* 4. How It Works — 4 steps */}
      <HowItWorks />

      {/* 5. Stats Banner — purple-orange gradient */}
      <StatsBanner />

      {/* 6. Discount + CTA — split panel */}
      <section className="py-14 bg-white">
        <DiscountCTA setCurrentPage={setCurrentPage} />
      </section>

      {/* 7. Testimonials — 3 review cards */}
      <Testimonials />

      {/* 8. Latest Blog + Newsletter */}
      <LatestBlog setCurrentPage={setCurrentPage} />
    </main>
  )
}
