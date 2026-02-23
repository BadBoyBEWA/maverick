"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Section, FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"

const products = [
  {
    title: "Corrugated Steel Sheets",
    category: "Roofing",
    spec: "26-gauge galvanized steel",
    description: "High-durability corrugated panels designed for commercial and residential roofing applications.",
  },
  {
    title: "Mining Reinforcement Bars",
    category: "Mining",
    spec: "Grade 60 rebar, ASTM A615",
    description: "Heavy-duty reinforcement bars engineered for underground mining structural support.",
  },
  {
    title: "Standing Seam Panels",
    category: "Roofing",
    spec: "24-gauge Galvalume finish",
    description: "Premium interlocking roof panels with superior weather resistance and sleek aesthetics.",
  },
  {
    title: "Structural I-Beams",
    category: "Mining",
    spec: "ASTM A992 wide-flange",
    description: "Wide-flange steel beams for heavy-load structural applications in mining and construction.",
  },
  {
    title: "Protective Coatings",
    category: "Services",
    spec: "Zinc & epoxy finishes",
    description: "Industrial-grade protective coatings that extend the lifespan of steel in harsh environments.",
  },
  {
    title: "Custom Fabrication",
    category: "Services",
    spec: "CNC plasma & laser cutting",
    description: "Precision cutting, welding, and bending services tailored to your exact specifications.",
  },
]

const categoryColors: Record<string, string> = {
  Roofing: "bg-primary/10 text-primary",
  Mining: "bg-secondary/30 text-secondary-foreground",
  Services: "bg-chart-4/10 text-chart-4",
}

export function FeaturedProducts() {
  return (
    <Section className="bg-card">
      <FadeIn>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-primary">
              What We Supply
            </span>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Featured Products & Services
            </h2>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View All Products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </FadeIn>

      <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
        {products.map((product) => (
          <StaggerItem key={product.title}>
            <div className="group flex h-full flex-col rounded-sm border border-border bg-background p-6 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex rounded-sm px-2.5 py-1 text-xs font-medium ${categoryColors[product.category] || ""}`}
                >
                  {product.category}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {product.title}
              </h3>
              <p className="mt-1 text-xs font-medium text-primary">{product.spec}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <Link
                href="/products"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Learn More
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  )
}
