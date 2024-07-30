'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-teal-600 py-4 md:py-6">
            <div className="container mx-auto flex justify-between items-center px-4">
                <Link href="/">
                    <div className="flex items-center cursor-pointer">
                        <Image
                            src="/images/logo-removebg-preview.png" // Replace with your logo path
                            alt="Peckham Soup Kitchen Logo"
                            width={60}
                            height={60}
                            style={{ width: "auto", height: "auto" }}
                            className="mr-2"
                        />
                    </div>
                </Link>
                <nav className="hidden md:flex space-x-4 md:space-x-6 text-sm md:text-base">
                    <Link href="/">
                        <div className="text-white hover:underline">Home</div>
                    </Link>
                    <Link href="/about">
                        <div className="text-white hover:underline">About</div>
                    </Link>
                    <Link href="/news">
                        <div className="text-white hover:underline">News</div>
                    </Link>
                    <Link href="/donate">
                        <div className="text-white hover:underline">Donate</div>
                    </Link>
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
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-teal-600`}>
                <Link href="/">
                    <div className="block py-2 px-4 text-white hover:bg-teal-700">Home</div>
                </Link>
                <Link href="/about">
                    <div className="block py-2 px-4 text-white hover:bg-teal-700">About</div>
                </Link>
                <Link href="/news">
                    <div className="block py-2 px-4 text-white hover:bg-teal-700">News</div>
                </Link>
                <Link href="/donate">
                    <div className="block py-2 px-4 text-white hover:bg-teal-700">Donate</div>
                </Link>
            </div>
        </header>
    );
}

export default Header;
