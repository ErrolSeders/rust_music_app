import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'

const urbanist= Urbanist({subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Scale Ring',
  description: 'A tool for exploring musical scales and chords on guitar',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${urbanist.className} font-semibold bg-neutral-50`}>{children}</body>
    </html>
  )
}
