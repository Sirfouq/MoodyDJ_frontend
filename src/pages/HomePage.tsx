import { useContext, useState } from 'react'
import { generate_playlist, type Track } from '@/services/backend_api_comm';
import useSpotifyPlayer from '@/hooks/useSpotifyPlayer';
import { AuthContext } from '@/contexts/AuthContext';
import VibeInput from '@/components/layout/VibeInput';
import { PlayerController } from '@/components/layout/PlayerController';
import { usePlaylist } from '@/hooks/usePlaylist';
import { TrackCard } from '@/components/layout/TrackCard';
import { SkeletonTrackCard } from '@/components/layout/SkeletonTrackCard'
import TracksList from '@/components/layout/TracksList'



export const HomePage = () => {


  const { access_token } = useContext(AuthContext)
  const { player, deviceId, isPaused, isActive, current_track, position, volume, seek, adjustVolume } = useSpotifyPlayer(access_token ?? '')
  const { tracks, error, isLoading, generatePlaylist } = usePlaylist()





  return (
    <div className='flex flex-col items-center justify-center  w-full px-4'>
      <VibeInput onSubmit={async (input) => {
        generatePlaylist(input)
      }}></VibeInput>


      {/* <div className="w-full max-w-md my-4">
        <TrackCard
          track={{
            name: 'Studying Afro House Mix',
            artists: ['Various Artists', 'DJ Test'],
            uri: 'spotify:track:test',
            album_image_url: 'https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b',
            duration_ms: 240000,
          }}
          isPlaying={true}
          onClick={() => console.log('clicked')}
        />
      </div>

      <div className="w-full max-w-md my-4 flex flex-col gap-3">
        <SkeletonTrackCard />
        <SkeletonTrackCard />
        <SkeletonTrackCard />
      </div> */}

      {/* {tracks.map((track) => (
        <p key={track.uri}>
          {track.name} {track.artists}
        </p>
      ))} */}

      <TracksList
        tracks={tracks}
        isLoading={isLoading}
        isPaused={isPaused}
        current_track={current_track}
        onClick={(track) => console.log('clicked', track.uri, track.name)} />

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
