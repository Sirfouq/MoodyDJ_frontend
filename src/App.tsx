import { useState } from 'react'

import './App.css'
import { LoginCard } from './LoginCard';

function App() {

  return (
    <main className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-indigo-50 to-white">
      <LoginCard />
    </main>
  )

}


export default App
