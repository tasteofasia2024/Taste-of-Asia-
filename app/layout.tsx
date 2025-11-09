import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Taste of Asia - Autentisk Asiatisk Mat i Säffle",
  description:
    "Välkommen till Taste of Asia i Säffle. Vi serverar autentisk asiatisk mat med färska ingredienser. Beställ avhämtning på 0533-16368. Lunchbuffé, à la carte, sushi och mer.",
  keywords: [
    "asiatisk mat",
    "restaurang Säffle",
    "kinesisk mat",
    "thailändsk mat",
    "sushi Säffle",
    "avhämtning",
    "lunchbuffé",
    "asiatisk restaurang",
    "Taste of Asia",
    "mat Säffle",
    "restaurang",
    "curry",
    "wok",
    "pad thai",
  ],
  authors: [{ name: "Taste of Asia" }],
  creator: "Taste of Asia",
  publisher: "Taste of Asia",
  icons: {
    icon: [
      { url: "/logo.jpg", sizes: "any" },
      { url: "/logo.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/logo.jpg", sizes: "16x16", type: "image/jpeg" },
    ],
    apple: [{ url: "/logo.jpg", sizes: "180x180", type: "image/jpeg" }],
    other: [
      {
        rel: "mask-icon",
        url: "/logo.jpg",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://tasteofasia.se",
    siteName: "Taste of Asia",
    title: "Taste of Asia - Autentisk Asiatisk Mat i Säffle",
    description:
      "Autentisk asiatisk mat i hjärtat av Säffle. Lunchbuffé, à la carte, sushi och mer. Beställ avhämtning på 0533-16368.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image0-diIlQYXGj0wajyLZNNdFIisrUE5Z5i.jpeg",
        width: 1200,
        height: 630,
        alt: "Taste of Asia restaurang interiör",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taste of Asia - Autentisk Asiatisk Mat i Säffle",
    description:
      "Autentisk asiatisk mat i hjärtat av Säffle. Lunchbuffé, à la carte, sushi och mer. Beställ avhämtning på 0533-16368.",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image0-diIlQYXGj0wajyLZNNdFIisrUE5Z5i.jpeg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  alternates: {
    canonical: "https://tasteofasia.se",
  },
  category: "restaurant",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" className="scroll-smooth">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
