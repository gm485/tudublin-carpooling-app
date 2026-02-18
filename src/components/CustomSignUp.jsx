'use client'
import React, { useState } from 'react'
import { Button, TextField, Box, Typography, Dialog, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import styles from './styles/SignupButton.module.css'

export default function CustomSignUpButton() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'passenger'
    })
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    const handleClickOpen = () => {
        setOpen(true)
        setErr('')
        setSuccess('')
    }

    const handleClose = () => setOpen(false)

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErr('')
        setSuccess('')

        try {
            // Sign up the user
            const signupRes = await fetch('/api/users', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const signupData = await signupRes.json()

            if (!signupRes.ok) throw new Error(signupData.error || "Signup failed")

            // Automatically log in
            const loginRes = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, password: formData.password })
            })
            const loginData = await loginRes.json()

            if (!loginRes.ok) throw new Error(loginData.error || "Login failed after signup")

            // Success: close dialog and redirect
            setSuccess("Account created successfully")
            setFormData({
                name: "",
                email: "",
                phoneNumber: "",
                password: "",
                role: 'passenger'
            })

            handleClose() // close the signup dialog
            router.push('/dashboard') // redirect to dashboard

        } catch (error) {
            setErr(error.message)
        }
    }

    return (
        <>
            <Button variant="contained" color="secondary" sx={{ml: 2}}onClick={handleClickOpen}>
                Sign Up
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth >
                <Box component="form" onSubmit={handleSubmit} className={styles.dialogForm} p={3}>
                    <Typography variant="h6" textAlign="center" mb={2}>Sign Up</Typography>
                    <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required fullWidth margin="normal"/>
                    <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required fullWidth margin="normal"/>
                    <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required fullWidth margin="normal"/>
                    <TextField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} fullWidth margin="normal"/>
                    <TextField select label="Role" name="role" value={formData.role} onChange={handleChange} fullWidth margin="normal">
                        <MenuItem value="passenger">Passenger</MenuItem>
                        <MenuItem value="driver">Driver</MenuItem>
                    </TextField>
                    {err && <Typography color="error" mt={1}>{err}</Typography>}
                    {success && <Typography color="primary" mt={1}>{success}</Typography>}
                    <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
                        Sign Up
                    </Button>
                </Box>
            </Dialog>
        </>
    )
}
