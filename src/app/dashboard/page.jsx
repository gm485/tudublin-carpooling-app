'use client'

import { useState, useEffect } from 'react'
import { Box, Paper, Typography, Button, Card, CardContent, IconButton } from '@mui/material'
import { useRouter } from 'next/navigation'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from './styles/dashboard.module.css'

export default function Dashboard() {
    const [user, setUser] = useState(null)
    const [carpools, setCarpools] = useState([])
    const router = useRouter()

    // Fetch current user
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/auth/session')
            const data = await res.json()
            if (data.user) {
                setUser(data.user)
            } else {
                router.push('/')
            }
        }
        fetchUser()
    }, [])

    // Fetch carpools
    useEffect(() => {
        const fetchCarpools = async () => {
            const res = await fetch('/api/get_carpools')
            if (res.ok) {
                const data = await res.json()
                // Normalize _id to string for safety
                const normalized = data.carpools.map(c => ({
                    ...c,
                    _id: c._id?.$oid || c._id || ''
                }))
                setCarpools(normalized)
            }
        }
        fetchCarpools()
    }, [])

    // Delete carpool
    const handleDelete = async (carpoolId) => {
        if (!carpoolId) return alert('Invalid carpool ID')
        if (!confirm('Are you sure you want to delete this carpool?')) return

        try {
            console.log('Deleting carpool with id:', carpoolId)
            const res = await fetch(`/api/delete_carpool?id=${carpoolId}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.success) {
                setCarpools(prev => prev.filter(c => c._id !== carpoolId))
            } else {
                alert('Failed to delete carpool: ' + data.error)
            }
        } catch (err) {
            console.error('Delete error:', err)
            alert('Error deleting carpool')
        }
    }

    // Render carpool cards
    const renderCards = () => {
        return carpools.map((carpool) => (
            <Card key={carpool._id} variant='outlined' sx={{ mb: 2 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <Box>
                            <Typography variant='subtitle1'>
                                {carpool.origin} ➡️ {carpool.destination}
                            </Typography>
                            <Typography>
                                Date: {new Date(carpool.date).toLocaleDateString()} | Seats: {carpool.seatsAvailable}
                            </Typography>
                        </Box>
                        <IconButton 
                            color='error' 
                            onClick={() => handleDelete(carpool._id)}
                            aria-label='delete'
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </CardContent>

                {/* Placeholder map */}
                <Box 
                    sx={{ 
                        height: '300px', 
                        width: '100%',
                        bgcolor: '#e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography variant='body2' color='text.secondary'>
                        Map Preview
                    </Typography>
                </Box>
            </Card>
        ))
    }

    return (
        <Box className={styles.dashboardContainer}>
            <Paper elevation={8}>
                <Box color='primary' className={styles.dashboardHeader}>
                    <Typography>
                        {user ? `${user.name}'s Dashboard` : 'Dashboard'}
                    </Typography>
                    <Button 
                        variant='contained'
                        className={styles.createCarpoolBtn}
                        onClick={() => router.push('/newCarpool')}
                    >
                        Create CarPool
                    </Button>
                </Box>
            </Paper>

            <Box sx={{ mt: 1 }} className={styles.cardContainer}>
                {carpools.length === 0 ? (
                    <Typography>No carpools yet.</Typography>
                ) : (
                    renderCards()
                )}
            </Box>
        </Box>
    )
}

