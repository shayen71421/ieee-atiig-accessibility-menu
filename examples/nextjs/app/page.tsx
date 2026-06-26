"use client"

import { AccessibilityMenu } from "@ieee-atiig/accessibility-menu"

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "sans-serif", padding: "40px" }}>
      <h1>@ieee-atiig/accessibility-menu Next.js Example</h1>
      <p>
        This demonstrates the accessibility menu in a Next.js app router
        application. Note the <code>"use client"</code> directive — the
        component uses browser APIs internally.
      </p>
      <AccessibilityMenu />
    </main>
  )
}
