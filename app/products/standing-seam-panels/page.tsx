import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/motion"

export const metadata: Metadata = {
  title: "Standing Seam Metal Roofing Panels | Maverick's LLC",
  description:
    "Learn about standing seam panels for low-slope and steep-slope roofing systems, available from Maverick's LLC in Benton Harbor, Michigan.",
}

export default function StandingSeamPage() {
  return (
    <>
      <PageHero
        title="Standing Seam Panels"
        subtitle="Premium interlocking roof panels for projects that need a modern finish and dependable weather protection."
        backgroundImage="/images/products-hero.jpg"
      />

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">A clean profile with strong weather performance</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Standing seam systems are a strong choice for commercial and residential projects where appearance, water shedding, and long-term durability matter. The concealed fastener design supports a clean roofline and reliable performance.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                We help customers match panel selection to project requirements and local climate conditions, including roofing systems that need to hold up through Michigan winters.
              </p>
            </div>
            <div className="rounded-sm border border-border bg-card p-8">
              <h3 className="text-xl font-semibold text-foreground">Why contractors choose them</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li>• Excellent weather resistance and panel locking</li>
                <li>• Modern architectural appearance</li>
                <li>• Good fit for long-span roofing systems</li>
                <li>• Available through local project support</li>
              </ul>
              <Link href="/contact" className="mt-8 inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80">
                Speak with our team about panel options
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
