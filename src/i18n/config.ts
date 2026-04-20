// ─── i18n Configuration ──────────────────────────────────────
// FR + EN at launch. AR planned (RTL ready).

export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';
