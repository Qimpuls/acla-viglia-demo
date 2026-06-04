import crypto from 'node:crypto'
import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'av_session'
const SESSION_DAYS = 60
export const SESSION_MAX_AGE = SESSION_DAYS * 24 * 60 * 60

function secret() {
  // In Produktion via Umgebungsvariable AUTH_SECRET setzen.
  return process.env.AUTH_SECRET || 'dev-only-insecure-secret'
}

function sign(value: string) {
  return crypto.createHmac('sha256', secret()).update(value).digest('base64url')
}

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ba.length !== bb.length) return false
  return crypto.timingSafeEqual(ba, bb)
}

/** Prüft die Eingabe gegen das in der Umgebung hinterlegte Passwort. */
export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  return safeEqual(input, expected)
}

export function createSessionToken(): string {
  const exp = Date.now() + SESSION_MAX_AGE * 1000
  const payload = `admin.${exp}`
  return `${payload}.${sign(payload)}`
}

function isValidToken(token: string | undefined): boolean {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 3) return false
  const [role, exp, sig] = parts
  if (!safeEqual(sig, sign(`${role}.${exp}`))) return false
  if (!Number(exp) || Number(exp) < Date.now()) return false
  return role === 'admin'
}

/** Liest das Sitzungs-Cookie und prüft die Signatur. */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies()
  return isValidToken(store.get(SESSION_COOKIE)?.value)
}

// --- Einfache Anmelde-Drosselung (pro Instanz im Speicher) ---
// Schützt gegen automatisiertes Durchprobieren. In einer serverlosen
// Umgebung ist das pro Instanz, in Kombination mit einem starken Passwort
// für diesen Anwendungsfall ausreichend.
const attempts = new Map<string, { count: number; first: number }>()
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 8

export function rateLimited(key: string): boolean {
  const now = Date.now()
  const entry = attempts.get(key)
  if (!entry || now - entry.first > WINDOW_MS) return false
  return entry.count >= MAX_ATTEMPTS
}

export function registerFailure(key: string) {
  const now = Date.now()
  const entry = attempts.get(key)
  if (!entry || now - entry.first > WINDOW_MS) {
    attempts.set(key, { count: 1, first: now })
  } else {
    entry.count += 1
  }
}

export function clearFailures(key: string) {
  attempts.delete(key)
}
