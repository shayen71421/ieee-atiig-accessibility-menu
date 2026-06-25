
"use client"

import { useState } from "react"
import { useIsMobile } from "./use-is-mobile"
import { useMousePosition } from "./use-mouse-position"
import { useSettings } from "./use-settings"
import { useInjectStyles } from "./use-inject-styles"
import { ReadingAid } from "./reading-aid"
import { AccessibilityToggle } from "./accessibility-toggle"
import type { AccessibilityMenuProps } from "./types"
import {
  DEFAULT_LABELS,
  DEFAULT_Z_INDEX,
  DEFAULT_THEME,
} from "./types"
import { styles } from "./styles"

const ALIGNMENT_ICONS = {
  off: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
  left: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
      <path d="M3 6h18" />
      <path d="M3 12h12" />
      <path d="M3 18h6" />
    </svg>
  ),
  center: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
      <path d="M3 6h18" />
      <path d="M6 12h12" />
      <path d="M9 18h6" />
    </svg>
  ),
  right: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
      <path d="M3 6h18" />
      <path d="M9 12h12" />
      <path d="M15 18h6" />
    </svg>
  ),
  justify: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
      <path d="M3 6h18" />
      <path d="M3 12h18" />
      <path d="M3 18h18" />
    </svg>
  ),
} as const

const ALIGNMENT_VALUES = ["off", "left", "center", "right", "justify"] as const

export function AccessibilityMenu({
  initialSettings,
  storageKey = "ieee-atiig-accessibility-menu-settings",
  position = "bottom-left",
  positionOffset = 0,
  labels: labelsProp,
  className = "",
  buttonClassName = "",
  panelClassName = "",
  zIndex: zIndexProp,
  onSettingsChange,
  onReset,
  showResetButton = true,
  showFontSize = true,
  showLineHeight = true,
  showAlignment = true,
  showReadingAid = true,
  showDesaturate = true,
  showDyslexicFont = true,
  showBigCursor = true,
  showStopAnimations = true,
  theme: themeProp,
  ssr = false,
}: AccessibilityMenuProps) {
  if (typeof window === "undefined") {
    const isRight = position === "bottom-right"
    const offset = typeof positionOffset === "number" ? positionOffset : positionOffset.y
    return (
      <button
        suppressHydrationWarning
        className={`a11y-menu-button ${buttonClassName}`}
        data-open={false}
        data-right={isRight}
        style={{
          bottom: `${20 + offset}px`,
          left: isRight ? undefined : `${20 + offset}px`,
          right: isRight ? `${20 + offset}px` : undefined,
        }}
        aria-label={labelsProp?.menuButton || "Accessibility Menu"}
        type="button"
      />
    )
  }

  useInjectStyles(styles)

  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()
  const mousePos = useMousePosition(isMobile)
  const { settings, setVal, resetSettings } = useSettings(
    storageKey,
    initialSettings,
    onSettingsChange,
  )

  const labels = { ...DEFAULT_LABELS, ...labelsProp }
  const zIndex = { ...DEFAULT_Z_INDEX, ...zIndexProp }
  const theme = { ...DEFAULT_THEME, ...themeProp }

  const offsetNum = typeof positionOffset === "number" ? positionOffset : positionOffset.y
  const isRight = position === "bottom-right"

  const handleReset = () => {
    resetSettings()
    onReset?.()
  }

  return (
    <>
      {settings.readingAid && (
        <ReadingAid
          mouseY={mousePos.y}
          size={settings.readingAidSize}
          zIndex={zIndex.readingAid}
          theme={theme}
        />
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`a11y-menu-button ${buttonClassName}`}
        data-open={isOpen}
        data-right={isRight}
        style={{
          bottom: `${20 + offsetNum}px`,
          left: isRight ? undefined : `${20 + offsetNum}px`,
          right: isRight ? `${20 + offsetNum}px` : undefined,
          zIndex: zIndex.button,
          background: isOpen
            ? theme.primary
            : `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
          boxShadow: isOpen
            ? `0 10px 20px rgba(2, 58, 116, 0.3)`
            : `0 4px 30px rgba(2, 58, 116, 0.28)`,
        }}
        aria-label={labels.menuButton}
        type="button"
      >
        <svg
          className="a11y-menu-button-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="16" cy="4" r="1" />
          <path d="m18 19 1-7-6 1" />
          <path d="m5 8 3-3 5.5 3-2.36 3.5" />
          <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
          <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="a11y-menu-overlay"
            onClick={() => setIsOpen(false)}
            style={{ zIndex: zIndex.overlay }}
          />
          <div
            className={`a11y-menu-panel ${panelClassName} ${className}`}
            data-right={isRight}
            style={{
              bottom: `${80 + offsetNum}px`,
              left: isRight ? undefined : `${20 + offsetNum}px`,
              right: isRight ? `${20 + offsetNum}px` : undefined,
              zIndex: zIndex.panel,
              backgroundColor: theme.background,
              borderColor: theme.border,
            }}
          >
            <div className="a11y-menu-header">
              <div className="a11y-menu-header-left">
                <div
                  className="a11y-menu-header-icon"
                  style={{
                    background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="16" cy="4" r="1" />
                    <path d="m18 19 1-7-6 1" />
                    <path d="m5 8 3-3 5.5 3-2.36 3.5" />
                    <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
                    <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
                  </svg>
                </div>
                <h3 className="a11y-menu-title" style={{ color: theme.text }}>
                  {labels.menuTitle}
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="a11y-menu-close"
                type="button"
                aria-label="Close"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="a11y-menu-body">
              {showFontSize && (
                <Section label={labels.fontSize}>
                  <ButtonGroup
                    value={settings.fontSize}
                    options={[0, 10, 20, 30]}
                    renderLabel={(v) => (v === 0 ? labels.off : `+${v}%`)}
                    onChange={(v) => setVal("fontSize", v)}
                    activeColor={theme.primary}
                  />
                </Section>
              )}

              {showLineHeight && (
                <Section label={labels.lineHeight}>
                  <ButtonGroup
                    value={settings.lineHeight}
                    options={[0, 15, 20, 25]}
                    renderLabel={(v) => (v === 0 ? labels.off : `${1 + v / 100}x`)}
                    onChange={(v) => setVal("lineHeight", v)}
                    activeColor={theme.primary}
                  />
                </Section>
              )}

              {showAlignment && (
                <Section label={labels.alignment}>
                  <ButtonGroup
                    value={settings.textAlign}
                    options={ALIGNMENT_VALUES}
                    renderLabel={(v: string) => ALIGNMENT_ICONS[v as keyof typeof ALIGNMENT_ICONS]}
                    onChange={(v) => setVal("textAlign", v)}
                    activeColor={theme.primary}
                  />
                </Section>
              )}

              {showReadingAid && (
                <Section label={labels.readingAid}>
                  <ButtonGroup
                    value={settings.readingAid ? settings.readingAidSize : 0}
                    options={[0, 0.9, 1, 1.2]}
                    renderLabel={(v) => (v === 0 ? labels.off : `${v}x`)}
                    onChange={(v) => {
                      if (v === 0) {
                        setVal("readingAid", false)
                      } else {
                        setVal("readingAid", true)
                        setVal("readingAidSize", v as number)
                      }
                    }}
                    activeColor={theme.accent}
                  />
                </Section>
              )}

              {showDesaturate && (
                <AccessibilityToggle
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="m4.93 4.93 1.41 1.41" />
                      <path d="m17.66 17.66 1.41 1.41" />
                      <path d="M2 12h2" />
                      <path d="M20 12h2" />
                      <path d="m6.34 17.66-1.41 1.41" />
                      <path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                  }
                  label={labels.desaturate}
                  isActive={settings.grayscale}
                  onToggle={() => setVal("grayscale", !settings.grayscale)}
                  theme={theme}
                />
              )}

              {showDyslexicFont && (
                <AccessibilityToggle
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                      <circle cx="16" cy="4" r="1" />
                      <path d="m18 19 1-7-6 1" />
                      <path d="m5 8 3-3 5.5 3-2.36 3.5" />
                      <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
                      <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
                    </svg>
                  }
                  label={labels.dyslexicFont}
                  isActive={settings.dyslexicFont}
                  onToggle={() => setVal("dyslexicFont", !settings.dyslexicFont)}
                  theme={theme}
                />
              )}

              {showBigCursor && (
                <AccessibilityToggle
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                      <path d="M3 3 9.77 19.47a.75.75 0 0 0 1.45.05L13 14.5l3 4.5.77.77a.75.75 0 0 0 1.06 0l3.94-3.94a.75.75 0 0 0 0-1.06L21 14.5l-4.5-3 5.47-1.78a.75.75 0 0 0-.05-1.45L3 3Z" />
                    </svg>
                  }
                  label={labels.bigCursor}
                  isActive={settings.bigCursor}
                  onToggle={() => setVal("bigCursor", !settings.bigCursor)}
                  theme={theme}
                />
              )}

              {showStopAnimations && (
                <AccessibilityToggle
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                      <path d="M12 2a10 10 0 0 1 7.38 16.75" />
                      <path d="M12 22a10 10 0 0 1-7.38-16.75" />
                      <path d="M12 22V2" />
                      <path d="M2 12h20" />
                    </svg>
                  }
                  label={labels.stopAnimations}
                  isActive={settings.stopAnimations}
                  onToggle={() => setVal("stopAnimations", !settings.stopAnimations)}
                  theme={theme}
                />
              )}
            </div>

            {showResetButton && (
              <button onClick={handleReset} className="a11y-menu-reset" type="button" style={{ color: theme.textMuted }}>
                {labels.reset}
              </button>
            )}
          </div>
        </>
      )}
    </>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="a11y-menu-section">
      <div className="a11y-menu-section-label">{label}</div>
      {children}
    </div>
  )
}

function ButtonGroup<T extends string | number>({
  value,
  options,
  renderLabel,
  onChange,
  activeColor,
}: {
  value: T
  options: readonly T[]
  renderLabel: (v: T) => string | React.ReactNode
  onChange: (v: T) => void
  activeColor: string
}) {
  return (
    <div className="a11y-menu-btn-group">
      {options.map((val) => (
        <button
          key={String(val)}
          onClick={() => onChange(val)}
          className="a11y-menu-btn-group-item"
          data-active={value === val}
          type="button"
          style={{ color: value === val ? activeColor : undefined }}
        >
          {renderLabel(val)}
        </button>
      ))}
    </div>
  )
}
