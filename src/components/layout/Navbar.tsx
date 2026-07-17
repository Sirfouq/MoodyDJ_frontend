import type { UserProfile } from '@/services/backend_api_comm'
import { Link } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logout } from '@/services/backend_api_comm'


type NavLink = {
    label: string
    to: string
}
type NavbarProps = {
    links: NavLink[]
    profile: UserProfile | null
    profileLoading: boolean
}


export const Navbar = ({ links, profile, profileLoading }: NavbarProps) => {
    const handleLogout = async () => {
        try {
            await logout()
        }
        finally {
            window.location.reload()
        }

    }
    return (
        <nav className="z-40 shrink-0 px-6 py-4 transparent backdrop-blur-md border-b border-black/5 flex items-center justify-between">
            <span className="font-bold text-black">MELODYSSEY</span>
            <div className="flex items-center gap-4 text-sm text-gray-600">
                {links.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className='hover:text-gray-900'>
                        {link.label}
                    </Link>
                ))}
                {profile ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                                {profile.images[0]?.url ? (
                                    <img
                                        src={profile.images[0].url}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-sm font-medium text-gray-700">
                                        {profile.display_name[0]}
                                    </span>
                                )}
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel className='flex flex-col'>
                                <span className='text-xs font-normal text-gray-500'>Signed in as: </span>
                                {profile.display_name}
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                                className='text-md text-indigo-500'
                                onClick={handleLogout}>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className={`w-8 h-8 rounded-full bg-gray-300 ${profileLoading ? 'animate-pulse' : ''}`} />
                )}
            </div>
        </nav>
    )
}

