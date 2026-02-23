import type { Metadata } from "next"
import { PageHero } from "@/components/motion"
import { Timeline } from "@/components/about/timeline"
import { MissionValues } from "@/components/about/mission-values"
import { TeamGrid } from "@/components/about/team-grid"
import { WhyUs } from "@/components/about/why-us"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Maverick's LLC - Dallas's trusted steel supply partner since 2010, serving construction, mining, and industrial sectors.",
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Our Story"
        subtitle="Built on steel, driven by trust. Discover how Maverick's LLC became Dallas's leading steel supply partner."
        backgroundImage="/images/about-hero.jpg"
      />
      <Timeline />
      <MissionValues />
      <TeamGrid />
      <WhyUs />
    </>
  )
}
