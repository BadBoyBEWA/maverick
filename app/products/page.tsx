import type { Metadata } from "next"
import { PageHero } from "@/components/motion"
import { ProductsGrid } from "@/components/products/products-grid"

export const metadata: Metadata = {
  title: "Products & Services",
  description:
    "Browse Maverick's LLC's full range of steel roofing panels, mining reinforcement materials, and custom fabrication services.",
}

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Products & Services"
        subtitle="From steel roofing panels to mining-grade beams, explore our comprehensive range of industrial-strength materials and services."
        backgroundImage="/images/products-hero.jpg"
      />
      <ProductsGrid />
    </>
  )
}
