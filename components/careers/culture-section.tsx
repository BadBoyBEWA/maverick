"use client"

import { Section, FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"
import { Award, GraduationCap, Heart, Users } from "lucide-react"

const perks = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health, dental, and vision insurance for you and your family from day one.",
  },
  {
    icon: GraduationCap,
    title: "Training & Growth",
    description: "Ongoing professional development, safety certifications, and leadership training programs.",
  },
  {
    icon: Users,
    title: "Team Culture",
    description: "Regular team events, company BBQs, and a collaborative environment where your voice matters.",
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Performance bonuses, employee of the month awards, and a clear path to career advancement.",
  },
]

export function CultureSection() {
  return (
    <Section className="bg-card">
      <FadeIn>
        <div className="text-center">
          <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-primary">
            Life at {"Maverick's"}
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Why People Love Working Here
          </h2>
        </div>
      </FadeIn>

      <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
        {perks.map((perk) => (
          <StaggerItem key={perk.title}>
            <div className="group flex flex-col items-center rounded-sm border border-border bg-background p-6 text-center transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <perk.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                {perk.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {perk.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  )
}
