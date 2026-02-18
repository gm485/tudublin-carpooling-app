'use client'

import {useState, useEffect} from 'react'
import {Box, Typography} from '@mui/material'

export default function Weather() {
    //constant use states
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        async function fetchWeather() {
            try {
                const res = await fetch('/api/weather')
                const data = await res.json()
                setWeather(data)
            } catch (err){
                console.error("error fetching error client side:", err)
            } 
        }

        fetchWeather()
    }, [])

    if (!weather || weather.error) 
        return <Typography>Error loading weather</Typography>

    const temp = Math.round(weather.main.temp)
    const description = weather.weather[0].description
    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`


    return (
        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
            <img src={iconUrl} alt={description} width={50} height={50} />
            <Typography sx={{fontSize: '1.2rem'}}>{temp}°C</Typography>
        </Box>
    )

}