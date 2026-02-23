import { HeroSection } from "@/components/home/hero-section"
import { AboutSnippet } from "@/components/home/about-snippet"
import { FeaturedProducts } from "@/components/home/featured-products"
import { Testimonials } from "@/components/home/testimonials"
import { CtaBanner } from "@/components/home/cta-banner"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSnippet />
      <FeaturedProducts />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
