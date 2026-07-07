
import React from 'react'
import { Link } from 'react-router-dom'


type NavLink = {
    label: string
    to: string
}
type NavbarProps = {
    links: NavLink[]
}


export const Navbar = ({ links }: NavbarProps) => {
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
                <div className="w-8 h-8 rounded-full bg-gray-300" />
            </div>
        </nav>
    )
}

