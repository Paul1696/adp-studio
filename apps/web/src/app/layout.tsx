import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { QueryProvider } from '@/components/layout/query-provider'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'ADP Studio',
    template: '%s | ADP Studio',
  },
  description:
    'Plateforme SaaS pour architectes, BIM Managers et professionnels de la construction.',
  keywords: ['BIM', 'architecture', 'construction', 'IA', 'gestion de projets'],
  authors: [{ name: 'ADP Studio' }],
  creator: 'ADP Studio',
  metadataBase: new URL('https://adp-studio.com'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://adp-studio.com',
    title: 'ADP Studio',
    description: 'Plateforme SaaS pour professionnels de la construction.',
    siteName: 'ADP Studio',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="fr"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
