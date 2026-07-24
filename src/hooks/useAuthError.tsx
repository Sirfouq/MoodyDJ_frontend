import { useEffect, useState } from 'react'


const ERROR_MESSAGES: Record<string, string> = {
    auth_denied: 'Spotify login was cancelled. Please try again.',
    auth_failed: "Couldn't complete Spotify login. Please try again.",
    missing_auth_code: 'Something went wrong during login. Please try again.'
}

export const useAuthError = () => {
    const [authError, setAuthError] = useState<string | null>(null)


    useEffect(() => {
        const error = new URLSearchParams(window.location.search).get('error')
        if (error) {
            setAuthError(ERROR_MESSAGES[error] ?? 'Login failed. Please try again.')
            window.history.replaceState({}, '', '/')
        }
    }, [])

    return authError



}

