import { createContext, useEffect, useState, type ReactNode } from 'react'
import { check_auth_status } from '@/services/backend_api_comm'



interface AuthContextType {
    isLoggedIn: boolean
}

interface AuthProviderProps {
    children: ReactNode
}


export const AuthContext = createContext<AuthContextType>({ isLoggedIn: false })

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const check_status = async () => {
        try {
            const data = await check_auth_status()
            if (data) {
                setIsLoggedIn(data.isLoggedIn)
            }
        }
        catch (error) {
            console.error('Auth check failed :', error)
            setIsLoggedIn(false)
        }

    }

    useEffect(() => {
        check_status()
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )


}









