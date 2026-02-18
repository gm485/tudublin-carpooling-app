'use client'

import {useState, useRef} from 'react'
import { useRouter } from 'next/navigation'
import styles from '../create-pool.module.css'
//material 
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Stack,
} from '@mui/material'

//google maps autocomplete and loadScript 
import {LoadScript, Autocomplete} from '@react-google-maps/api'


export default function CreateCarpool({onNewCarpool}) {

    const router = useRouter()
    //states
    const [origin, setOrigin] = useState("")
    const [destination, setDestination] = useState("")
    const [date, setDate] = useState("")
    const [seatsAvailable, setSeatsAvailable] = useState(1)
    const [status, setStatus] = useState("")
    //refs for google autocompletes
    const originRef = useRef(null)
    const destinationRef = useRef(null)



    



    async function handleSubmit(event) {
        event.preventDefault() 

        const originPlace = originRef.current?.getPlace()
        const destinationPlace = destinationRef.current?.getPlace()

        const payload = {
            origin: originPlace?.formatted_address || origin,
            originLat: originPlace?.geometry?.location.lat(),
            originLng: originPlace?.geometry?.location.lng(),
            destination: destinationPlace?.formatted_address || destination,
            destinationLat: destinationPlace?.geometry?.location.lat(),
            destinationLng: destinationPlace?.geometry?.location.lng(),
            date,
            seatsAvailable
        }



        const res = await fetch("/api/carpool", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(payload)

        })

        const data = await res.json()

        if (data.success){
            setStatus("CarPool Created"),
            setOrigin("")
            setDestination("")
            setDate("")
            setSeatsAvailable("")
            onNewCarpool?.(data.carpool)

            router.push('/dashboard')

        } else {
            setStatus("Error:", data.error)
        }


    }

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={['places']}>
            <div className={styles.formHolder}>
                <Paper elevation={24}  variant='outlined' >
                <Typography variant='h6'  sx={{textAlign: 'center'}}gutterBottom>
                    Create a new Carpool
                </Typography>

                <Box 
                component="form"
                className={styles.createPoolForm}
                onSubmit={handleSubmit}
                >
                
                    <Autocomplete onLoad={ref => (originRef.current = ref)}>
                        <TextField 
                            
                            label='Origin'
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            required
                            fullWidth
                        />
                    </Autocomplete>
                   <Autocomplete onLoad={ref => (destinationRef.current = ref)}>

                        <TextField 

                        value={destination}
                        label="Destination"
                        onChange={(e) => setDestination(e.target.value)}
                        fullWidth
                        required
                        />
                    </Autocomplete>

                <TextField 
                    type= "date"
                    value={date}
                    size="small"
                    onChange= {(e) => setDate(e.target.value)}
                    required
                    
                    />

                <TextField 
                    label = "Seats Available"
                    type="number"
                    onChange= {(e) => setSeatsAvailable(e.target.value)}
                    required
                />

                <Button 
                    type="submit"
                    variant="contained"
                    color="primary"
                >Create Carpool</Button>



                {status && (
                    <Typography 
                        variant='body2'
                        color={status.includes("Error") ? "error" : "success.main"}
                        > {status}
                    </Typography>
                        
                
                )}

            </Box>
            </Paper>
            </div>
        </LoadScript> 
    )
}