import type { Metadata } from 'next'
import { isAuthenticated } from '@/lib/auth'
import { getBookings } from '@/lib/store'
import { LoginForm } from '@/components/admin/LoginForm'
import { BookingAdmin } from '@/components/admin/BookingAdmin'

export const metadata: Metadata = {
  title: 'Belegung verwalten',
  robots: { index: false, follow: false },
}

// Liest Cookies, daher immer dynamisch (keine statische Auslieferung).
export const dynamic = 'force-dynamic'

export default async function VerwaltungPage() {
  if (!(await isAuthenticated())) {
    return <LoginForm />
  }

  const bookings = await getBookings()
  return <BookingAdmin initialBookings={bookings} />
}
