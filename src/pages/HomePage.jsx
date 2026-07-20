import { Hero } from '../Components/sections/Hero'
import { FeaturedProducts } from '../Components/sections/FeaturedProducts'
import { CredentialsBanner } from '../Components/sections/CredentialsBanner'
import { HowItWorks } from '../Components/sections/HowItWorks'
import { BulkOrderBanner } from '../Components/sections/BulkOrderBanner'

export function HomePage({ setCurrentPage }) {
  return (
    <main className="overflow-hidden bg-white">
      <Hero setCurrentPage={setCurrentPage} />
      <FeaturedProducts setCurrentPage={setCurrentPage} />
      <CredentialsBanner />
      <HowItWorks />
      <BulkOrderBanner setCurrentPage={setCurrentPage} />
    </main>
  )
}
