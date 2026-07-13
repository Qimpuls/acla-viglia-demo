'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Booking, BookingStatus } from '@/lib/bookings'
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  clearFailures,
  createSessionToken,
  isAuthenticated,
  rateLimited,
  registerFailure,
  verifyPassword,
} from '@/lib/auth'
import { readBookingsFresh, saveBookings } from '@/lib/store'

export interface LoginState {
  error: string
}

async function clientKey() {
  const h = await headers()
  const fwd = h.get('x-forwarded-for') || ''
  return fwd.split(',')[0].trim() || 'unknown'
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const key = await clientKey()
  if (rateLimited(key)) {
    return { error: 'Zu viele Versuche. Bitte in einigen Minuten erneut versuchen.' }
  }

  const password = String(formData.get('password') || '')
  if (!verifyPassword(password)) {
    registerFailure(key)
    await delay(600)
    return { error: 'Passwort falsch.' }
  }

  clearFailures(key)
  const store = await cookies()
  store.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
  redirect('/verwaltung')
}

export async function logout() {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
  redirect('/verwaltung')
}

export interface SaveResult {
  ok: boolean
  bookings?: Booking[]
  error?: string
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

/**
 * Setzt einen Buchungszeitraum (Anreise `start` bis Abreise `end`, halboffen:
 * der Abreisetag `end` bleibt frei). Standardfall ist eine Woche Samstag zu
 * Samstag; für Ausnahmen sind beliebige Zeiträume (auch einzelne Nächte) erlaubt.
 * status 'frei' entfernt die am `start` beginnende Buchung (leert eine Woche
 * 1:1 wie bisher). Sonst wird der Zeitraum angelegt/aktualisiert, sofern er sich
 * mit keinem bestehenden überschneidet. Angrenzen (gemeinsamer Tag) ist erlaubt.
 */
export async function setBooking(input: {
  start: string
  end: string
  status: BookingStatus | 'frei'
  note?: string
}): Promise<SaveResult> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: 'Nicht angemeldet.' }
  }

  if (!ISO_DATE.test(input.start)) {
    return { ok: false, error: 'Ungültiges Datum.' }
  }

  const list = await readBookingsFresh()

  // 'frei': die am start beginnende Buchung entfernen (leert eine Woche wie bisher).
  if (input.status === 'frei') {
    const next = list.filter((b) => b.start !== input.start)
    await saveBookings(next)
    return { ok: true, bookings: next }
  }

  if (!ISO_DATE.test(input.end) || !(input.end > input.start)) {
    return { ok: false, error: 'Die Abreise muss nach der Anreise liegen.' }
  }

  // Exakte Selbst-Version herausnehmen: erlaubt Dedup / Notiz-Update ohne Overlap-Konflikt.
  const rest = list.filter(
    (b) => !(b.start === input.start && b.end === input.end),
  )

  // Overlap-Guard (halboffen): Angrenzen (A.end === B.start) ist erlaubt,
  // echte Überschneidung wird abgelehnt statt still zu überschreiben.
  const clash = rest.find((b) => input.start < b.end && input.end > b.start)
  if (clash) {
    return {
      ok: false,
      error: `Überschneidet sich mit ${clash.start} bis ${clash.end}. Bitte zuerst entfernen.`,
    }
  }

  const note = (input.note || '').trim()
  rest.push({
    start: input.start,
    end: input.end,
    status: input.status,
    ...(note ? { note } : {}),
  })
  rest.sort((a, b) => a.start.localeCompare(b.start))
  await saveBookings(rest)
  return { ok: true, bookings: rest }
}

/** Entfernt genau einen Buchungseintrag, eindeutig über (start + end). */
export async function removeBooking(input: {
  start: string
  end: string
}): Promise<SaveResult> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: 'Nicht angemeldet.' }
  }
  const list = await readBookingsFresh()
  const next = list.filter(
    (b) => !(b.start === input.start && b.end === input.end),
  )
  await saveBookings(next)
  return { ok: true, bookings: next }
}
