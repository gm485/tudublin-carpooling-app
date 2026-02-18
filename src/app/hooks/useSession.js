// src/app/hooks/useSession.js
'use client'
import { useState, useEffect } from 'react'

export default function useSession() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session')
        const data = await res.json()
        setUser(data.user || null)
      } catch (err) {
        console.error('Error fetching session:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [])

  return { user, loading }
}
