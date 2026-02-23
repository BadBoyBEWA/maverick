"use client"

import { Section, FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"
import { Lightbulb, Leaf, Users, Target } from "lucide-react"

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Continuously adopting cutting-edge steel technologies and fabrication methods to deliver superior products.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Committed to eco-friendly steel processing, recycled materials, and reducing our environmental footprint.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We view every client as a long-term partner, working closely to understand and exceed their project needs.",
  },
  {
    icon: Target,
    title: "Precision",
    description: "Every cut, every weld, every delivery is executed with meticulous attention to detail and quality control.",
  },
]

export function MissionValues() {
  return (
    <Section className="bg-card">
      <div className="grid gap-12 lg:grid-cols-2">
        <FadeIn direction="left">
          <div>
            <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-primary">
              Mission & Vision
            </span>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Forging the Future of Steel Supply
            </h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-sm border-l-2 border-primary bg-background p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                  Our Mission
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  To provide the construction, mining, and industrial sectors with
                  the highest quality steel products and fabrication services,
                  delivered with reliability, innovation, and uncompromising
                  standards.
                </p>
              </div>
              <div className="rounded-sm border-l-2 border-primary/60 bg-background p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                  Our Vision
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {"To be the nation's most trusted name in steel supply, setting the benchmark for quality, sustainability, and customer partnership in every project we support."}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <StaggerContainer className="grid gap-4 sm:grid-cols-2" staggerDelay={0.1}>
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="group flex flex-col items-start gap-3 rounded-sm border border-border bg-background p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  )
}
