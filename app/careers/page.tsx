import type { Metadata } from "next"
import { PageHero } from "@/components/motion"
import { JobListings } from "@/components/careers/job-listings"
import { CultureSection } from "@/components/careers/culture-section"

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Maverick's LLC team in Dallas, TX. Explore open positions in steel supply, fabrication, sales, and management.",
}

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Join Our Steel-Strong Team"
        subtitle='Maverick’s LLC has been at the forefront of steel supply and metal fabrication for over a decade.
                We serve the construction, mining, and industrial sectors across Texas and beyond, providing 
                premium-grade materials that stand the test of time.
                From corrugated roofing panels to reinforced mining beams, our product range and expert team 
                ensure every project gets the materials it deserves.'
        backgroundImage="/images/careers-hero.jpg"
      />
      <JobListings />
      <CultureSection />
    </>
  )
}