import { BookingCalendar } from '@/components/BookingCalendar'
import { getPublicBookings } from '@/lib/store'

export async function BookingCalendarSection() {
  const bookings = await getPublicBookings()
  return <BookingCalendar bookings={bookings} />
}
