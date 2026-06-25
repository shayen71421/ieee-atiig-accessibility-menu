import { useState, useEffect } from "react"

/**
 * Tracks the vertical mouse/touch position for the reading aid overlay.
 * Falls back to a safe default during SSR.
 */
export function useMousePosition(isMobile: boolean): { y: number } {
  const [mousePos, setMousePos] = useState({ y: 300 })

  useEffect(() => {
    if (isMobile) {
      const handleTouch = (e: TouchEvent) => {
        if (e.touches.length > 0) setMousePos({ y: e.touches[0].clientY })
      }
      window.addEventListener("touchmove", handleTouch, { passive: true })
      return () => window.removeEventListener("touchmove", handleTouch)
    }

    const handleMouseMove = (e: MouseEvent) => setMousePos({ y: e.clientY })
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isMobile])

  return mousePos
}
