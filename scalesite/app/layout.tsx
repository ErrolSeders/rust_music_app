import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Scale Ring',
  description: 'A tool for exploring musical scales and chords on guitar',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} font-light bg-ps1grey-500`}>{children}</body>
    </html>
  )
}
