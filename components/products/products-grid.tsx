"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Section, FadeIn } from "@/components/motion"
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  X,
} from "lucide-react"

type Product = {
  name: string
  spec: string
  description: string
  applications: string[]
  price: string
}

type Category = {
  id: string
  title: string
  description: string
  material: string[]
  products: Product[]
}

const categories: Category[] = [
  {
    id: "roofing",
    title: "Roofing Supplies",
    description:
      "Premium metal roofing materials for commercial and residential applications, built to withstand the toughest weather.",
    material: ["steel", "aluminum"],
    products: [
      {
        name: "Corrugated Steel Sheets",
        spec: "26-gauge galvanized, ASTM A653",
        description:
          "Industry-standard corrugated panels offering excellent durability and corrosion resistance for commercial roofing.",
        applications: ["Commercial roofs", "Warehouses", "Agricultural buildings"],
        price: "Contact for Quote",
      },
      {
        name: "Standing Seam Panels",
        spec: "24-gauge Galvalume, concealed fastener",
        description:
          "Architectural-grade interlocking panels with superior weather tightness and a modern, clean aesthetic.",
        applications: ["Commercial buildings", "Residential upgrades", "Institutional projects"],
        price: "Contact for Quote",
      },
      {
        name: "Metal Roof Tiles",
        spec: "Stone-coated steel, 0.45mm gauge",
        description:
          "Stone-coated steel tiles combining the aesthetic appeal of traditional tiles with the strength of metal.",
        applications: ["Residential roofing", "Resort properties", "Heritage renovations"],
        price: "Contact for Quote",
      },
      {
        name: "Ridge Caps & Trim",
        spec: "Color-matched to panel systems",
        description:
          "Precision-formed ridge caps, drip edges, and flashing to complete any metal roofing system.",
        applications: ["Roof finishing", "Flashing", "Waterproofing details"],
        price: "Contact for Quote",
      },
      {
        name: "Fasteners & Hardware",
        spec: "304 stainless steel, EPDM washers",
        description:
          "Self-drilling screws, clips, and specialty hardware engineered for metal roofing installations.",
        applications: ["Panel installation", "Structural attachment", "Seam fastening"],
        price: "Contact for Quote",
      },
    ],
  },
  {
    id: "mining",
    title: "Mining Steel",
    description:
      "Heavy-duty steel products engineered for the extreme demands of mining and underground operations.",
    material: ["steel"],
    products: [
      {
        name: "Reinforcement Bars (Rebar)",
        spec: "Grade 60, ASTM A615, #4 to #11",
        description:
          "High-strength deformed reinforcing bars for concrete reinforcement in mining infrastructure.",
        applications: ["Tunnel reinforcement", "Foundation work", "Structural support"],
        price: "Contact for Quote",
      },
      {
        name: "Structural I-Beams",
        spec: "ASTM A992, W8 to W36 sizes",
        description:
          "Wide-flange steel beams providing maximum load-bearing capacity for mining structures.",
        applications: ["Mine shaft framing", "Equipment platforms", "Overhead supports"],
        price: "Contact for Quote",
      },
      {
        name: "Steel Mesh Panels",
        spec: "Welded wire, 4-gauge to 10-gauge",
        description:
          "Welded steel mesh for ground stabilization and reinforcement in underground mining operations.",
        applications: ["Ground support", "Ventilation screens", "Safety barriers"],
        price: "Contact for Quote",
      },
      {
        name: "Protective Coatings",
        spec: "Zinc, epoxy & polyurethane systems",
        description:
          "Industrial-grade coating systems designed to protect steel from corrosion in harsh mining environments.",
        applications: ["Corrosion prevention", "Underground equipment", "Structural longevity"],
        price: "Contact for Quote",
      },
    ],
  },
  {
    id: "fabrication",
    title: "Custom Fabrication",
    description:
      "State-of-the-art metal fabrication services tailored to your exact specifications and project requirements.",
    material: ["steel", "aluminum"],
    products: [
      {
        name: "CNC Plasma Cutting",
        spec: "Up to 2\" thick, +/- 0.015\" tolerance",
        description:
          "High-precision CNC plasma cutting for complex shapes and profiles in steel and aluminum plate.",
        applications: ["Custom parts", "Brackets and plates", "Artistic metalwork"],
        price: "Contact for Quote",
      },
      {
        name: "Laser Cutting",
        spec: "Up to 1\" steel, +/- 0.005\" tolerance",
        description:
          "Ultra-precise laser cutting services for detailed components requiring tight tolerances.",
        applications: ["Precision components", "Thin-gauge work", "Prototyping"],
        price: "Contact for Quote",
      },
      {
        name: "MIG & TIG Welding",
        spec: "AWS D1.1 certified, all positions",
        description:
          "Certified welding services for structural and cosmetic applications across all steel types.",
        applications: ["Structural joins", "Pipe welding", "Custom assemblies"],
        price: "Contact for Quote",
      },
      {
        name: "Press Brake Bending",
        spec: "Up to 12' length, 250-ton capacity",
        description:
          "Precision bending and forming of steel plate and sheet to your exact angles and specifications.",
        applications: ["Channel forming", "Custom profiles", "Architectural elements"],
        price: "Contact for Quote",
      },
    ],
  },
]

const filters = [
  { label: "All", value: "all" },
  { label: "Steel", value: "steel" },
  { label: "Aluminum", value: "aluminum" },
  { label: "Roofing", value: "roofing" },
  { label: "Mining", value: "mining" },
  { label: "Services", value: "fabrication" },
]

export function ProductsGrid() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(categories.map((c) => c.id))
  )
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filteredCategories = categories.filter((cat) => {
    if (activeFilter === "all") return true
    if (activeFilter === "steel" || activeFilter === "aluminum")
      return cat.material.includes(activeFilter)
    return cat.id === activeFilter
  })

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <Section className="bg-background">
      {/* Filters */}
      <FadeIn>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`rounded-sm px-4 py-2 text-sm font-medium transition-all ${
                activeFilter === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-card hover:text-foreground border border-border"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Categories */}
      <div className="mt-10 flex flex-col gap-6">
        <AnimatePresence mode="wait">
          {filteredCategories.map((cat) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-sm border border-border bg-card overflow-hidden"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(cat.id)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-background/50"
              >
                <div>
                  <h3 className="text-xl font-bold text-foreground">{cat.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
                {openCategories.has(cat.id) ? (
                  <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                )}
              </button>

              {/* Products */}
              <AnimatePresence>
                {openCategories.has(cat.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-4 p-6 pt-0 sm:grid-cols-2 lg:grid-cols-3">
                      {cat.products.map((product) => (
                        <button
                          key={product.name}
                          onClick={() => setSelectedProduct(product)}
                          className="group flex flex-col items-start rounded-sm border border-border bg-background p-5 text-left transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
                        >
                          <h4 className="text-sm font-semibold text-foreground">
                            {product.name}
                          </h4>
                          <p className="mt-1 text-xs font-medium text-primary">
                            {product.spec}
                          </p>
                          <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                            {product.description}
                          </p>
                          <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                            View Details
                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-sm border border-border bg-card p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {selectedProduct.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {selectedProduct.spec}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {selectedProduct.description}
              </p>
              <div className="mt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Applications
                </h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {selectedProduct.applications.map((app) => (
                    <li
                      key={app}
                      className="rounded-sm bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                  onClick={() => setSelectedProduct(null)}
                >
                  Request Quote
                </Link>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-sm border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-background"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
