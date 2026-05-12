import { useContext, useState } from 'react'
import { generate_playlist, type Track } from '@/services/backend_api_comm';
import useSpotifyPlayer from '@/hooks/useSpotifyPlayer';
import { AuthContext } from '@/contexts/AuthContext';
import VibeInput from '@/components/layout/VibeInput';


export const HomePage = () => {

  const [tracks, setTracks] = useState<Track[]>([])
  const { access_token } = useContext(AuthContext)
  const { player, deviceId } = useSpotifyPlayer(access_token ?? '')






  return (
    <div className='flex flex-col items-center justify-center  w-full px-4'>
      <VibeInput onSubmit={async (input) => {
        setTracks([])
        const tracks = await generate_playlist(input)
        setTracks(tracks)
      }}></VibeInput>


      {`Device Id : ${deviceId}`}



    </div>
  )
}
