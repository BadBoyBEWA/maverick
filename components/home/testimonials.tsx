"use client"

import { Section, FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "Maverick's steel held up remarkably in the harshest mining conditions. Their reinforced beams were exactly what our underground operation needed.",
    author: "Marcus Rodriguez",
    role: "Operations Director, Lone Star Mining Co.",
    rating: 5,
  },
  {
    quote:
      "We've sourced roofing panels from Maverick's for three consecutive commercial builds. Consistent quality, on-time delivery, and great pricing every time.",
    author: "Sarah Chen",
    role: "Project Manager, DFW Construction Group",
    rating: 5,
  },
  {
    quote:
      "Their custom fabrication team turned our complex specs into reality within a tight deadline. The precision and finish quality were outstanding.",
    author: "James Mitchell",
    role: "Lead Engineer, Atlas Industrial",
    rating: 5,
  },
  {
    quote:
      "From corrugated sheets to protective coatings, Maverick's is our one-stop shop for all steel supply needs. Highly responsive and professional team.",
    author: "Diana Okafor",
    role: "Procurement Lead, Southwest Builders",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <Section className="bg-background">
      <FadeIn>
        <div className="text-center">
          <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-primary">
            Client Testimonials
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Trusted by Industry Leaders
          </h2>
        </div>
      </FadeIn>

      <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2" staggerDelay={0.12}>
        {testimonials.map((t) => (
          <StaggerItem key={t.author}>
            <div className="flex h-full flex-col rounded-sm border border-border bg-card p-6 transition-all hover:border-primary/20">
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
                {`"${t.quote}"`}
              </blockquote>
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  )
}
