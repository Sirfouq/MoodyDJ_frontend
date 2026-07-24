import { SpotifyIcon } from '@/components/icons/SpotifyIcon';
import { API_ENDPOINTS } from '../services/config';
import { useState } from 'react';
import { useAuthError } from '@/hooks/useAuthError';

// interface LoginCardProps {
//     onClick: () => void
// }

export const LoginPage = () => {
    const [spotlight, setSpotlight] = useState({ x: 50, y: 50 })
    const [isHovering, setIsHovering] = useState(false)
    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const authError = useAuthError()
    return (

        <div className="relative overflow-hidden  bg-indigo-100/50 backdrop-blur-md border border-indigo-200/60 rounded-2xl shadow-xl p-8 sm:p-12 w-full max-w-md text-center animate-in fade-in zoom-in-95 duration-500"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = ((e.clientX - rect.left) / rect.width) * 100
                const y = ((e.clientY - rect.top) / rect.height) * 100
                setSpotlight({ x, y })
                setTilt({ x: (y - 50) * -0.28, y: (x - 50) * 0.28 })

            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false)
                setTilt({ x: 0, y: 0 })
            }}

            style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 100ms ease-out',
            }}>
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                    opacity: isHovering ? 1 : 0,
                    background: `radial-gradient(400px circle at ${spotlight.x}% ${spotlight.y}%, rgba(129,140,248,0.3), transparent 40%)`,
                }}
            />
            <div className='relative z-10'>
                <h1 className="text-2xl sm:text-3xl font-display  text-gray-900 mb-6">
                    MELODYSSEY
                </h1>
                <p className="text-gray-600 mb-8">
                    Connect with your Spotify Account to continue.
                </p>

                {authError && (
                    <p className="text-sm text-red-500 mb-4">{authError}</p>
                )}
                <LoginButton />
            </div>
        </div>
    );
};
const LoginButton = () => {


    return (

        <a href={API_ENDPOINTS.LOGIN}>
            <div className="inline-flex items-center justify-center gap-3 bg-indigo-600 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-md hover:bg-indigo-400 transition-all duration-300 hover:scale-[1.02]">
                <SpotifyIcon className='w-6 h-6'></SpotifyIcon>
                Login with Spotify
            </div>
        </a>
    );
};
