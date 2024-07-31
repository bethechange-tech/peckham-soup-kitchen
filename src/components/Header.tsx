'use client';
import { useState, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        if (isMenuOpen) {
            const handleOutsideClick: any = (event: MouseEvent) => {
                const target = event.target as HTMLElement;
                if (!target.closest('.menu-content') && !target.closest('.menu-button')) {
                    closeMenu();
                }
            };

            document.addEventListener('click', handleOutsideClick);

            return () => {
                document.removeEventListener('click', handleOutsideClick);
            };
        }
    }, [isMenuOpen]);

    return (
        <header className="bg-teal-600 py-4 md:py-6">
            <div className="container mx-auto flex justify-between items-center px-4">
                <Link href="/" onClick={closeMenu}>
                    <div className="flex items-center cursor-pointer">
                        <Image
                            src="/images/logo-removebg-preview.png"
                            alt="Peckham Soup Kitchen Logo"
                            width={60}
                            height={60}
                            className="mr-2"
                        />
                    </div>
                </Link>
                <nav className="hidden md:flex space-x-4 md:space-x-6 text-sm md:text-base">
                    <Link href="/">
                        <div className={`text-white hover:underline ${pathname === '/' ? 'font-bold underline' : ''}`}>
                            Home
                        </div>
                    </Link>
                    <Link href="/about">
                        <div className={`text-white hover:underline ${pathname === '/about' ? 'font-bold underline' : ''}`}>
                            About
                        </div>
                    </Link>
                    <Link href="/news">
                        <div className={`text-white hover:underline ${pathname === '/news' ? 'font-bold underline' : ''}`}>
                            News
                        </div>
                    </Link>
                    <Link href="/donate">
                        <div className={`text-white hover:underline ${pathname === '/donate' ? 'font-bold underline' : ''}`}>
                            Donate
                        </div>
                    </Link>
                </nav>
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none menu-button"
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
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden fixed inset-0 bg-gray-800 bg-opacity-90 z-50`}>
                <div className="flex justify-between items-center p-4 bg-teal-600">
                    <h2 className="text-white text-xl font-bold">MENU</h2>
                    <button onClick={closeMenu} className="text-white focus:outline-none">
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col space-y-2 p-4 menu-content text-lg">
                    <Link href="/">
                        <div onClick={closeMenu} className={`flex items-center py-4 px-6 text-white hover:bg-teal-700 ${pathname === '/' ? 'font-bold underline' : ''}`}>
                            <span className="mr-2">🏠</span>
                            Home
                        </div>
                    </Link>
                    <Link href="/about">
                        <div onClick={closeMenu} className={`flex items-center py-4 px-6 text-white hover:bg-teal-700 ${pathname === '/about' ? 'font-bold underline' : ''}`}>
                            <span className="mr-2">📖</span>
                            About
                        </div>
                    </Link>
                    <Link href="/news">
                        <div onClick={closeMenu} className={`flex items-center py-4 px-6 text-white hover:bg-teal-700 ${pathname === '/news' ? 'font-bold underline' : ''}`}>
                            <span className="mr-2">📰</span>
                            News
                        </div>
                    </Link>
                    <Link href="/donate">
                        <div onClick={closeMenu} className={`flex items-center py-4 px-6 text-white hover:bg-teal-700 ${pathname === '/donate' ? 'font-bold underline' : ''}`}>
                            <span className="mr-2">💰</span>
                            Donate
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
