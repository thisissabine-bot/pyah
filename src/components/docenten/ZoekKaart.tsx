'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Docent } from '@/lib/testdata'

const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const STAD_COORDINATEN: Record<string, [number, number]> = {
  Amsterdam: [52.3676, 4.9041],
  Haarlem: [52.3874, 4.6462],
  Utrecht: [52.0907, 5.1214],
  Rotterdam: [51.9244, 4.4777],
  Zandvoort: [52.3717, 4.5342],
  Heemstede: [52.3489, 4.6321],
  Aerdenhout: [52.3608, 4.5814],
  Vijfhuizen: [52.3444, 4.6926],
  Hoofddorp: [52.3061, 4.6907],
  Bloemendaal: [52.3959, 4.6221],
}

export default function ZoekKaart({ docenten }: { docenten: Docent[] }) {
  return (
    <div className="relative z-0">
      <MapContainer
        center={[52.25, 4.78]}
        zoom={9}
        scrollWheelZoom={false}
        className="zoek-kaart-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {docenten.map(d => {
          const coords = STAD_COORDINATEN[d.locatie]
          if (!coords) return null
          return (
            <Marker key={d.id} position={coords} icon={markerIcon}>
              <Popup>
                <strong>{d.naam}</strong><br />
                {d.locatie} · reist tot {d.reisafstand_km} km<br />
                <a href={`/docenten/${d.slug}`}>Bekijk profiel →</a>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
