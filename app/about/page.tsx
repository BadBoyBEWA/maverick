import type { Metadata } from "next"
import { PageHero } from "@/components/motion"
import { Timeline } from "@/components/about/timeline"
import { MissionValues } from "@/components/about/mission-values"
import { TeamGrid } from "@/components/about/team-grid"
import { WhyUs } from "@/components/about/why-us"

export const metadata: Metadata = {
  title: "About Maverick's LLC | Benton Harbor Steel Supplier",
  description:
    "Learn how Maverick's LLC supports construction, mining, and industrial projects from Benton Harbor, Michigan, with steel roofing, structural steel, rebar, and fabrication services.",
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Our Story"
        subtitle="Built on steel, driven by trust. Discover how Maverick's LLC became a trusted steel supply partner for Southwest Michigan and Northern Indiana from Benton Harbor, Michigan."
        backgroundImage="/images/about-hero.jpg"
      />
      <Timeline />
      <MissionValues />
      <TeamGrid />
      <WhyUs />
    </>
  )
}
