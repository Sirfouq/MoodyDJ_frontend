import type { Track } from '@/services/backend_api_comm'
import React from 'react'

type TrackCardProps = {
    track: Track
    isPlaying: boolean
    onClick: () => void
}

export const TrackCard = ({ track, isPlaying, onClick }: TrackCardProps) => {
    return (
        <button
            onClick={onClick}
            className="
                  relative overflow-hidden rounded-lg
                  h-24 w-full text-left cursor-pointer
                  transition-transform hover:scale-[1.01]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
              "
        >
            {/* Layer 1 — Blurred album background */}
            <img
                src={track.album_image_url}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 z-0"
            />

            {/* Layer 2 — Mirrored animated bars, only when playing */}
            {isPlaying && (
                <>
                    {/* bottom-anchored bars */}
                    <div className="absolute inset-0 z-10 flex items-end gap-1 px-2 
  pointer-events-none">
                        {Array.from({ length: 28 }).map((_, i) => (
                            <span
                                key={`bot-${i}`}
                                className="flex-1 bg-white/20 rounded-t animate-equalize"
                                style={{
                                    animationDelay: `${(i * 70) % 600}ms`,
                                    transformOrigin: 'bottom',
                                }}
                            />
                        ))}
                    </div>
                    {/* top-anchored bars, phase-offset by half cycle */}
                    <div className="absolute inset-0 z-10 flex items-start gap-1 px-2 
  pointer-events-none">
                        {Array.from({ length: 28 }).map((_, i) => (
                            <span
                                key={`top-${i}`}
                                className="flex-1 bg-white/20 rounded-b animate-equalize"
                                style={{
                                    animationDelay: `${(i * 70 + 350) % 600}ms`,
                                    transformOrigin: 'top',
                                }}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Layer 3 — Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/45 z-20" />

            {/* Layer 4 — Content: icon left, text right, vertically centered */}
            <div className="relative z-30 h-full flex items-center gap-4 px-4">
                <img
                    src={track.album_image_url}
                    alt={track.name}
                    className="h-16 w-16 rounded-md object-cover shadow-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{track.name}</p>
                    <p className="text-sm text-white/70 truncate">
                        {track.artists.join(', ')}
                    </p>
                </div>
            </div>
        </button>
    )
}

