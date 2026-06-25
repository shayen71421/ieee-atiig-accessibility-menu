import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Detects if the viewport is mobile-sized.
 * The original component imported this from a project-specific `@/hooks/use-mobile` module.
 * This implementation uses a basic window width check compatible with SSR.
 */
export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [breakpoint])

  return isMobile
}
