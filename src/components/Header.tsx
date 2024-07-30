'use client';
import { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <header className="bg-green-600 py-4 md:py-6">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-white text-2xl md:text-3xl font-bold">
                    Peckham Soup Kitchen
                </h1>
                <nav className="hidden md:flex space-x-4 md:space-x-6 text-sm md:text-base">
                    <a href="/" className="text-white hover:underline">
                        Home
                    </a>
                    <a href="#" className="text-white hover:underline">
                        About
                    </a>
                    <a href="#" className="text-white hover:underline">
                        Programs
                    </a>
                    <a href="/donate" className="text-white hover:underline">
                        Donate
                    </a>
                </nav>
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-green-600`}>
                <a href="#" className="block py-2 px-4 text-white hover:bg-green-700">
                    Home
                </a>
                <a href="#" className="block py-2 px-4 text-white hover:bg-green-700">
                    About
                </a>
                <a href="#" className="block py-2 px-4 text-white hover:bg-green-700">
                    Programs
                </a>
                <a href="#" className="block py-2 px-4 text-white hover:bg-green-700">
                    Donate
                </a>
            </div>
        </header>
    )
}

export default Header