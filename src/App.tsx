import { useState } from 'react'
import { check_auth_status } from './services/backend_api_comm'

import './App.css'
import { LoginCard } from './LoginCard';

function App() {

  return (
    <main className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-indigo-50 to-white">
      <LoginCard onClick={check_auth_status} />
    </main>
  )

}


export default App
