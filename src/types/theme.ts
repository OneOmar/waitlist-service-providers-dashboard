/**
 * Maps semantic token names to CSS custom properties defined in
 * `src/styles/design-tokens.css` — use with `var(...)` when utilities cannot apply.
 */
export const colorVar = {
  brandPrimary: '--color-brand-primary',
  brandPrimaryHover: '--color-brand-primary-hover',
  danger: '--color-danger',
  dangerHover: '--color-danger-hover',
  surfacePage: '--color-surface-page',
  surfaceSidebar: '--color-surface-sidebar',
  surfaceElevated: '--color-surface-elevated',
  surfaceMuted: '--color-surface-muted',
  surfaceTableRowAlt: '--color-surface-table-row-alt',
  textPrimary: '--color-text-primary',
  textSecondary: '--color-text-secondary',
  textMuted: '--color-text-muted',
  textOnBrand: '--color-text-on-brand',
  textOnDanger: '--color-text-on-danger',
  textSuccess: '--color-text-success',
  textDanger: '--color-text-danger',
  borderDefault: '--color-border-default',
  borderStrong: '--color-border-strong',
  borderFocus: '--color-border-focus',
} as const

export type ColorVarKey = keyof typeof colorVar

export function cssColorVar(key: ColorVarKey): string {
  return `var(${colorVar[key]})`
}
