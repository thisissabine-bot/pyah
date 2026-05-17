'use client'

import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

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
}

interface Props {
  locatie: string
  reisafstand_km: number
}

export default function DocentKaart({ locatie, reisafstand_km }: Props) {
  const coords = STAD_COORDINATEN[locatie]
  if (!coords) return null

  return (
    <div className="relative z-0">
    <MapContainer
      center={coords}
      zoom={11}
      scrollWheelZoom={false}
      zoomControl={false}
      className="h-52 w-full rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coords} icon={markerIcon} />
      <Circle
        center={coords}
        radius={reisafstand_km * 1000}
        color="#a66658"
        fillColor="#a66658"
        fillOpacity={0.12}
        weight={1.5}
      />
    </MapContainer>
    </div>
  )
}
