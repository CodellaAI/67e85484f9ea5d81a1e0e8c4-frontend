
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Simple Fullstack Demo',
  description: 'A minimalist fullstack application with NextJS and Express',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
          {children}
        </main>
      </body>
    </html>
  )
}
