"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/motion"

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-[#0c1a2e] py-20 md:py-28">
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #5a9be0 0, #5a9be0 2px, transparent 2px, transparent 20px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:text-left">
            <div className="flex-1">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
                Ready to Build Stronger?
              </h2>
              <p className="mt-3 max-w-lg text-white/60 lg:mx-0">
                Get a free quote for your next project. Our experts will help you
                find the right steel solutions for your specific needs.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-sm bg-[#5a9be0] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#5a9be0]/90 hover:shadow-xl hover:shadow-[#5a9be0]/20"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
