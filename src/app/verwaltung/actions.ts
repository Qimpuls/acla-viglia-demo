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

/**
 * Setzt den Status einer Woche (Samstag bis Samstag).
 * status 'frei' entfernt die Buchung, sonst wird sie angelegt/aktualisiert.
 * Eine Woche wird über ihren Anreise-Samstag (from) eindeutig identifiziert.
 */
export async function setWeek(input: {
  from: string
  to: string
  status: BookingStatus | 'frei'
  note?: string
}): Promise<SaveResult> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: 'Nicht angemeldet.' }
  }

  const list = await readBookingsFresh()
  const next = list.filter((b) => b.start !== input.from)

  if (input.status !== 'frei') {
    const note = (input.note || '').trim()
    next.push({
      start: input.from,
      end: input.to,
      status: input.status,
      ...(note ? { note } : {}),
    })
  }

  next.sort((a, b) => a.start.localeCompare(b.start))
  await saveBookings(next)
  return { ok: true, bookings: next }
}
