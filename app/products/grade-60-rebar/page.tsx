import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/motion"

export const metadata: Metadata = {
  title: "ASTM A615 Grade 60 Rebar | Reinforcement Steel | Maverick's LLC",
  description:
    "Discover Grade 60 rebar and reinforcement steel solutions for mining, infrastructure, and concrete construction projects from Maverick's LLC.",
}

export default function RebarPage() {
  return (
    <>
      <PageHero
        title="ASTM A615 Grade 60 Rebar"
        subtitle="Reinforcement steel for concrete construction, mining support, and industrial structural work."
        backgroundImage="/images/products-hero.jpg"
      />

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Dependable reinforcement for structural projects</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Grade 60 rebar is a standard choice for reinforced concrete construction, foundation work, and mining-related support systems where consistent strength matters. Our team can help you identify the right reinforcement steel for your application.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                We support customers who need reliable materials delivered on schedule for projects across the Great Lakes region.
              </p>
            </div>
            <div className="rounded-sm border border-border bg-card p-8">
              <h3 className="text-xl font-semibold text-foreground">Common applications</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li>• Concrete reinforcement for foundations and slabs</li>
                <li>• Structural support in industrial builds</li>
                <li>• Mining and utility infrastructure needs</li>
                <li>• Large-scale project procurement support</li>
              </ul>
              <Link href="/contact" className="mt-8 inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80">
                Request rebar availability and specs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
