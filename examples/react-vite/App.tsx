import { AccessibilityMenu } from "@ieee-atiig/accessibility-menu"

function App() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "sans-serif", padding: "40px" }}>
      <h1>@ieee-atiig/accessibility-menu Demo</h1>
      <p>
        This example demonstrates the accessibility menu component in a
        React + Vite application. Click the accessibility icon in the
        bottom-left corner to open the menu.
      </p>
      <AccessibilityMenu />
    </div>
  )
}

export default App
