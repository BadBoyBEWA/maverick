"use client"

import { Section, FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"
import { Linkedin } from "lucide-react"

const team = [
  {
    name: "Robert Maverick",
    role: "CEO & Founder",
    bio: "Founded the company in 2010 with a vision to revolutionize steel supply in the Dallas-Fort Worth area. 25+ years in the steel industry.",
    initials: "RM",
  },
  {
    name: "Angela Torres",
    role: "VP of Operations",
    bio: "Oversees all fabrication and logistics, ensuring on-time delivery and quality control across every order.",
    initials: "AT",
  },
  {
    name: "David Park",
    role: "Sales Director",
    bio: "Leads our sales team with deep expertise in construction and mining sector requirements and client relationships.",
    initials: "DP",
  },
  {
    name: "Lisa Johnson",
    role: "Head of Fabrication",
    bio: "Certified welding engineer with 15 years of experience in custom metal fabrication and CNC operations.",
    initials: "LJ",
  },
  {
    name: "Michael Obi",
    role: "Procurement Manager",
    bio: "Manages supplier relationships and ensures we source only the highest grade steel and metals on the market.",
    initials: "MO",
  },
]

export function TeamGrid() {
  return (
    <Section className="bg-background">
      <FadeIn>
        <div className="text-center">
          <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-primary">
            Our Team
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            The People Behind the Steel
          </h2>
          <p className="mt-3 text-muted-foreground">
            Experienced professionals dedicated to delivering the best in steel supply and fabrication.
          </p>
        </div>
      </FadeIn>

      <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
        {team.map((member) => (
          <StaggerItem key={member.name}>
            <div className="group relative overflow-hidden rounded-sm border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
              <div className="p-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-sm bg-primary/10 text-lg font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {member.initials}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm font-medium text-primary">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  Connect
                </a>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  )
}
