import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Facebook Cover Generaot',
  description: 'Generaot',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
