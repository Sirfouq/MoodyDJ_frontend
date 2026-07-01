import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { Slider } from "../ui/slider"
import { Button } from "../ui/button"
import { useState } from "react"
interface PlayerControllerProps {
    player: Spotify.Player | null,
    isPaused: boolean,
    isActive: boolean,
    current_track: Spotify.Track | null
    position: number
    volume: number
    seek: (ms: number) => void
    adjustVolume: (volume: number) => void
}


export const PlayerController = ({ player, isPaused, isActive, current_track, position, volume, seek, adjustVolume }: PlayerControllerProps) => {

    const [seekPosition, setSeekPosition] = useState<number | null>(null)
    return (
        <div className="w-full bg-neutral-900 px-4 py-5 
  flex items-center justify-between">
            <div className="flex items-center gap-3 w-64">
                <img src={current_track?.album.images[0].url} className="w-12 h-12 rounded shrink-0" />
                <div>
                    <p className="text-white text-sm font-medium truncate">{current_track?.name}</p>
                    <p className="text-neutral-400 text-xs truncate">{current_track?.artists[0].name}</p>
                </div>

            </div>

            <div className="flex-1 flex flex-col items-center gap-1">
                <div className='flex items-center gap-4 justify-center'>
                    <button

                        className="text-white"
                        onClick={() => player?.previousTrack()}

                    >
                        <SkipBack />
                    </button>

                    <button

                        className="text-white"
                        onClick={() => {
                            console.log('player', player)
                            player?.togglePlay()
                        }}
                    >
                        {isPaused ? <Play /> : <Pause />}
                    </button>

                    <button

                        className="text-white"
                        onClick={() => player?.nextTrack()}
                    >
                        <SkipForward />
                    </button>
                </div>
                <div className="w-96 text-white">
                    <Slider
                        value={[seekPosition ?? position]}
                        max={current_track?.duration_ms ?? 100}
                        className="w-96 [&_[data-slot=slider-track]]:bg-neutral-600
  [&_[data-slot=slider-range]]:bg-white  [&_[data-slot=slider-thumb]]:border-white"
                        onValueChange={(val) => setSeekPosition(val[0])}
                        onValueCommit={(val) => {
                            seek(val[0])
                            setSeekPosition(null)
                        }}
                    />

                </div>

            </div>
            <div className="flex items-center gap-2 w-32 justify-end">
                <Slider
                    value={[volume]}
                    max={1}
                    step={0.01}
                    className="w-full [&_[data-slot=slider-track]]:bg-neutral-600
  [&_[data-slot=slider-range]]:bg-white  [&_[data-slot=slider-thumb]]:border-white
  "
                    onValueChange={(volume) => adjustVolume(volume[0])}>

                </Slider>


            </div>


        </div>
    )
}

