import type { Metadata } from "next"
import { PageHero } from "@/components/motion"
import { ProductsGrid } from "@/components/products/products-grid"

export const metadata: Metadata = {
  title: "Steel Roofing & Structural Steel Products | Benton Harbor, MI",
  description:
    "Browse Maverick's LLC's full range of steel roofing panels, structural steel, rebar, and custom fabrication services available from Benton Harbor, Michigan.",
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
