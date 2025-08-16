import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { NotificationProvider } from "../contexts/NotificationContext"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationProvider>{children}</NotificationProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
