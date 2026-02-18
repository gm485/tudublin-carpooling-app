'use client'
import styles from './testPools.module.css'
//mui
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
//react dependencies
import {useState} from 'react'
import { Box, Paper } from '@mui/material';

//google maps dependencies
import {GoogleMap, LoadScript} from '@react-google-maps/api'


export default function TestPools() {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('search query', query)
    }


  return (
    <LoadScript googleMapsApiKey = {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
    <GoogleMap 
        mapContainerStyle={{width: '100%', height: '400px'}}
        center={{lat: 53.3597, lng: -6.3175}}
        zoom={12}
    />
    </LoadScript>
  );
}