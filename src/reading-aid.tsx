import type { ReadingAidProps } from "./types"
import { DEFAULT_THEME } from "./types"

export function ReadingAid({ mouseY, size, zIndex, theme: themeProp }: ReadingAidProps) {
  const theme = { ...DEFAULT_THEME, ...themeProp }
  const readingAidHeight = 56 * (size || 1)
  const offset = readingAidHeight / 2

  return (
    <>
      <div
        className="a11y-menu-reading-aid-shade"
        data-side="top"
        style={{
          height: `${Math.max(0, mouseY - offset)}px`,
          zIndex,
          background: `rgba(2, 58, 116, 0.62)`,
        }}
      />
      <div
        className="a11y-menu-reading-aid-shade"
        data-side="bottom"
        style={{
          top: `${mouseY + offset}px`,
          zIndex,
          background: `rgba(2, 58, 116, 0.62)`,
        }}
      />
      <div
        className="a11y-menu-reading-aid-bar"
        style={{
          top: `${mouseY - offset}px`,
          height: `${readingAidHeight}px`,
          zIndex: zIndex - 1,
          background: "rgba(1, 160, 160, 0.06)",
          borderTop: `2px solid ${theme.accentOverlay}`,
          borderBottom: `2px solid ${theme.accentOverlay}`,
        }}
      />
    </>
  )
}
