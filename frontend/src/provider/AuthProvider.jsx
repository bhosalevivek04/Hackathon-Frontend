import { createContext, useContext, useState, useEffect } from 'react'
import { getProfile } from '../services/user'

// create an empty context
const AuthContext = createContext()

function AuthProvider({ children }) {
    // create state to store logged user information
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setLoading(false)
                return
            }

            try {
                const response = await getProfile()
                if (response && response.status === 'success') {
                    // expected profile data: response.data
                    setUser(response.data)
                } else {
                    // invalid token or failed to fetch profile
                    localStorage.removeItem('token')
                }
            } catch (err) {
                console.error('Auth init error', err)
                localStorage.removeItem('token')
            }

            setLoading(false)
        }

        init()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

// expose the context using custom hook
export function useAuth() {
    return useContext(AuthContext)
}
