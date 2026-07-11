import { useEffect, useState, useRef } from 'react'
import { SPOTIFY_PLAYER_ENDPOINTS } from '@/services/config'
import { check_auth_status } from '@/services/backend_api_comm'

const useSpotifyPlayer = (isLoggedIn: boolean) => {


    const [player, setPlayer] = useState<Spotify.Player | null>(null)
    const [deviceId, setDeviceId] = useState('')
    const [current_track, setCurrentTrack] = useState<Spotify.Track | null>(null)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [position, setPosition] = useState(0)
    const [volume, setVolume] = useState(0.5)
    const [playbackError, setPlaybackError] = useState<string | null>(null)

    const playerRef = useRef<Spotify.Player | null>(null)

    type Offset = {
        uri: string
    }



    useEffect(() => {

        if (!isLoggedIn) return

        if (!document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]')) {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
            document.body.appendChild(script);
        }

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new Spotify.Player({
                name: 'MELODYSSEY',
                volume: 0.5,
                getOAuthToken: async cb => {
                    const token = (await check_auth_status()).access_token
                    if (token) cb(token)
                },
            })

            player.addListener('ready', ({ device_id }) => {
                console.log(device_id)
                setDeviceId(device_id)
                setPlaybackError(null)
            })
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            // player.addListener('initialization_error', ({ message }) => {
            //     console.error(message)
            // });

            player.addListener('authentication_error', ({ message }) => {
                console.error(message)
                setPlaybackError('Spotify authentication failed. Try refreshing the page')

            });
            player.addListener('player_state_changed', (state => {

                if (!state) {
                    return;
                }

                setCurrentTrack(state.track_window.current_track);
                setIsPaused(state.paused);
                setPosition(state.position)

                player.getCurrentState().then(state => {
                    (!state) ? setIsActive(false) : setIsActive(true)
                });

            }));

            player.addListener('account_error', ({ message }) => {
                console.error(message)
                setPlaybackError('Spotify Premium required for playback.')

            });


            playerRef.current = player
            setPlayer(player)
            player.connect();
        }
        return () => { playerRef.current?.disconnect() }

    }, [isLoggedIn])


    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setPosition((position) => position + 1000)
            }, 1000)
            return () => clearInterval(interval)
        }

    }, [isPaused])

    const seek = (ms: number) => {
        playerRef.current?.seek(ms)
        setPosition(ms)
    }

    const adjustVolume = (volume: number) => {
        playerRef.current?.setVolume(volume)
        setVolume(volume)
    }



    const playTrack = async ({ uris, offset }: { uris: string[], offset: Offset }) => {
        if (!deviceId) return
        try {
            const token = (await check_auth_status()).access_token
            const response = await fetch(`${SPOTIFY_PLAYER_ENDPOINTS.PLAYER}?device_id=${deviceId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        uris: uris,
                        offset: offset
                    })


                })
            if (response.ok) {
                setPlaybackError(null)

            }
            else if (response.status === 403) {
                setPlaybackError('Spotify Premium required for playback.')

            }
            else {
                setPlaybackError(`Playback failed (${response.status}) - try again.`)

            }
        }
        catch {
            setPlaybackError('Could not reach the server . Check your connection .')

        }
    }






    return { player, deviceId, isPaused, isActive, current_track, position, volume, playbackError, seek, adjustVolume, playTrack }

}

export default useSpotifyPlayer


