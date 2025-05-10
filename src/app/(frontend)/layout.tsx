import React from 'react'
import './styles.css'
import { NavBar } from './components/navBar/NavBar'
import StoreProvider from './components/StoreProvider'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <NavBar />
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  )
}
