'use client'

import { GoogleMapsProvider } from "./GoogleMapsProvider"

export default function GoogleMapsProviderWrapper({ children }) {
    return <GoogleMapsProvider>{children}</GoogleMapsProvider>
}