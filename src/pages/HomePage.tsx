import { useContext } from 'react'
import useSpotifyPlayer from '@/hooks/useSpotifyPlayer';
import { AuthContext } from '@/contexts/AuthContext';
import VibeInput from '@/components/layout/VibeInput';
import { PlayerController } from '@/components/layout/PlayerController';
import { usePlaylist } from '@/hooks/usePlaylist';
import TracksList from '@/components/layout/TracksList'
import { Navbar } from '@/components/layout/Navbar'
import { Nav_links } from '@/router';
import HeroTitle from '@/components/layout/HeroTitle';


export const HomePage = () => {


  const { access_token } = useContext(AuthContext)
  const { player, deviceId, isPaused, isActive, current_track, position, volume, seek, adjustVolume, playTrack } = useSpotifyPlayer(access_token ?? '')
  const { tracks, error, isLoading, lastVibe, generatePlaylist } = usePlaylist()
  const hasContent = tracks.length > 0 || isLoading




  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-0 to-indigo-100">

      {/* Nav bar — placeholder, real component later */}
      <Navbar links={Nav_links} />
      {hasContent && (
        <div className="fixed left-0 top-0 h-full w-16 hidden xl:flex items-center justify-center pointer-events-none z-10">
          <p className="-rotate-90 whitespace-nowrap text-4xl font-display  text-slate-600 tracking-tight" aria-hidden="true">
            "{lastVibe}"
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto overscroll-contain">
        <section className="px-6 py-12 pb-12 max-w-4xl mx-auto">
          <HeroTitle title='How does your soul feel right now ? ' />
          <VibeInput
            variant="hero"
            onSubmit={(input) => generatePlaylist(input)}
          />
        </section>

        {/* Curated section + inner-scroll list */}
        {hasContent && (
          <section className="px-6 max-w-4xl mx-auto pb-2">
            <div className="mb-4">
              {/* Curated header — placeholder */}
              <p className="text-xs font-semibold tracking-widest text-indigo-500">
                CURRENTLY CURATED
              </p>
            </div>

            <div className="max-h-[70vh] overflow-y-auto overscroll-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <TracksList
                tracks={tracks}
                isLoading={isLoading}
                isPaused={isPaused}
                current_track={current_track}
                onClick={(track) => {
                  current_track?.uri === track.uri
                    ? player?.togglePlay()
                    : playTrack({ uris: tracks.map(t => t.uri), offset: { uri: track.uri } })
                }} />
            </div>
          </section>
        )}
      </div>

      {/* Player — fixed, frosted */}
      {current_track && (
        <div className="z-40 shrink-0 bg-white/95 backdrop-blur-sm border-t border-black/5">
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
