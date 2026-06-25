import type { ReactNode } from "react"

export type FontSizeStep = 0 | 10 | 20 | 30

export type LineHeightStep = 0 | 15 | 20 | 25

export type TextAlignOption = "off" | "left" | "center" | "right" | "justify"

export interface AccessibilitySettings {
  fontSize: FontSizeStep
  lineHeight: LineHeightStep
  textAlign: TextAlignOption
  dyslexicFont: boolean
  grayscale: boolean
  stopAnimations: boolean
  bigCursor: boolean
  readingAid: boolean
  readingAidSize: number
}

export type MenuPosition = "bottom-left" | "bottom-right"

export interface PositionOffset {
  x: number
  y: number
}

export interface ThemeColors {
  primary: string
  primaryHover: string
  accent: string
  accentOverlay: string
  border: string
  background: string
  text: string
  textMuted: string
  activeBg: string
  activeBorder: string
  gradientFrom: string
  gradientTo: string
}

export interface SectionLabels {
  fontSize: string
  lineHeight: string
  alignment: string
  readingAid: string
  desaturate: string
  dyslexicFont: string
  bigCursor: string
  stopAnimations: string
  reset: string
  menuTitle: string
  menuButton: string
  off: string
}

export interface ZIndexConfig {
  button: number
  overlay: number
  panel: number
  readingAid: number
}

export interface AccessibilityMenuProps {
  initialSettings?: Partial<AccessibilitySettings>
  storageKey?: string
  position?: MenuPosition
  positionOffset?: number | PositionOffset
  labels?: Partial<SectionLabels>
  className?: string
  buttonClassName?: string
  panelClassName?: string
  zIndex?: Partial<ZIndexConfig>
  onSettingsChange?: (settings: AccessibilitySettings) => void
  onReset?: () => void
  showResetButton?: boolean
  showFontSize?: boolean
  showLineHeight?: boolean
  showAlignment?: boolean
  showReadingAid?: boolean
  showDesaturate?: boolean
  showDyslexicFont?: boolean
  showBigCursor?: boolean
  showStopAnimations?: boolean
  theme?: Partial<ThemeColors>
}

export interface AccessibilityToggleProps {
  icon: ReactNode
  label: string
  isActive: boolean
  onToggle: () => void
  theme?: Partial<ThemeColors>
}

export interface ReadingAidProps {
  mouseY: number
  size: number
  zIndex: number
  theme?: Partial<ThemeColors>
}

export const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 0,
  lineHeight: 0,
  textAlign: "off",
  dyslexicFont: false,
  grayscale: false,
  stopAnimations: false,
  bigCursor: false,
  readingAid: false,
  readingAidSize: 1,
}

export const DEFAULT_LABELS: SectionLabels = {
  fontSize: "Font Size",
  lineHeight: "Line Height",
  alignment: "Alignment",
  readingAid: "Reading Aid",
  desaturate: "Desaturate",
  dyslexicFont: "Dyslexia Friendly",
  bigCursor: "Big Cursor",
  stopAnimations: "Stop Animations",
  reset: "Reset Settings",
  menuTitle: "Accessibility",
  menuButton: "Accessibility Menu",
  off: "Off",
}

export const DEFAULT_Z_INDEX: ZIndexConfig = {
  button: 60,
  overlay: 65,
  panel: 70,
  readingAid: 9998,
}

export const DEFAULT_THEME: ThemeColors = {
  primary: "#023A74",
  primaryHover: "#012a55",
  accent: "#01A0A0",
  accentOverlay: "rgba(1, 160, 160, 0.6)",
  border: "#e2e8f0",
  background: "#ffffff",
  text: "#0f172a",
  textMuted: "#94a3b8",
  activeBg: "rgba(1, 160, 160, 0.05)",
  activeBorder: "rgba(1, 160, 160, 0.2)",
  gradientFrom: "#023A74",
  gradientTo: "#01A0A0",
}

export const ROOT_CLASSES = {
  fontSize: (v: number) => `a11y-font-size-${v}`,
  lineHeight: (v: number) => `a11y-line-height-${v}`,
  textAlign: (v: string) => `a11y-align-${v}`,
  dyslexicFont: "a11y-dyslexic-font",
  grayscale: "a11y-grayscale",
  stopAnimations: "a11y-stop-animations",
  bigCursor: "a11y-big-cursor",
} as const

export const ALL_ROOT_CLASSES = [
  "a11y-font-size-10",
  "a11y-font-size-20",
  "a11y-font-size-30",
  "a11y-line-height-15",
  "a11y-line-height-20",
  "a11y-line-height-25",
  "a11y-align-left",
  "a11y-align-right",
  "a11y-align-center",
  "a11y-align-justify",
  "a11y-dyslexic-font",
  "a11y-grayscale",
  "a11y-stop-animations",
  "a11y-big-cursor",
] as const
