import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products & Services" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

const services = [
  "Metal Roofing Panels",
  "Mining Reinforcement Steel",
  "Custom Steel Fabrication",
  "Protective Coatings",
  "Structural Beams",
  "Fasteners & Hardware",
]

export function Footer() {
  return (
    <footer className="bg-[#0c1a2e]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="h-8 w-1.5 bg-[#5a9be0]" />
                <div className="h-6 w-1.5 bg-[#5a9be0]/60" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {"Maverick's"} <span className="text-[#5a9be0]">LLC</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/60">
              Empowering construction and mining industries with premium steel
              solutions since 2010. Your trusted partner in Dallas, TX.
            </p>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/10 text-white/60 transition-colors hover:bg-[#5a9be0] hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/10 text-white/60 transition-colors hover:bg-[#5a9be0] hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-[#5a9be0]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Our Products
            </h3>
            <ul className="flex flex-col gap-2.5">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-white/60">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#5a9be0]" />
                <span className="text-sm leading-relaxed text-white/60">
                  2723 Harbinger Ln, Dallas, TX 75287, United States
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#5a9be0]" />
                <a
                  href="tel: (415) 475-9623 "
                  className="text-sm text-white/60 transition-colors hover:text-[#5a9be0]"
                >
                  +1 (415) 475-9623
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#5a9be0]" />
                <a
                  href="support@maverickllctexas.com"
                  className="text-sm text-white/60 transition-colors hover:text-[#5a9be0]"
                >
                  support@maverickllctexas.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-white/40">
                Mon - Fri: 8:00 AM - 5:00 PM
              </p>
              <p className="text-xs text-white/40">Sat - Sun: Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 sm:flex-row">
          <p className="text-xs text-white/40">
            {"2026 Maverick's LLC. All rights reserved."}
          </p>
          <div className="flex gap-6">
            <Link
              href="/contact"
              className="text-xs text-white/40 transition-colors hover:text-[#5a9be0]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="text-xs text-white/40 transition-colors hover:text-[#5a9be0]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
