import { useContext, useState } from 'react'
import { generate_playlist, type Track } from '@/services/backend_api_comm';
import useSpotifyPlayer from '@/hooks/useSpotifyPlayer';
import { AuthContext } from '@/contexts/AuthContext';
import VibeInput from '@/components/layout/VibeInput';
import { PlayerController } from '@/components/layout/PlayerController';
import { usePlaylist } from '@/hooks/usePlaylist';


export const HomePage = () => {


  const { access_token } = useContext(AuthContext)
  const { player, deviceId, isPaused, isActive, current_track, position, volume, seek, adjustVolume } = useSpotifyPlayer(access_token ?? '')
  const { tracks, error, isLoading, generatePlaylist } = usePlaylist()





  return (
    <div className='flex flex-col items-center justify-center  w-full px-4'>
      <VibeInput onSubmit={async (input) => {
        generatePlaylist(input)
      }}></VibeInput>


      {`Device Id : ${deviceId}`}

      {/* {tracks.map((track) => (
        <p key={track.uri}>
          {track.name} {track.artists}
        </p>
      ))} */}

      {current_track && <PlayerController player={player}
        isActive={isActive}
        current_track={current_track}
        isPaused={isPaused}
        position={position}
        volume={volume}
        seek={seek}
        adjustVolume={adjustVolume}></PlayerController>
      }


    </div>
  )
}
