"use client"

import { AccessibilityMenu } from "ieee-atiig-accessibility-menu"

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>ieee-atiig-accessibility-menu Next.js Example</h1>
      <p>
        This demonstrates the accessibility menu in a Next.js app router
        application. Note the <code>"use client"</code> directive — the
        component uses browser APIs internally.
      </p>
      <AccessibilityMenu />
    </main>
  )
}
