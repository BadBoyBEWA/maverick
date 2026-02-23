import type { Metadata } from "next"
import { PageHero } from "@/components/motion"
import { BlogGrid } from "@/components/blog/blog-grid"

export const metadata: Metadata = {
  title: "Blog & Resources",
  description:
    "Stay up to date with industry insights, steel trends, and expert advice from the Maverick's LLC team.",
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
