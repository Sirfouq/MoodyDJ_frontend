import type { Track } from '@/services/backend_api_comm'
import { SkeletonTrackCard } from './SkeletonTrackCard'
import { TrackCard } from './TrackCard'

interface TracksListProps {
    tracks: Track[],
    isLoading: boolean,
    isPaused: boolean,
    current_track: Spotify.Track | null
    onClick: (track: Track) => void
}

const TracksList = ({ tracks, isLoading, isPaused, current_track, onClick }: TracksListProps) => {
    return (
        <div className="w-full max-w-2xl mx-auto flex
   flex-col gap-3 py-4">
            {isLoading
                ? Array.from({ length: 10 }).map((_,
                    i) => (
                    <SkeletonTrackCard key={i} />
                ))
                : tracks.map((track) => {
                    const isPlaying =
                        current_track?.uri ===
                        track.uri && !isPaused
                    return (
                        <TrackCard
                            key={track.uri}
                            track={track}
                            isPlaying={isPlaying}
                            onClick={() =>
                                onClick(track)}
                        />
                    )
                })}
        </div>
    )
}

export default TracksList

