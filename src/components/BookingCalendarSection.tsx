import { BookingCalendar } from '@/components/BookingCalendar'
import type { Booking } from '@/lib/bookings'
import { getPublicBookings } from '@/lib/store'

// bookings optional: der Aufrufer (Verfuegbarkeit) hat sie oft schon geladen und
// reicht sie durch, sonst laden wir selbst (gecacht, kein echter Doppel-Fetch).
export async function BookingCalendarSection({
  bookings,
}: {
  bookings?: Booking[]
}) {
  const data = bookings ?? (await getPublicBookings())
  return <BookingCalendar bookings={data} />
}
