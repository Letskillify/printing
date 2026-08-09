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
      <section id="hero">
        <Hero setCurrentPage={setCurrentPage} />
      </section>

      {/* 2. Shop by Category — 8-grid */}
      <section id="categories">
        <ShopByCategory setCurrentPage={setCurrentPage} />
      </section>

      {/* 3. Why Choose Us — 4 features */}
      <section id="why-choose-us">
        <WhyChooseUs />
      </section>

      {/* 4. How It Works — 4 steps */}
      <section id="how-it-works">
        <HowItWorks />
      </section>

      {/* 5. Stats Banner — purple-orange gradient */}
      <section id="stats">
        <StatsBanner />
      </section>

      {/* 6. Discount + CTA — split panel */}
      <section id="cta" className="py-14 bg-white">
        <DiscountCTA setCurrentPage={setCurrentPage} />
      </section>

      {/* 7. Testimonials — 3 review cards */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* 8. Latest Blog + Newsletter */}
      <section id="blog">
        <LatestBlog setCurrentPage={setCurrentPage} />
      </section>
    </main>
  )
}
