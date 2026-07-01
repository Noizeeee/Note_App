import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const login = async (username, password) => {
        const res = await api.post('/auth/login/', { username, password })
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
        setUser(username)
        navigate('/notes')
    }

    const register = async (username, email, password) => {
        await api.post('/auth/register/', { username, email, password })
        navigate('/login')
    }

    const logout = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        setUser(null)
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}