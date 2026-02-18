'use client'

import {Paper, AppBar, Box, Toolbar, Typography, Button} from '@mui/material'
import {useEffect, useState} from 'react'
import CustomSignUpButton from '../auth/CustomSignUp'
import SignInButton from '../auth/SignIn'
import Image from 'next/image'
import Weather from '../navBarWidgets/Weather'
import { navBarActions } from './navBarActions'
import { useRouter } from 'next/navigation'
import useSession from '@/app/hooks/useSession'


export default function Navbar(){
    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await fetch('/api/auth/session')
                const data = await res.json()
                setUser(data.user || null)

            } catch (err) {
                console.error(err)
            }
        }

        fetchSession()
    }, [])

    const handleLogin = async (userData) => {
        setUser(userData)
        router.push('/dashboard')
    }

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', {method: 'POST'})
            setUser(null)
            router.refresh()
            router.push('/')
        } catch (err) {
            console.error('logout failed:', err)
        }
    }

    return (
        <Paper elevation={10}>
        <AppBar position='static' component="div" sx={{mb: 2}}>
            <Toolbar>
                <Image
                    src="/tu_dublin_carpool_logo.svg"
                    alt="hub connected to user avatar profiles with spokes"
                    width={50}
                    height={50}
                    style={{marginRight: 8}}
                    priority
                 />

                <Typography sx={{flexGrow: 1}}>
                    Tu Dublin Carpool App
                </Typography>
               

                <Weather />
                
                {navBarActions(user, handleLogout, handleLogin)}
            </Toolbar>



        </AppBar>
        </Paper>
    )
}