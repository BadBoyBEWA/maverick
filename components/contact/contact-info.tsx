"use client"

import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { FadeIn } from "@/components/motion"

const contactDetails = [
  {
    icon: MapPin,
    label: "Our Location",
    value: "1234 Industrial Blvd, Suite 500",
    extra: "Dallas, TX 75201",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(415) 475-9623",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@maverickllctexas.com",
    extra: "humanresourcesdept@maverickllctexas.com",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon - Fri: 7:00 AM - 6:00 PM",
    extra: "Sat: 8:00 AM - 2:00 PM",
  },
]

export function ContactInfo() {
  return (
    <FadeIn delay={0.2}>
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Get In Touch
          </h2>
          <p className="text-muted-foreground">
            Visit us at our Dallas headquarters or reach out through any of the
            channels below. We are here to help with your steel and roofing
            supply needs.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {contactDetails.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {item.label}
                </p>
                <p className="text-sm text-muted-foreground">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.extra}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Map embed placeholder */}
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="relative aspect-video bg-card">
            <iframe
              title="Maverick's LLC Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d214587.2237691665!2d-96.87194824364518!3d32.82058448437128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c19f77b45974b%3A0xb9ec9ba4f647571f!2sDallas%2C%20TX!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              className="absolute inset-0 h-full w-full border-0 grayscale"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
