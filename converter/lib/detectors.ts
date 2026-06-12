/**
 * Smart detectors — the key differentiator from existing tools.
 * Detects semantic meaning of strings instead of just returning z.string()
 */

const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  datetime: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
  date: /^\d{4}-\d{2}-\d{2}$/,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  url: /^https?:\/\/.+/,
} as const

export type StringRefinement = keyof typeof PATTERNS | "plainText"

export function detectStringRefinement(value: string): StringRefinement {
  for (const [type, regex] of Object.entries(PATTERNS)) {
    if (regex.test(value)) return type as StringRefinement
  }
  return "plainText"
}
