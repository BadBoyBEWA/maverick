"use client"

import { Section, FadeIn, StaggerContainer, StaggerItem, AnimatedCounter } from "@/components/motion"

const advantages = [
  { label: "Client Retention", value: 95 },
  { label: "On-Time Delivery", value: 99 },
  { label: "Quality Standards Met", value: 100 },
  { label: "Custom Orders Fulfilled", value: 92 },
]

export function WhyUs() {
  return (
    <Section className="bg-card">
      <FadeIn>
        <div className="text-center">
          <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-primary">
            Why Choose Us
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Numbers That Speak for Themselves
          </h2>
        </div>
      </FadeIn>

      <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
        {advantages.map((a) => (
          <StaggerItem key={a.label}>
            <div className="rounded-sm border border-border bg-background p-6">
              <div className="text-4xl font-bold text-primary">
                <AnimatedCounter target={a.value} suffix="%" />
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-border">
                <div
                  className="h-2 rounded-full bg-primary transition-all duration-1000"
                  style={{ width: `${a.value}%` }}
                />
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">{a.label}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  )
}
