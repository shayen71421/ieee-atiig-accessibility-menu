import { useEffect } from "react"

const STYLE_ID = "ieee-atiig-accessibility-menu-injected-styles"

/**
 * Injects the package stylesheet into the document head at runtime.
 * This is automatically called by the component but can be used standalone.
 */
export function useInjectStyles(styles?: string) {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (document.getElementById(STYLE_ID)) return

    if (styles) {
      const style = document.createElement("style")
      style.id = STYLE_ID
      style.textContent = styles
      document.head.appendChild(style)
    }
  }, [styles])
}
