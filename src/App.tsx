import { useState } from 'react'



import './App.css'

function App() {

  return (
    <main className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-indigo-50 to-white">
      <LoginCard />
    </main>
  )

}


const LoginCard = () => {

  return (
    // This is the main white card with shadow and padding
    <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl w-full max-w-md text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Welcome to MoodyDJ
      </h1>
      <p className="text-gray-500 mb-8">
        Log in to start creating playlists from your mood.
      </p>
      <LoginButton />
    </div>
  );
}


const LoginButton = () => {
  return (
    <button

      onClick={() => alert('Button clicked!')}
      className="inline-block bg-green-500 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
    >
      Login with Spotify
    </button>
  );
};

export default App
