import { useContext } from 'react'
import { Navigate } from 'react-router'
import { AuthContext } from '@/contexts/AuthContext'
import { Outlet } from 'react-router'

export const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <div>Loading</div>
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
