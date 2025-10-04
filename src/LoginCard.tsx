import spotifyIcon from './assets/spotify-color-svgrepo-com.svg';


interface LoginCardProps {
    onClick: () => void
}

export const LoginCard = ({ onClick }: LoginCardProps) => {

    return (

        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl w-full max-w-md text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                Welcome to MoodyDJ
            </h1>
            <p className="text-gray-500 mb-8">
                Log in to start creating playlists from your mood.
            </p>
            <LoginButton onClick={onClick} />
        </div>
    );
};
const LoginButton = ({ onClick }: LoginCardProps) => {
    return (
        <button
            onClick={() => onClick()}
            className="inline-flex items-center justify-center gap-3 bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-md hover:bg-green-800 transition-colors duration-300">
            <img src={spotifyIcon} alt="Spotify" className="w-6 h-6" />
            Login with Spotify
        </button>
    );
};
