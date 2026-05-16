import { useContext, useState } from 'react'
import { generate_playlist, type Track } from '@/services/backend_api_comm';
import useSpotifyPlayer from '@/hooks/useSpotifyPlayer';
import { AuthContext } from '@/contexts/AuthContext';
import VibeInput from '@/components/layout/VibeInput';
import { PlayerController } from '@/components/layout/PlayerController';


export const HomePage = () => {

  const [tracks, setTracks] = useState<Track[]>([])
  const { access_token } = useContext(AuthContext)
  const { player, deviceId, isPaused, isActive, current_track } = useSpotifyPlayer(access_token ?? '')






  return (
    <div className='flex flex-col items-center justify-center  w-full px-4'>
      <VibeInput onSubmit={async (input) => {
        setTracks([])
        const tracks = await generate_playlist(input)
        setTracks(tracks)
      }}></VibeInput>


      {`Device Id : ${deviceId}`}

      {/* {tracks.map((track) => (
        <p key={track.uri}>
          {track.name} {track.artists}
        </p>
      ))} */}

      <PlayerController player={player}
        isActive={isActive}
        isPaused={isPaused}
        current_track={current_track}></PlayerController>



    </div>
  )
}
