import { createContext, useEffect, useState, type ReactNode } from 'react'
import { check_auth_status } from '@/services/backend_api_comm'



interface AuthContextType {
    isLoggedIn: boolean,
    isLoading: boolean,
    access_token: string | null
}

interface AuthProviderProps {
    children: ReactNode
}


export const AuthContext = createContext<AuthContextType>({ isLoggedIn: false, isLoading: true, access_token: '' })

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [access_token, setAccessToken] = useState('')

    const check_status = async () => {
        try {
            const data = await check_auth_status()

            if (data) {
                setIsLoggedIn(data.isLoggedIn)
                setAccessToken(data.access_token ?? '')
            }
        }
        catch (error) {
            console.error('Auth check failed :', error)
            setIsLoggedIn(false)
        }
        finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        check_status()
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, access_token }}>
            {children}
        </AuthContext.Provider>
    )


}









