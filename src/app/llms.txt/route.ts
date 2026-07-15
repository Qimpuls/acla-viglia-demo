import { brand, chf, chfWoche, kontakt, preisWerte } from '@/lib/content'

// /llms.txt aus den zentralen content-Konstanten generiert (Preise/Kontakt bleiben
// so automatisch synchron zur Website). Ersetzt die frühere statische public/llms.txt.
// force-static: keine dynamischen APIs, wird zur Build-Zeit gerendert.
export const dynamic = 'force-static'

export function GET() {
  const body = `# Acla Viglia Radons

> Persönlich geführtes Maiensäss (Ferienhaus) auf 1885 m in Radons über Savognin, im Val Surses, Graubünden, Schweiz. Mitten im Parc Ela und direkt an der Skipiste der Savognin Bergbahnen (Ski-In/Ski-Out). Vermietet wird das ganze Haus, Wochenmiete Samstag zu Samstag für ${preisWerte.capacityMin} bis ${preisWerte.capacityMax} Personen. Geführt von Angela und Gallus Liesch-Lombris, die über 25 Jahre das Hotel Restaurant Rätia in Filisur führten.

Positionierung: Ein Maiensäss. Geführt wie ein gutes Hotel. Kein Hotel, kein Airbnb, kein Ferienpark. Ein echtes, persönlich geführtes Maiensäss. Anfrage statt Sofortbuchung.

## Eckdaten
- Lage: Maiensäss-Dorf Radons, 1885 m, ${brand.postal}, Kanton Graubünden (GR), Schweiz
- Region: Val Surses, Parc Ela (grösster Naturpark der Schweiz), romanischsprachig
- Kapazität: ${preisWerte.capacityMin} bis ${preisWerte.capacityMax} Personen, 1 Doppelzimmer und 1 Dreierzimmer plus 2 Doppelmatratzen in der Dachgalerie
- Bad: 2 separate WCs, eines mit Dusche
- Ausstattung: 2 Specksteinöfen, offener Cheminée, Bodenheizung im Erdgeschoss, grosse Wohnküche mit langem Holztisch, Geschirrspüler und 2 Kühlschränken, Holz- und Elektroherd, fliessend Wasser und Strom, WLAN, Haustiere nach Absprache erlaubt
- Mietmodell: ganzes Haus, Wochenmiete jeweils Samstag bis Samstag
- Zielgruppen: Familien mit Kindern, Wanderer und Ruhesuchende, Freundesgruppen von 4 bis 8 Personen

## Sommer
- Zufahrt von Ende Mai bis Ende Oktober mit dem Auto bis vor das Haus, Parkplatz direkt beim Maiensäss
- Wandern ab der Haustür: Lai Barnagn, Piz Martegnas, Alp Flix
- Bergseen und Bergbäche, Mountainbike-Trails, Origen Festival Cultural in Riom
- Sehr geringe Lichtverschmutzung, klarer Sternenhimmel

## Winter
- Skigebiet Savognin: rund 80 km Pisten, sonnenexponiert, familienfreundlich, Piste direkt am Haus
- Zufahrtsstrasse gesperrt; Anreise auf Skiern, mit dem Schlitten, zu Fuss oder mit dem Winterbus ab Savognin
- Schlitteln, Schneeschuhwandern und Skitouren ab der Haustür

## Preise (ganzes Haus, bis ${preisWerte.personsBase} Personen)
Eine Woche ist Samstag bis Samstag, also ${preisWerte.nightsPerWeek} Nächte.
- Nebensaison Sommer: ${chf(preisWerte.min)} pro Nacht, ${chfWoche(preisWerte.min)} pro Woche
- Juli und August: ${chf(preisWerte.sommerHoch)} pro Nacht, ${chfWoche(preisWerte.sommerHoch)} pro Woche
- Nebensaison Winter: ${chf(preisWerte.winterNeben)} pro Nacht, ${chfWoche(preisWerte.winterNeben)} pro Woche
- Hochsaison Winter sowie Weihnachten, Neujahr, Februar: ${chf(preisWerte.max)} pro Nacht, ${chfWoche(preisWerte.max)} pro Woche
- Jede weitere erwachsene Person: ${chf(preisWerte.extraPerson)} pro Nacht
- Im Preis enthalten: MWST, Strom und Wasser, WLAN, Holz für Cheminée und Kochherd, SodaStream am Bergquellwasser, eine Flasche Prosecco und eine Flasche Amarone bei Anreise
- Zusatzkosten: Endreinigung ${chf(preisWerte.cleaning)} pauschal, Bett- und Frotteewäsche ${chf(preisWerte.laundry)} pro Woche und Person, Kurtaxen (Erwachsene ${chf(preisWerte.taxAdult)} pro Logiernacht, Kinder 6 bis 16 Jahre ${chf(preisWerte.taxChild)} pro Logiernacht)
- Die Kurtaxe enthält die Gästekarte Val Surses: im Sommer Gondelbahnen Savognin nach Tigignas und Somtgant kostenlos, Postauto im Tal ganzjährig kostenlos
- Keine öffentlichen Rabatte oder Aktionen

## Buchung und Kontakt
- Verfügbarkeit prüfen (Belegungskalender) und unverbindlich anfragen über das Formular: https://aclavigliaradons.ch
- Anfragen werden persönlich von Angela oder Gallus beantwortet
- E-Mail: ${kontakt.email}
- Telefon: ${kontakt.phone}
- Gastgeber: ${kontakt.hosts} (ehemals Hotel Restaurant Rätia, Filisur)
`
  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
