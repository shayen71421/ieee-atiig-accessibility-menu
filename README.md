# @ieee-atiig/accessibility-menu

A fully customizable React accessibility menu component. Provides font scaling, reading aids, color adjustments, and more to help make your web app more accessible.

## Features

- Font size adjustment
- Line height adjustment
- Text alignment control
- Reading aid (focus line overlay)
- Grayscale/desaturate mode
- Dyslexia-friendly font toggle
- Big cursor toggle
- Stop animations toggle
- Persistent settings (localStorage)
- Fully configurable labels, colors, and positioning
- SSR / Next.js compatible
- No external CSS framework required — ships with bundled styles
- TypeScript type definitions included

## Installation

```bash
npm install @ieee-atiig/accessibility-menu
```

## Basic Usage

```tsx
import { AccessibilityMenu } from "@ieee-atiig/accessibility-menu";

function App() {
  return (
    <>
      {/* Your app content */}
      <AccessibilityMenu />
    </>
  );
}
```

The component injects its own CSS at runtime — no additional imports needed.

### Manual CSS Import (optional)

If you prefer to load styles statically:

```tsx
import "@ieee-atiig/accessibility-menu/styles.css";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialSettings` | `Partial<AccessibilitySettings>` | `{}` | Initial settings overrides |
| `storageKey` | `string` | `"ieee-atiig-accessibility-menu-settings"` | localStorage key for persistence |
| `position` | `"bottom-left" \| "bottom-right"` | `"bottom-left"` | Menu position |
| `positionOffset` | `number \| { x: number, y: number }` | `0` | Offset from edge in px |
| `labels` | `Partial<SectionLabels>` | `{}` | Custom text labels |
| `className` | `string` | `""` | Additional class for root wrapper |
| `buttonClassName` | `string` | `""` | Additional class for the FAB |
| `panelClassName` | `string` | `""` | Additional class for the panel |
| `zIndex` | `Partial<ZIndexConfig>` | `{}` | Z-index overrides for layers |
| `onSettingsChange` | `(settings) => void` | — | Called when any setting changes |
| `onReset` | `() => void` | — | Called when settings are reset |
| `showResetButton` | `boolean` | `true` | Show/hide the reset button |
| `showFontSize` | `boolean` | `true` | Show/hide font size control |
| `showLineHeight` | `boolean` | `true` | Show/hide line height control |
| `showAlignment` | `boolean` | `true` | Show/hide alignment control |
| `showReadingAid` | `boolean` | `true` | Show/hide reading aid control |
| `showDesaturate` | `boolean` | `true` | Show/hide desaturate toggle |
| `showDyslexicFont` | `boolean` | `true` | Show/hide dyslexic font toggle |
| `showBigCursor` | `boolean` | `true` | Show/hide big cursor toggle |
| `showStopAnimations` | `boolean` | `true` | Show/hide stop animations toggle |
| `theme` | `Partial<ThemeColors>` | `{}` | Color theme customization |
| `icons` | `IconsConfig` | — | Custom icon elements |
| `fontSizeSteps` | `FontSizeStep[]` | `[0, 10, 20, 30]` | Custom font size steps |
| `lineHeightSteps` | `LineHeightStep[]` | `[0, 15, 20, 25]` | Custom line height steps |
| `readingAidSizes` | `number[]` | `[0, 0.9, 1, 1.2]` | Custom reading aid sizes |
| `ssr` | `boolean` | `false` | Enable SSR-safe rendering |

## Theming

```tsx
<AccessibilityMenu
  theme={{
    primary: "#1a365d",
    accent: "#2b6cb0",
    gradientFrom: "#1a365d",
    gradientTo: "#2b6cb0",
  }}
/>
```

## Custom Labels (i18n)

```tsx
<AccessibilityMenu
  labels={{
    menuTitle: "Accessibilité",
    fontSize: "Taille de police",
    reset: "Réinitialiser",
    off: "Désactivé",
  }}
/>
```

## Accessibility

- All controls are keyboard accessible
- `aria-label` applied to the menu button
- `aria-pressed` on toggle buttons
- Backdrop overlay dismiss on click
- Focus remains within the panel when open

## Browser Support

- Chrome, Firefox, Safari, Edge (last 2 major versions)
- IE is not supported

## License

MIT
