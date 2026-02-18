'use client'
import Image from 'next/image'
import React, {useState} from 'react'
import styles from './styles/SignupButton.module.css'
import { Button, TextField, Box, Typography, Dialog, Alert, DialogTitle, DialogContent,MenuItem} from '@mui/material'

export default function SignInButton({onLogin}) {
    const [eL, setEl] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')

    const open = Boolean(eL)

    const handleClick = (event) => {
        setEl(event.currentTarget)
        setErr('')
    }

    const handleClose = () => {
        setEl(null)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErr('')


        try  {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({email, password})

            })

                const data = await response.json()

                if (!response.ok){
                    throw new Error(data.error || "Login failed")
                } 
                onLogin?.(data.user)
                setEl(null)
                setEmail('')
                setPassword('')
            


        } catch (err){
            setErr(err.message)
        }

    }

    return (
        <>
            <Button
            variant='contained' color="secondary" onClick={handleClick} sx={{color: 'primary', ml: 2}}
            
            > Sign In 
            </Button>

            <Dialog
                open={open} 
                onClose={handleClose}
                fullWidth
                maxWidth="md"

            >
                <DialogTitle textAlign='center'>Sign In</DialogTitle>

                <DialogContent className={styles.dialogContainer}>
                    <Box 
                        className={styles.dialogForm} 
                        component='form'
                        onSubmit={handleSubmit} 
                        >
                            {err && <Alert severity="error">{err}</Alert>}
                            <TextField
                                label="email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                                />
                            <TextField 
                                label="password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                            />
                            <Button 
                                type="submit" 
                                className={styles.logActionBtn} 
                                color='secondary' 
                                variant='contained'>
                                Sign In
                            </Button>                           

                        </Box>


                </DialogContent>
                

            </Dialog>
        </>
    )
}