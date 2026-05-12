import { Textarea } from '@/components/ui/textarea'
import { useContext, useState } from 'react'
import { ArrowRight } from 'lucide-react';
import { generate_playlist, type Track } from '@/services/backend_api_comm';
import useSpotifyPlayer from '@/hooks/useSpotifyPlayer';
import { AuthContext } from '@/contexts/AuthContext';


export const HomePage = () => {

  const [input, setInput] = useState('');
  const isVisible = input.trim() !== '';
  const [tracks, setTracks] = useState<Track[]>([])
  const { access_token } = useContext(AuthContext)
  const { player, deviceId } = useSpotifyPlayer(access_token ?? '')




  const handleSubmit = async () => {
    setTracks([])
    const tracks = await generate_playlist(input)
    setTracks(tracks)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className='flex flex-col items-center justify-center  w-full px-4'>
      <div className='relative w-full max-w-3xl'>
        <Textarea placeholder='How are you feeling today ?'
          onChange={(e) => setInput(e.target.value)}
          value={input}
          onKeyDown={handleKeyDown} />
        <button className={`absolute bottom-4 right-3 p-1.5 rounded-lg             
  bg-indigo-500 text-white hover:bg-indigo-300 active:scale-90 transition-all duration-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
          onClick={handleSubmit}>
          <ArrowRight size={20} />
        </button>
      </div>


      {`Device Id : ${deviceId}`}



    </div>
  )
}
