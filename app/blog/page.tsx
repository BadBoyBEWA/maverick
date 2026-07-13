import type { Metadata } from "next"
import { PageHero } from "@/components/motion"
import { BlogGrid } from "@/components/blog/blog-grid"

export const metadata: Metadata = {
  title: "Steel Industry Insights for Michigan Builders",
  description:
    "Explore local steel roofing and fabrication insights for Michigan builders, contractors, and industrial teams from Maverick's LLC.",
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Blog & Resources"
        subtitle="Industry insights, steel trends, and expert advice to keep you informed and ahead of the curve."
        backgroundImage="/images/blog-hero.jpg"
      />
      <BlogGrid />
    </>
  )
}
