import { useEffect, useState, useRef } from 'react'
import { SPOTIFY_PLAYER_ENDPOINTS } from '@/services/config'

const useSpotifyPlayer = (access_token: string) => {


    const [player, setPlayer] = useState<Spotify.Player | null>(null)
    const [deviceId, setDeviceId] = useState('')
    const [current_track, setCurrentTrack] = useState<Spotify.Track | null>(null)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [position, setPosition] = useState(0)
    const [volume, setVolume] = useState(0.5)

    const playerRef = useRef<Spotify.Player | null>(null)

    type Offset = {
        uri: string
    }



    useEffect(() => {

        if (!access_token) return

        if (!document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]')) {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
            document.body.appendChild(script);
        }

        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = access_token
            const player = new Spotify.Player({
                name: 'VibeRider',
                volume: 0.5,
                getOAuthToken: cb => { cb(token ?? ''); },
            })

            player.addListener('ready', ({ device_id }) => {
                console.log(device_id)
                setDeviceId(device_id)
            })
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            // player.addListener('initialization_error', ({ message }) => {
            //     console.error(message);
            // });

            // player.addListener('authentication_error', ({ message }) => {
            //     console.error(message);
            // });
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

            // player.addListener('account_error', ({ message }) => {
            //     console.error(message);
            // });


            playerRef.current = player
            setPlayer(player)
            player.connect();
        }
        return () => { playerRef.current?.disconnect() }

    }, [access_token])


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
        await fetch(`${SPOTIFY_PLAYER_ENDPOINTS.PLAYER}?device_id=${deviceId}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uris: uris,
                    offset: offset
                })


            })
    }






    return { player, deviceId, isPaused, isActive, current_track, position, volume, seek, adjustVolume, playTrack }

}

export default useSpotifyPlayer


