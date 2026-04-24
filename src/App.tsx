import { Outlet } from 'react-router'
import './App.css'

const App = () => {


  return (
    <main className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-indigo-50 to-white">
      <Outlet />
    </main>
  )
}

export default App
