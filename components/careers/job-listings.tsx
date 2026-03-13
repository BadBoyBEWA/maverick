"use client"

import { useState, FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Section, FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"
import { MapPin, Clock, DollarSign, ChevronDown, ChevronUp, CheckCircle2, Loader2 } from "lucide-react"

type Job = {
  title: string
  department: string
  type: string
  salary: string
  location: string
  Hours: string
  requirements: string[]
  qualifications: string[]
  benefits: string[]
}

const jobs: Job[] = [
  {
    title: " Accounts Payable (AP) Clerk",
    department: "Accounting",
    type: "Full-time",
    salary: " $1,850.00 Bi-Weekly",
    location: "REMOTE",
    Hours: "Monday - Friday,9AM - 2PM (EST) 5 HOURS",
    requirements: [
      " Process high-volume vendor invoices from receipt through approval and posting (coding, matching, routing, and issue resolution.) ",
      " Perform 2-way/3-way matching when applicable; follow up with internal stakeholders to resolve discrepancies. ",
      " Maintain vendor records and support vendor onboarding/updates.",
      " Prepare and assist with weekly payment runs, ensuring proper approvals and audit trail. ",
      "  Support month-end close activities related to AP ",
      " File and maintain organized digital documentation to support internal controls and audit readiness. ",
      " Assist with continuous improvement of AP processes and documentation as the company scales. ",
    ],
    qualifications: [
      "  1+ years of accounts payable experience, preferably in a high-volume environment.",
      "  Proficiency with Excel and comfort learning new systems/tools.",
      "  Strong attention to detail and ability to manage deadlines in a high-transaction environment.",
      "  Clear written and verbal communication skills; able to collaborate with field and office stakeholders. ",
      "  High integrity and discretion when handling financial data.",
    ],
    benefits: [
      "  Comprehensive benefits package, including medical, dental, vision, and 401(k). ",
      "  Culture anchored in safety and operational excellence"
    ],
  },
  {
    title: "Sales Representative",
    department: "Sales",
    type: "Full-time",
    salary: "$2,500.00 Bi-Weekly ",
    location: " REMOTE",
    Hours: "Monday - Friday, 9AM - 2PM (EST) 5 HOURS",
    requirements: [
      "  Provide market intelligence to customers and become a trusted partner ",
      "  Leverage business and market understanding to drive profitability and growth for both customers and Maverick's LLC",
      "  Construct good customer agreements that reduce risk for Steel Tech.",
      "  Hold customers accountable to the terms of those agreements, including responsibility for obsolete and slow-moving inventory  ",
      "  Develop your knowledge of the market and our industry ",
      "  Engage in your education and development within the Company  ",
      "  Ensure pricing updates are clearly communicated to Support Team in a timely manner ",
      "  Collaborate with your Support Team to ensure excellent customer service  ",
      
    ],
    qualifications: [
      "  Strong skills in Sales and Account Management to engage clients, maintain relationships, and drive sales growth ",
      "  Proficiency in Customer Service and Customer Satisfaction to address client inquiries, issues, and maintain a positive experience ",
      "  Ability to thrive in a fast-paced, collaborative environment with excellent communication and organizational skills ",
      "  Ability to understand and articulate technical solutions",
      "  Familiarity with the steel or manufacturing industry is an advantage ",
      "  Proficiency with CRM software and Microsoft Office Suite  ",
      "  High school diploma or equivalent; college degree in business or related field is a plus ",
    ],
    benefits: [
      "  IRA Contribution, Paid annual Leave in Addition to maternity, paternity. ",
      "  Opportunity to gain experience and grow within the company. ",
      "  Supportive team environment with ongoing training and development.",
    ],
  },
  {
    title: " Executive Assistant",
    department: "administration",
    type: "Full-time",
    salary: " $2,550.00 Bi-Weekly",
    location: "REMOTE",
    Hours: "Monday - Friday, 9AM - 5PM (EST) 5hours",
    requirements: [
      "  Prioritize and handle incoming communication, including greeting guests, emails, phone calls, and inquiries, with discretion and responsiveness ",
      "  Assist in planning and coordinating special events, conferences, and board meetings, ensuring successful execution and smooth logistics.",
      "  Collects and coordinates project status and program updates for executive review within prescribed timeframe and distribute to division or company as directed.",
      "  Analyzes data and information collected to proactively support and recommend efficiencies and cost savings to executive leadership. ",
      "  Efficiently manage the executives' calendars, appointments, and travel arrangements, ensuring optimal use of their time and resources ",
      "   Perform additional assignments per management’s direction such as attend meetings to note take. ",
      "   Creates presentations and communications using gathered data, spreadsheets, information and guidance from executive leadership.",
      "  Maintains knowledge of Company’s values and strategic plan as well as follow corporate procedures and policies. ",
    ],
    qualifications: [
      "  Project tracking, reporting and program coordination experience required.",
      "  Knowledge and ability in MS Office Suite, including Word, Excel, PowerPoint, SharePoint required. ",
      "  Knowledge of construction project management scheduling and project controls software preferred, including HCSS Heavy Job and Procore (preferred but training will be supplied if not) ",
      "  Technical and professional writing and correspondence skills required.",
      "  Strong communication and presentation skills required.",
      "  Able to maintain strict confidentiality with company and personnel matters.",
    ],
    benefits: [
      "  IRA Contribution, Paid annual Leave in Addition to maternity, paternity. ",
      "  Opportunity to gain experience and grow within the company. ",
      "  Supportive team environment with ongoing training and development. ",
    ],
  },
]

export function JobListings() {
  const [openJob, setOpenJob] = useState<string | null>(null)
  const [applyingTo, setApplyingTo] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)

  // handle actual form submission by calling our API route
  const handleApply = async (jobTitle: string, formData: FormData) => {
    setLoading(true)
    try {
      // append job title before sending
      formData.append('jobTitle', jobTitle)

      const res = await fetch('/api/apply', {
        method: 'POST',
        body: formData, // send as multipart/form-data
      })

      const data = await res.json()
      if (data.success) {
        setSubmitted((prev) => new Set(prev).add(jobTitle))
        setApplyingTo(null)
      } else {
        // you could display error message to user
        console.error('Application failed:', data.error)
      }
    } catch (err) {
      console.error('Network error submitting application', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section className="bg-background">
      <FadeIn>
        <div>
          <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-primary">
            Open Positions
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Current Opportunities
          </h2>
          <p className="mt-3 text-muted-foreground">
            {`We're growing and looking for talented people to join our team.`}
          </p>
        </div>
      </FadeIn>

      <StaggerContainer className="mt-10 flex flex-col gap-4" staggerDelay={0.1}>
        {jobs.map((job) => (
          <StaggerItem key={job.title}>
            <div className="rounded-sm border border-border bg-card overflow-hidden transition-all hover:border-primary/20">
              <button
                onClick={() =>
                  setOpenJob(openJob === job.title ? null : job.title)
                }
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                  <h3 className="font-semibold text-foreground">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      {job.salary}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {job.Hours}
                    </span>
                    <span className="rounded-sm bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {job.department}
                    </span>
                  </div>
                </div>
                {openJob === job.title ? (
                  <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                )}
              </button>

              <AnimatePresence>
                {openJob === job.title && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border p-5">
                      <div className="grid gap-6 md:grid-cols-3">
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                            Requirements
                          </h4>
                          <ul className="mt-3 flex flex-col gap-2">
                            {job.requirements.map((req) => (
                              <li
                                key={req}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                            Qualifications
                          </h4>
                          <ul className="mt-3 flex flex-col gap-2">
                            {job.qualifications.map((q) => (
                              <li
                                key={q}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                {q}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                            Benefits
                          </h4>
                          <ul className="mt-3 flex flex-col gap-2">
                            {job.benefits.map((b) => (
                              <li
                                key={b}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {submitted.has(job.title) ? (
                        <div className="mt-6 flex items-center gap-2 rounded-sm bg-primary/10 p-4">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                          <p className="text-sm font-medium text-primary">
                            Application submitted successfully! We will be in touch.
                          </p>
                        </div>
                      ) : (
                        <button
                          onClick={() => setApplyingTo(job.title)}
                          className="mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                        >
                          Apply Now
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Application Modal */}
      <AnimatePresence>
        {applyingTo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setApplyingTo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-sm border border-border bg-card p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-foreground">
                Apply for {applyingTo}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill in your details below. We will review your application promptly.
              </p>
              <form
                onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                  e.preventDefault()
                  const form = e.currentTarget as HTMLFormElement
                  const data = new FormData(form)
                  await handleApply(applyingTo!, data)
                }}
                className="mt-6 flex flex-col gap-4"
              >
                <div>
                  <label htmlFor="apply-name" className="mb-1 block text-xs font-medium text-foreground">
                    Full Name
                  </label>
                  <input
                    id="apply-name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="apply-email" className="mb-1 block text-xs font-medium text-foreground">
                    Email
                  </label>
                  <input
                    id="apply-email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="apply-message" className="mb-1 block text-xs font-medium text-foreground">
                    Cover Letter
                  </label>
                  <textarea
                    id="apply-message"
                    name="coverLetter"
                    rows={3}
                    className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    placeholder="Tell us why you're a great fit..."
                  />
                </div>
                {/* <div>
                  <label htmlFor="apply-resume" className="mb-1 block text-xs font-medium text-foreground">
                    Upload CV / Resume
                  </label>
                  <input
                    id="apply-resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                </div> */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setApplyingTo(null)}
                    className="rounded-sm border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-background"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
