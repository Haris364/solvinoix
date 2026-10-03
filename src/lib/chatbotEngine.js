import { responses, TYPING_MAX_MS, TYPING_MIN_MS, TYPING_PER_CHAR_MS } from '../data/chatbot'

/**
 * The reply matcher.
 *
 * Deliberately simple and fully local: there is no API call, so the assistant
 * cannot invent anything. It maps words a visitor actually typed onto an answer
 * that was written and approved in `data/chatbot.js`, and falls back to an
 * honest "here is what I can help with" when it recognises nothing.
 *
 * Matching is whole-word, so "ai" does not fire on "said" or "email", and the
 * longest keyword wins, so "case study" beats "case". Keywords are scanned in
 * descending length order for exactly that reason.
 */

const KEYWORDS = Object.keys(responses).sort((a, b) => b.length - a.length)

/** Escapes a keyword for literal use inside a regular expression. */
function escape(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Pre-built, so the patterns are compiled once rather than per keystroke. */
const PATTERNS = KEYWORDS.map((keyword) => ({
  keyword,
  pattern: new RegExp(`(?:^|[^a-z0-9])${escape(keyword.toLowerCase())}(?:$|[^a-z0-9])`, 'i'),
}))

/** Returns the answer lines for a free-text question, or null if unrecognised. */
export function matchResponse(text) {
  const clean = String(text ?? '').trim()
  if (!clean) return null

  for (const { keyword, pattern } of PATTERNS) {
    if (pattern.test(clean)) return responses[keyword]
  }

  return null
}

/** Returns the answer lines for a quick action by its id. */
export function findResponse(id) {
  return responses[id] ?? null
}

/** Flattens an answer into the single string a message bubble renders. */
export function toMessage(lines, fallback) {
  if (Array.isArray(lines) && lines.length > 0) return lines.join(' ')
  return fallback
}

/**
 * How long the typing indicator should run for a given reply, paced off its
 * length so a two-line answer does not flash past.
 */
export function typingDuration(text) {
  const length = String(text ?? '').length
  return Math.min(TYPING_MAX_MS, TYPING_MIN_MS + length * TYPING_PER_CHAR_MS)
}

/** The fallback reply, exposed so the component does not reach into the data. */
export function fallbackReply() {
  return responses.default.join(' ')
}
