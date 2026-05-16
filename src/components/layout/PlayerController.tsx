import React from 'react'

interface PlayerControllerProps {
    player: Spotify.Player | null,
    isPaused: boolean,
    isActive: boolean,
    current_track: Spotify.Track | null
}


export const PlayerController = ({ player, isPaused, isActive, current_track }: PlayerControllerProps) => {
    return (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-neutral-900 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img src={current_track?.album.images[0].url} className="w-12 h-12 rounded" />
                <p className="text-white text-sm font-medium">{current_track?.name}</p>
                <p className="text-neutral-400 text-xs">{current_track?.artists[0].name}</p>

            </div>

            <div className="flex flex-col items-center gap-1">

            </div>
            <div className="flex items-center gap-2">

            </div>


        </div>
    )
}

