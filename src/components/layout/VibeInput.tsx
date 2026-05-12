import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react';

interface inputProps {
  onSubmit: (input: string) => void
}

const VibeInput = ({ onSubmit }: inputProps) => {
  const [input, setInput] = useState('');
  const isVisible = input.trim() !== '';


  const handleSubmit = () => {
    onSubmit(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
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
  )
}

export default VibeInput