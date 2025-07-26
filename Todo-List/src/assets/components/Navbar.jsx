import React from 'react'

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between bg-emerald-950 text-white px-4 py-2 shadow-md">
            <div className='logo'><span className="text-lg font-bold tracking-wide">SR7</span></div>

            <ul className="flex gap-6">
                <li className="hover:text-slate-300 transition-colors cursor-pointer">Home</li>
                <li className="hover:text-slate-300 transition-colors cursor-pointer">Your Task</li>
            </ul>
        </nav>

    )
}

export default Navbar
