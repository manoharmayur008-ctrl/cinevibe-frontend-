import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CineVibe - AI Movie Recommendations',
  description: 'Discover movies based on your mood and vibe with AI-powered recommendations',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dark text-white">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
