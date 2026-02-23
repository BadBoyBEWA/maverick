"use client"

import { Section, FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"

const milestones = [
  {
    year: "2010",
    title: "Founded in Dallas",
    description:
      "Maverick's LLC was established as a local steel supplier serving the Dallas-Fort Worth construction market.",
  },
  {
    year: "2013",
    title: "Mining Sector Expansion",
    description:
      "Expanded product lines to include mining-grade reinforced steel beams and protective coatings for the Texas mining industry.",
  },
  {
    year: "2016",
    title: "Custom Fabrication Launch",
    description:
      "Opened our state-of-the-art fabrication facility with CNC plasma cutting and precision welding capabilities.",
  },
  {
    year: "2019",
    title: "Regional Growth",
    description:
      "Grew to serve clients across Texas, Oklahoma, and Louisiana, becoming a regional leader in steel supply.",
  },
  {
    year: "2022",
    title: "Sustainability Initiative",
    description:
      "Launched our eco-friendly recycled steel program, reducing waste while maintaining top-tier quality standards.",
  },
  {
    year: "2025",
    title: "Industry Leader",
    description:
      "Surpassed 500+ satisfied clients with a 98% retention rate, solidifying our position as the go-to steel partner.",
  },
]

export function Timeline() {
  return (
    <Section className="bg-background">
      <FadeIn>
        <div className="text-center">
          <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-primary">
            Our Journey
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Building a Legacy in Steel
          </h2>
        </div>
      </FadeIn>

      <StaggerContainer className="relative mt-16" staggerDelay={0.12}>
        {/* Vertical line */}
        <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:left-1/2 md:block" />

        <div className="flex flex-col gap-10">
          {milestones.map((m, i) => (
            <StaggerItem key={m.year}>
              <div
                className={`flex flex-col gap-4 md:flex-row md:items-center ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                  <div className="rounded-sm border border-border bg-card p-5 transition-all hover:border-primary/20">
                    <span className="text-2xl font-bold text-primary">{m.year}</span>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {m.description}
                    </p>
                  </div>
                </div>

                {/* Dot */}
                <div className="hidden h-4 w-4 shrink-0 rounded-full border-2 border-primary bg-background md:block" />

                {/* Spacer */}
                <div className="hidden flex-1 md:block" />
              </div>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </Section>
  )
}
