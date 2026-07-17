import type { UserProfile } from "@/services/backend_api_comm"
import { fetch_profile } from "@/services/backend_api_comm"
import { useState, useEffect } from "react"

export const useProfile = (isLoggedIn: boolean) => {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [profileLoading, setProfileLoading] = useState(false)

    useEffect(() => {
        if (!isLoggedIn) {
            setProfile(null)
            setProfileLoading(false)
            return
        }
        setProfileLoading(true)
        fetch_profile()
            .then(setProfile)
            .catch(() => setProfile(null))
            .finally(() => setProfileLoading(false))
    }, [isLoggedIn])

    return { profileLoading, profile }
}


export default useProfile