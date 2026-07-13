import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/motion"

export const metadata: Metadata = {
  title: "Corrugated Steel Sheets | 26-Gauge Galvanized | Maverick's LLC",
  description:
    "Explore corrugated steel sheets for roofing and wall applications, available from Maverick's LLC in Benton Harbor, Michigan for Southwest Michigan and Northern Indiana projects.",
}

export default function CorrugatedSteelPage() {
  return (
    <>
      <PageHero
        title="Corrugated Steel Sheets"
        subtitle="Durable 26-gauge galvanized steel panels for roofing, agricultural, and structural projects across Michigan and Northern Indiana."
        backgroundImage="/images/products-hero.jpg"
      />

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Built for performance in demanding environments</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Our corrugated steel sheets are designed for long-lasting performance in both commercial roofing and heavy-duty agricultural applications. The galvanized finish helps resist corrosion while maintaining excellent structural integrity.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Common uses include agricultural barns, utility buildings, industrial shelters, and light commercial roofing systems where dependable coverage matters.
              </p>
            </div>
            <div className="rounded-sm border border-border bg-card p-8">
              <h3 className="text-xl font-semibold text-foreground">Product highlights</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li>• 26-gauge galvanized steel construction</li>
                <li>• Suitable for roofing and wall panel installs</li>
                <li>• Available for quick-turn regional orders</li>
                <li>• Support for Michigan and Northern Indiana projects</li>
              </ul>
              <Link href="/contact" className="mt-8 inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80">
                Request pricing and availability
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
