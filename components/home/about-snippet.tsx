"use client"

import Link from "next/link"
import { ArrowRight, Shield, Hammer, Factory } from "lucide-react"
import { Section, FadeIn, StaggerContainer, StaggerItem, AnimatedCounter } from "@/components/motion"

const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Satisfied Clients" },
  { value: 50, suffix: "K+", label: "Tons Delivered" },
  { value: 98, suffix: "%", label: "Client Retention" },
]

const highlights = [
  {
    icon: Shield,
    title: "Trusted Supplier",
    description: "Certified steel products meeting the highest industry standards for construction and mining.",
  },
  {
    icon: Hammer,
    title: "Custom Fabrication",
    description: "Precision cutting, welding, and shaping to your exact project specifications.",
  },
  {
    icon: Factory,
    title: "Industrial Scale",
    description: "Warehouse capacity to handle orders from single projects to enterprise-level supply chains.",
  },
]

export function AboutSnippet() {
  return (
    <Section className="bg-background">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.1}>
            <div className="flex flex-col items-center gap-1 rounded-sm border border-border bg-card p-6 text-center">
              <span className="text-3xl font-bold text-primary md:text-4xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* About text */}
      <div className="mt-20 grid items-center gap-12 lg:grid-cols-2">
        <FadeIn direction="left">
          <div>
            <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-primary">
              About Us
            </span>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {"Dallas'Trusted Steel Supply Partner Since 2010"}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {"Maverick's LLC has been at the forefront of steel supply and metal fabrication for over a decade. We serve the construction, mining, and industrial sectors across Texas and beyond, providing premium-grade materials that stand the test of time."}
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              From corrugated roofing panels to reinforced mining beams, our product
              range and expert team ensure every project gets the materials it
              deserves.
            </p>
            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Learn More About Us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="grid gap-4 sm:grid-cols-1" staggerDelay={0.15}>
          {highlights.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group flex gap-4 rounded-sm border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  )
}
