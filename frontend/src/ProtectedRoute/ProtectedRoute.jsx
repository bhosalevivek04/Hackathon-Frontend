import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../provider/AuthProvider'

function ProtectedRoute({ children }) {
    // get the user info and loading flag from AuthContext
    const { user, loading } = useAuth()

    // while auth is initializing, don't redirect (prevents redirect on page refresh)
    if (loading) return null

    return user ? children : <Navigate to='/' />
}

export default ProtectedRoute
