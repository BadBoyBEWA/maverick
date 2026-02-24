"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { FadeIn } from "@/components/motion"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    // ADDED: marketing consent field - defaults to false (unchecked)
    marketingConsent: false,
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target
    // ADDED: handle checkbox separately
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    // Clear any previous errors when user starts typing
    if (error) setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      console.error('Form submission error:', err)
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setSubmitted(false)
    setError(null)
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
      // ADDED: reset marketing consent to false
      marketingConsent: false,
    })
  }

  if (submitted) {
    return (
      <FadeIn>
        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <CheckCircle className="mb-6 h-16 w-16 text-primary" />
          </motion.div>
          <h3 className="mb-2 text-2xl font-bold text-foreground">
            Message Sent Successfully
          </h3>
          <p className="mb-6 text-muted-foreground max-w-md">
            Thank you for reaching out, {formData.name}! Our team will review your inquiry 
            and get back to you within 24 hours.
          </p>
          <button
            onClick={handleReset}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Send another message
          </button>
        </div>
      </FadeIn>
    )
  }

  return (
    <FadeIn>
      <div className="rounded-lg border border-border bg-card p-8">
        <h2 className="mb-2 text-2xl font-bold text-foreground">
          Send Us a Message
        </h2>
        <p className="mb-8 text-muted-foreground">
          Fill out the form below and we will respond within one business day.
        </p>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Full Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                placeholder="John Doe"
                className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                placeholder="john@company.com"
                className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-foreground"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
                placeholder="(555) 123-4567"
                className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="company"
                className="text-sm font-medium text-foreground"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                disabled={loading}
                placeholder="Your Company"
                className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label
              htmlFor="subject"
              className="text-sm font-medium text-foreground"
            >
              Subject <span className="text-primary">*</span>
            </label>
            <select
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              disabled={loading}
              className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select a subject</option>
              <option value="quote">Request a Quote</option>
              <option value="product">Product Inquiry</option>
              <option value="custom">Custom Fabrication</option>
              <option value="support">Customer Support</option>
              <option value="partnership">Partnership Opportunity</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-foreground"
            >
              Message <span className="text-primary">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
              placeholder="Tell us about your project or inquiry..."
              className="resize-none rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          
          {/* ADDED: Marketing Consent Checkbox - Meets all Mailjet requirements */}
          <div className="flex items-start gap-3 mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-md border border-border">
            <input
              type="checkbox"
              id="marketingConsent"
              name="marketingConsent"
              checked={formData.marketingConsent}
              onChange={handleChange}
              disabled={loading}
              className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary disabled:opacity-50"
            />
            <div className="flex flex-col">
              <label
                htmlFor="marketingConsent"
                className="text-sm font-medium text-foreground"
              >
                Marketing Consent <span className="text-primary">*</span>
              </label>
              <p className="text-xs text-muted-foreground">
                I would like to receive occasional marketing updates about steel products, 
                special offers, and industry news from Maverick's LLC. You can unsubscribe at any time.
              </p>
              <p className="text-xs text-muted-foreground mt-1 italic">
                This box must be checked to receive marketing communications. It is unchecked by default.
              </p>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className={`h-4 w-4 ${loading ? 'animate-pulse' : ''}`} />
            {loading ? 'Sending...' : 'Send Message'}
          </button>
          
          {/* MODIFIED: Updated privacy text */}
          <p className="text-xs text-muted-foreground text-center mt-2">
            By submitting this form, you agree to our privacy policy. Marketing consent is optional 
            and separate from your inquiry.
          </p>
        </form>
      </div>
    </FadeIn>
  )
}