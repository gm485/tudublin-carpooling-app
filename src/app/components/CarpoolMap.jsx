'use client'

import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api'


export default function CarpoolMap({lat, lng}){
    return (
        <LoadScript>
            <GoogleMap
                mapContainerStyle={{
                    width: '100%',
                    height: '100px',
                    borderRadius: '8px',
                }}
                center={{lat, lng}}
                zoom={10}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                }}
            >
                <Marker position={{lat, lng}}/>

            </GoogleMap>




        </LoadScript>



    )
}