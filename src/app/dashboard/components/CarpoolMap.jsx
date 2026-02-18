'use client'

import { GoogleMap, Marker } from '@react-google-maps/api'

const defaultCenter = { lat: 53.349805, lng: -6.26031 }

export default function CarpoolMap({ origin, zoom = 12 }) {
    const originLat = Number(origin?.lat) || defaultCenter.lat
    const originLng = Number(origin?.lng) || defaultCenter.lng

    if (
        !Number.isFinite(originLat) ||
        !Number.isFinite(originLng)
    ) {
        return null
    }

    const center = { lat: originLat, lng: originLng }

    return (
        <GoogleMap
            mapContainerStyle={{
                width: '100%',
                height: '300px'
            }}
            center={center}
            zoom={zoom}
            options={{ disableDefaultUI: true }}
        >
            <Marker position={center} />
        </GoogleMap>
    )
}