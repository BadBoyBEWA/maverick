import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/motion"

export const metadata: Metadata = {
  title: "Structural I-Beams | Wide-Flange Steel | Maverick's LLC",
  description:
    "Explore structural I-beams and wide-flange steel options for heavy-load construction and industrial projects served from Benton Harbor, Michigan.",
}

export default function StructuralIBeamsPage() {
  return (
    <>
      <PageHero
        title="Structural I-Beams"
        subtitle="Wide-flange steel beams for heavy-load construction, fabrication, and infrastructure projects."
        backgroundImage="/images/products-hero.jpg"
      />

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Heavy-duty steel support for demanding builds</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Structural I-beams are a core material for commercial and industrial structures where load-bearing strength and dimensional stability are essential. Our team can help you source the right beam specifications for your build.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                From fabrication support to project coordination, Maverick's LLC is positioned to help customers simplify steel sourcing for complex builds across Michigan and the surrounding region.
              </p>
            </div>
            <div className="rounded-sm border border-border bg-card p-8">
              <h3 className="text-xl font-semibold text-foreground">Ideal for</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li>• Commercial framing and structural support</li>
                <li>• Industrial equipment platforms</li>
                <li>• Mining and utility infrastructure</li>
                <li>• Custom fabrication and assembly planning</li>
              </ul>
              <Link href="/contact" className="mt-8 inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80">
                Ask about beam availability and specs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
