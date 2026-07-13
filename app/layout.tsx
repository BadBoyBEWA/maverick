import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
})
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: "Maverick's LLC | Steel Roofing & Structural Supplies in Benton Harbor, Michigan",
    template: "%s | Maverick's LLC",
  },
  description:
    "Maverick's LLC supplies steel roofing, structural steel, rebar, and custom fabrication from Benton Harbor, Michigan, serving Southwest Michigan and Northern Indiana.",
  keywords: [
    'steel roofing Michigan',
    'steel roofing Benton Harbor MI',
    'structural steel Southwest Michigan',
    'grade 60 rebar Michigan',
    'custom steel fabrication Benton Harbor',
    'metal roofing panels Michigan',
    'industrial steel supplier Southwest Michigan',
  ],
  openGraph: {
    title: "Maverick's LLC | Premium Steel & Roofing Supplies",
    description:
      'Empowering construction and mining with premium steel solutions since 2010.',
    type: 'website',
  },
  // add favicons; ensure the files exist under public/
  icons: {
    // primary icon is PNG in this project instead of .ico
    icon: '/favicon.png',
    shortcut: '/favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
