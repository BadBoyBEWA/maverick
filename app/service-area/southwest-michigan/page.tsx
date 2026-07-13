import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/motion"

export const metadata: Metadata = {
  title: "Southwest Michigan Steel Supply & Roofing Service Area",
  description:
    "Maverick's LLC provides steel roofing, structural steel, rebar, and fabrication support throughout Southwest Michigan and Northern Indiana from Benton Harbor, Michigan.",
}

const serviceAreas = [
  "Benton Harbor",
  "St. Joseph",
  "Stevensville",
  "Niles",
  "Dowagiac",
  "South Bend",
  "Mishawaka",
  "Elkhart",
]

export default function ServiceAreaPage() {
  return (
    <>
      <PageHero
        title="Serving Southwest Michigan & Northern Indiana"
        subtitle="From our Benton Harbor, Michigan base, we support contractors, manufacturers, and industrial teams with steel products and fabrication services throughout the region."
        backgroundImage="/images/about-hero.jpg"
      />

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-primary">
                Local Service Focus
              </span>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Reliable steel supply for Michigan builders and industrial operators
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Maverick's LLC is proud to be based in Benton Harbor, Michigan, and to support projects throughout Southwest Michigan and Northern Indiana. Our team helps customers source roofing, structural, and reinforcement steel with the speed and consistency local job sites require.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Whether you are planning a commercial roof, a manufacturing upgrade, or a mining-support structure, we can help you source the right steel products and coordinate delivery with minimal delays.
              </p>
            </div>

            <div className="rounded-sm border border-border bg-card p-8">
              <h3 className="text-xl font-semibold text-foreground">Service areas we regularly support</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {serviceAreas.map((area) => (
                  <li key={area} className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                    {area}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="mt-8 inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80">
                Request a quote for your region
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
