import { useEffect, useState } from 'react'


const useSpotifyPlayer = (access_token: string) => {


    const [player, setPlayer] = useState<Spotify.Player | null>(null)
    const [deviceId, setDeviceId] = useState('')
    const [current_track, setCurrentTrack] = useState<Spotify.Track | null>(null)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)


    useEffect(() => {

        if (!access_token) return

        console.log('Effect running with token:', access_token)

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = access_token
            const player = new Spotify.Player({
                name: 'Web Player',
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

                player.getCurrentState().then(state => {
                    (!state) ? setIsActive(false) : setIsActive(true)
                });

            }));

            // player.addListener('account_error', ({ message }) => {
            //     console.error(message);
            // });



            setPlayer(player)
            player.connect();
        }
        return () => { player?.disconnect() }

    }, [access_token])



    return { player, deviceId, isPaused, isActive, current_track }

}

export default useSpotifyPlayer