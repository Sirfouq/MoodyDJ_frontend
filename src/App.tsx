import { useContext, useState } from 'react'


import './App.css'
import { LoginCard } from './LoginCard';
import { AuthContext } from './util/AuthContext';

const App = () => {
  const { isLoggedIn } = useContext(AuthContext)
  return (

    <main className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-indigo-50 to-white">
      {isLoggedIn ? <div>Welcome home</div> : <LoginCard />}
    </main>
  )

}


export default App
