import { useState, useEffect, useCallback } from "react"
import type { AccessibilitySettings } from "./types"
import { DEFAULT_SETTINGS, ALL_ROOT_CLASSES } from "./types"
import { MotionGlobalConfig } from "motion-utils"

let _origAnimate: typeof Element.prototype.animate | null = null

function stopWAAPI() {
  document.getAnimations().forEach((a) => a.pause())
  MotionGlobalConfig.instantAnimations = true
  if (!_origAnimate) {
    _origAnimate = Element.prototype.animate
    Element.prototype.animate = function (this: Element, ...args) {
      const anim = _origAnimate!.apply(this, args)
      anim.pause()
      return anim
    }
  }
}

function resumeWAAPI() {
  document.getAnimations().forEach((a) => {
    try { a.play() } catch { /* already finished */ }
  })
  MotionGlobalConfig.instantAnimations = false
  if (_origAnimate) {
    Element.prototype.animate = _origAnimate
    _origAnimate = null
  }
}

function applyRootClasses(settings: AccessibilitySettings) {
  if (typeof document === "undefined") return
  const root = document.documentElement

  ALL_ROOT_CLASSES.forEach((cls) => {
    root.classList.remove(cls)
    document.body.classList.remove(cls)
  })

  if (settings.fontSize > 0) root.classList.add(`a11y-font-size-${settings.fontSize}`)
  if (settings.lineHeight > 0) root.classList.add(`a11y-line-height-${settings.lineHeight}`)
  if (settings.textAlign !== "off") root.classList.add(`a11y-align-${settings.textAlign}`)
  if (settings.dyslexicFont) root.classList.add("a11y-dyslexic-font")
  if (settings.grayscale) document.body.classList.add("a11y-grayscale")
  if (settings.stopAnimations) {
    root.classList.add("a11y-stop-animations")
    stopWAAPI()
  } else {
    resumeWAAPI()
  }
  if (settings.bigCursor) root.classList.add("a11y-big-cursor")
}

export function useSettings(
  storageKey: string,
  initialSettings?: Partial<AccessibilitySettings>,
  onSettingsChange?: (settings: AccessibilitySettings) => void,
) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window === "undefined") {
      return { ...DEFAULT_SETTINGS, ...initialSettings }
    }

    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved), ...initialSettings }
      }
    } catch (error) {
      console.error(`[ieee-atiig-accessibility-menu] Failed to parse stored settings:`, error)
    }

    return { ...DEFAULT_SETTINGS, ...initialSettings }
  })

  useEffect(() => {
    applyRootClasses(settings)
    return () => {
      if (settings.stopAnimations) resumeWAAPI()
      ALL_ROOT_CLASSES.forEach((cls) => {
        document.documentElement.classList.remove(cls)
        document.body.classList.remove(cls)
      })
    }
  }, [settings])

  const persist = useCallback(
    (next: AccessibilitySettings) => {
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(storageKey, JSON.stringify(next))
        } catch (error) {
          console.error(`[ieee-atiig-accessibility-menu] Failed to persist settings:`, error)
        }
      }
      onSettingsChange?.(next)
    },
    [storageKey, onSettingsChange],
  )

  const setVal = useCallback(
    <K extends keyof AccessibilitySettings>(key: K, val: AccessibilitySettings[K]) => {
      setSettings((prev) => {
        const next = { ...prev, [key]: val }
        persist(next)
        return next
      })
    },
    [persist],
  )

  const resetSettings = useCallback(() => {
    const defaults = { ...DEFAULT_SETTINGS, ...initialSettings }
    setSettings(defaults)
    persist(defaults)
  }, [initialSettings, persist])

  return { settings, setVal, resetSettings }
}
