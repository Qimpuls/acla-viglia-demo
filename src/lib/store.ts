import { unstable_cache, revalidateTag, revalidatePath } from 'next/cache'
import { seedBookings, type Booking } from '@/lib/bookings'

const BLOB_PATHNAME = 'bookings.json'
const CACHE_TAG = 'bookings'

function hasBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

async function localFile() {
  const path = await import('node:path')
  return path.join(process.cwd(), '.data', BLOB_PATHNAME)
}

/** Rohzugriff ohne Cache: liest den aktuellen Bestand, oder null wenn leer. */
async function readRaw(): Promise<Booking[] | null> {
  if (hasBlob()) {
    // Privater Blob: serverseitig per Pathname mit Token gelesen.
    // Die Kundennamen (note) sind damit nie öffentlich abrufbar.
    const { get } = await import('@vercel/blob')
    try {
      const result = await get(BLOB_PATHNAME, {
        access: 'private',
        token: process.env.BLOB_READ_WRITE_TOKEN,
        useCache: false,
      })
      if (!result || !result.stream) return null
      const text = await new Response(result.stream).text()
      return JSON.parse(text) as Booking[]
    } catch {
      return null
    }
  }

  const fs = await import('node:fs/promises')
  try {
    const txt = await fs.readFile(await localFile(), 'utf8')
    return JSON.parse(txt) as Booking[]
  } catch {
    return null
  }
}

async function writeRaw(list: Booking[]): Promise<void> {
  if (hasBlob()) {
    const { put } = await import('@vercel/blob')
    await put(BLOB_PATHNAME, JSON.stringify(list), {
      access: 'private',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
    })
    return
  }

  const fs = await import('node:fs/promises')
  const path = await import('node:path')
  const file = await localFile()
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, JSON.stringify(list, null, 2), 'utf8')
}

/** Öffentlicher, gecachter Lesezugriff. Fällt auf den Seed zurück. */
export const getBookings = unstable_cache(
  async (): Promise<Booking[]> => {
    const data = await readRaw()
    return data ?? seedBookings
  },
  ['bookings'],
  { tags: [CACHE_TAG], revalidate: 3600 },
)

/**
 * Öffentliche Sicht: ohne das interne Feld `note` (Kundenname).
 * Verhindert, dass Namen über Client-Props in den Seitenquelltext gelangen.
 */
export async function getPublicBookings(): Promise<Booking[]> {
  const list = await getBookings()
  return list.map(({ start, end, status }) => ({ start, end, status }))
}

/** Frischer Lesezugriff ohne Cache (für Mutationen im Admin). */
export async function readBookingsFresh(): Promise<Booking[]> {
  const data = await readRaw()
  return data ?? seedBookings
}

/** Schreibt den Bestand und entwertet die Caches der öffentlichen Seite. */
export async function saveBookings(list: Booking[]): Promise<void> {
  await writeRaw(list)
  // expire: 0 -> sofortige Invalidierung, damit die öffentliche Seite die
  // Änderung beim nächsten Aufruf direkt zeigt (kein stale-while-revalidate).
  revalidateTag(CACHE_TAG, { expire: 0 })
  revalidatePath('/')
}
