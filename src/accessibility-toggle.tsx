import type { ReactNode } from "react"
import type { ThemeColors } from "./types"
import { DEFAULT_THEME } from "./types"

interface Props {
  icon: ReactNode
  label: string
  isActive: boolean
  onToggle: () => void
  theme?: Partial<ThemeColors>
}

export function AccessibilityToggle({ icon, label, isActive, onToggle, theme: themeProp }: Props) {
  const t = { ...DEFAULT_THEME, ...themeProp }

  return (
    <button
      onClick={onToggle}
      className="a11y-menu-toggle"
      data-active={isActive}
      type="button"
      aria-pressed={isActive}
      style={{
        borderColor: isActive ? t.activeBorder : "transparent",
        backgroundColor: isActive ? t.activeBg : t.background,
      }}
    >
      <div className="a11y-menu-toggle-left">
        <div
          className="a11y-menu-toggle-icon-wrap"
          data-active={isActive}
          style={{
            background: isActive
              ? `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})`
              : undefined,
          }}
        >
          {icon}
        </div>
        <span
          className="a11y-menu-toggle-label"
          style={{ color: isActive ? t.primary : undefined }}
        >
          {label}
        </span>
      </div>
      <div
        className="a11y-menu-toggle-check"
        data-active={isActive}
        style={{
          backgroundColor: isActive ? t.accent : undefined,
          borderColor: isActive ? t.accent : t.border,
        }}
      >
        <svg
          className="a11y-menu-check-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    </button>
  )
}
