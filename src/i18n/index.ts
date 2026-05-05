import { useSyncExternalStore } from "react";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { en } from "./en";
import { de } from "./de";

// ─────────────────────────────────────────────────────────────────────────────
// MINDDRIFT i18n setup.
//
// Goals (MVP):
//   - device locale starting with "de"  → German
//   - everything else                   → English
//   - fallback to English for missing keys / unsupported locales
//   - single shared instance, initialised once at module load
//   - tiny pub/sub so components can re-render after a manual locale switch
// ─────────────────────────────────────────────────────────────────────────────

export type SupportedLocale = "de" | "en";

function detectLocale(): SupportedLocale {
  try {
    const locales = Localization.getLocales?.();
    const tag =
      (locales && locales.length > 0 && locales[0]?.languageTag) || "en";
    return tag.toLowerCase().startsWith("de") ? "de" : "en";
  } catch {
    return "en";
  }
}

const i18n = new I18n({ en, de });

i18n.locale = detectLocale();
i18n.enableFallback = true;
i18n.defaultLocale = "en";

// ── tiny pub/sub for locale changes ──────────────────────────────────────────
const listeners = new Set<(locale: SupportedLocale) => void>();

function subscribe(listener: (locale: SupportedLocale) => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Currently active locale, narrowed to the languages we actually support.
 * Use this for any locale-aware logic outside of pure translations
 * (e.g. choosing `exercise.textDe` vs `exercise.textEn`,
 * setting the `Accept-Language` header).
 */
export function getCurrentLocale(): SupportedLocale {
  return i18n.locale === "de" ? "de" : "en";
}

/**
 * Switch the active locale at runtime and notify all subscribers
 * so React components can re-render with the new translations.
 */
export function setLocale(locale: SupportedLocale): void {
  if (i18n.locale === locale) return;
  i18n.locale = locale;
  listeners.forEach((listener) => listener(locale));
}

/**
 * Toggle between German and English.
 * Returns the new active locale.
 */
export function toggleLocale(): SupportedLocale {
  const next: SupportedLocale = getCurrentLocale() === "de" ? "en" : "de";
  setLocale(next);
  return next;
}

/**
 * React hook returning the current locale and re-rendering the
 * caller whenever the locale changes via `setLocale` / `toggleLocale`.
 *
 * Implemented with `useSyncExternalStore`, the canonical React API for
 * subscribing to an external store. This guarantees a re-render on every
 * locale change without any state-bailout pitfalls.
 */
export function useLocale(): SupportedLocale {
  return useSyncExternalStore(subscribe, getCurrentLocale, getCurrentLocale);
}

/**
 * React hook returning a `t` function that is locale-aware AND
 * gets a fresh identity on every locale change.
 *
 * IMPORTANT:
 * The React Compiler memoises JSX based on the identities of values used
 * inside it. The plain module-level `t()` is referentially stable, so the
 * compiler thinks translated text never changes — that is why a runtime
 * locale switch had no visible effect. By returning a NEW `t` function
 * whenever the locale changes, every JSX expression that calls it is
 * correctly re-evaluated.
 */
export function useTranslation(): {
  t: (key: string, options?: object) => string;
  locale: SupportedLocale;
} {
  const locale = useLocale();
  // The arrow function captures `locale` so it has a new identity per locale.
  // We deliberately do NOT use the `locale` value inside, because `i18n.t`
  // already reads the up-to-date locale from the i18n instance.
  const tBound = (key: string, options?: object) => {
    void locale; // ensure compiler sees the dependency
    return i18n.t(key, options);
  };
  return { t: tBound, locale };
}

/**
 * Module-level translate helper. Safe to use OUTSIDE React render trees
 * (e.g. inside API helpers). Inside components, prefer `useTranslation()`
 * so that a runtime locale switch reliably triggers a re-render — the
 * React Compiler can otherwise treat module-level `t` as a pure function
 * and skip JSX recomputation.
 */
export function t(key: string, options?: object): string {
  return i18n.t(key, options);
}

export default i18n;
