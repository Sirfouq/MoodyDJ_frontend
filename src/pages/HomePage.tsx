import { useContext } from 'react'
import useSpotifyPlayer from '@/hooks/useSpotifyPlayer';
import { AuthContext } from '@/contexts/AuthContext';
import VibeInput from '@/components/layout/VibeInput';
import { PlayerController } from '@/components/layout/PlayerController';
import { usePlaylist } from '@/hooks/usePlaylist';
import TracksList from '@/components/layout/TracksList'



export const HomePage = () => {


  const { access_token } = useContext(AuthContext)
  const { player, deviceId, isPaused, isActive, current_track, position, volume, seek, adjustVolume } = useSpotifyPlayer(access_token ?? '')
  const { tracks, error, isLoading, generatePlaylist } = usePlaylist()
  const hasContent = tracks.length > 0 || isLoading




  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto px-4 pb-56">
        {!hasContent && (
          <div className="h-full flex items-center justify-center">
            <VibeInput
              variant="hero"
              onSubmit={(input) =>
                generatePlaylist(input)}
            />
          </div>
        )}

        {hasContent && (
          <TracksList
            tracks={tracks}
            isLoading={isLoading}
            isPaused={isPaused}
            current_track={current_track}
            onClick={(track) =>
              console.log('clicked', track.uri, track.name)}
          />
        )}
      </main>

      {/* Floating compact VibeInput — its own 
  dark card, positioning only here */}
      {hasContent && (
        <div className={`fixed left-1/2 
  -translate-x-1/2 z-50 w-full max-w-3xl px-4 
  ${current_track ? 'bottom-24' : 'bottom-4'}`}>
          <VibeInput
            variant="compact"
            onSubmit={(input) =>
              generatePlaylist(input)}
          />
        </div>
      )}

      {/* PlayerController — separate bar glued 
  to the very bottom */}
      {current_track && (
        <div className="fixed bottom-0 left-0 
  right-0 z-40 bg-neutral-900/90 backdrop-blur-md 
  border-t border-white/10">
          <PlayerController
            player={player}
            isActive={isActive}
            current_track={current_track}
            isPaused={isPaused}
            position={position}
            volume={volume}
            seek={seek}
            adjustVolume={adjustVolume}
          />
        </div>
      )}
    </div>
  )
}
