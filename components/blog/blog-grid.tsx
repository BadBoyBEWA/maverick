"use client"

import { Section, FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"
import { ArrowRight, Calendar } from "lucide-react"

const articles = [
  {
    title: "Top Steel Trends in Mining for 2026",
    excerpt:
      "Explore the latest innovations in mining steel, from high-strength alloys to corrosion-resistant coatings shaping the industry.",
    category: "Mining",
    date: "Feb 10, 2026",
    readTime: "5 min read",
  },
  {
    title: "How to Choose the Right Roofing Material for Your Project",
    excerpt:
      "A comprehensive guide to selecting between corrugated, standing seam, and tile roofing based on your budget, climate, and style.",
    category: "Roofing",
    date: "Jan 28, 2026",
    readTime: "7 min read",
  },
  {
    title: "The Rise of Sustainable Steel in Construction",
    excerpt:
      "How recycled steel and eco-friendly fabrication processes are transforming the construction supply chain.",
    category: "Industry",
    date: "Jan 15, 2026",
    readTime: "4 min read",
  },
  {
    title: "Custom Fabrication: From Blueprint to Build",
    excerpt:
      "An inside look at how our fabrication team transforms raw steel into precision-engineered components for complex projects.",
    category: "Fabrication",
    date: "Dec 20, 2025",
    readTime: "6 min read",
  },
  {
    title: "Steel Safety Standards Every Contractor Should Know",
    excerpt:
      "Essential OSHA and ASTM standards for handling, transporting, and installing steel products on job sites.",
    category: "Safety",
    date: "Dec 5, 2025",
    readTime: "5 min read",
  },
  {
    title: "Dallas Construction Boom: What It Means for Steel Demand",
    excerpt:
      "Analyzing the current construction growth in the DFW metroplex and its impact on steel supply and pricing.",
    category: "Market",
    date: "Nov 18, 2025",
    readTime: "4 min read",
  },
]

const categoryColors: Record<string, string> = {
  Mining: "bg-secondary/30 text-secondary-foreground",
  Roofing: "bg-primary/10 text-primary",
  Industry: "bg-chart-4/10 text-chart-4",
  Fabrication: "bg-primary/10 text-primary",
  Safety: "bg-secondary/30 text-secondary-foreground",
  Market: "bg-chart-4/10 text-chart-4",
}

export function BlogGrid() {
  return (
    <Section className="bg-background">
      <FadeIn>
        <div>
          <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-primary">
            Latest Articles
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Insights from the Steel Industry
          </h2>
        </div>
      </FadeIn>

      <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
        {articles.map((article) => (
          <StaggerItem key={article.title}>
            <article className="group flex h-full flex-col rounded-sm border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex rounded-sm px-2.5 py-1 text-xs font-medium ${categoryColors[article.category] || "bg-primary/10 text-primary"}`}
                >
                  {article.category}
                </span>
                <span className="text-xs text-muted-foreground">{article.readTime}</span>
              </div>

              <h3 className="mt-4 text-balance text-lg font-semibold leading-snug text-foreground">
                {article.title}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {article.date}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                  Read More
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  )
}
