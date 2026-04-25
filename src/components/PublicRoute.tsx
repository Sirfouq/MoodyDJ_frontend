import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'

const PublicRoute = () => {
    const { isLoggedIn, isLoading } = useContext(AuthContext)
    if (isLoading) {
        return <div> Loading ...</div>
    }

    if (isLoggedIn) {
        return <Navigate to='/home' replace />
    }
    return <Outlet />

}

export default PublicRoute
