'use client'

import React from 'react'
import {Paper,Box, Typography, Link} from '@mui/material'

export default function Footer() {
    return (
        <Paper color='primary'>
        <Box
            component='footer'
            color=''
            sx={{display: 'flex', justifyContent: 'space-between'}}

        >
            <Typography sx={{ml: 2}}> Carpool App © {new Date().getFullYear()}</Typography>
            <Link href='/' color='inherit' underline='hover' sx={{mr: 8}}>
            
            Tu Dublin
            </Link>
        </Box>
        </Paper>
    )
}