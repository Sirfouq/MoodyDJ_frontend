import { useState } from "react";
import type { Track } from "@/services/backend_api_comm";
import { generate_playlist } from "@/services/backend_api_comm";
import { Input } from "@/components/ui/input";

export const usePlaylist = () => {

    const [tracks, setTracks] = useState<Track[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [lastVibe, setLastVibe] = useState('')

    const generatePlaylist = async (user_input: string) => {
        setLastVibe(user_input)
        setIsLoading(true)
        setError(null)
        try {
            const data = await generate_playlist(user_input)
            setTracks(data)
        } catch (e: unknown) {
            setError(e instanceof Error ? e : new Error('Failed generating the playlist.'))
        } finally {
            setIsLoading(false)
        }

    }

    return { tracks, isLoading, error, lastVibe, generatePlaylist }



}