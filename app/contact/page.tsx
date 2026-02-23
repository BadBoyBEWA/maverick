import type { Metadata } from 'next'
import { PageHero } from '@/components/motion'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactInfo } from '@/components/contact/contact-info'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Get in touch with Maverick's LLC for quotes, project consultations, and customer support. Located in Dallas, TX.",
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Ready to start your next project? Get in touch with our team for quotes, consultations, and support."
        backgroundImage="/images/contact-hero.jpg"
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </>
  )
}
