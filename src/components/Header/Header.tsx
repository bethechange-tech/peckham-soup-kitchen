'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useAnimation } from 'framer-motion';
import { User } from 'payload';
import { useStore } from '../../app/_zustand/store';

interface HeaderProps {
    user?: User | null | undefined
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    const setCurrentUser = useStore((state) => state.setCurrentUser);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = usePathname();
    const controls = useAnimation();

    const currentUser = useMemo(() => user, [user]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        if (isMenuOpen) {
            const handleOutsideClick = (event: MouseEvent) => {
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

    useEffect(() => {
        const bounceAnimation = async () => {
            await controls.start({ y: -20 });
            await controls.start({ y: 0 });
        };

        const interval = setInterval(() => {
            bounceAnimation();
        }, 3000);

        return () => clearInterval(interval);
    }, [controls]);

    useEffect(() => {
        setCurrentUser(currentUser);
    });

    return (
        <header className="bg-teal-600 py-4 md:py-6 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4">
                <Link href="/" onClick={closeMenu}>
                    <motion.div
                        className="flex items-center cursor-pointer"
                        animate={controls}
                        initial={{ y: 0 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Image
                            src="/images/logo-removebg-preview.png"
                            alt="Peckham Soup Kitchen Logo"
                            width={60}
                            height={60}
                            className="mr-2"
                        />
                    </motion.div>
                </Link>
                <nav className="hidden md:flex flex-grow justify-center space-x-4 md:space-x-6 text-sm md:text-base">
                    <Link href="/">
                        <div className={`text-white hover:underline ${router === '/' ? 'font-bold underline' : ''}`}>
                            Home
                        </div>
                    </Link>
                    <Link href="/about">
                        <div className={`text-white hover:underline ${router === '/about' ? 'font-bold underline' : ''}`}>
                            About
                        </div>
                    </Link>
                    <Link href="/news">
                        <div className={`text-white hover:underline ${router === '/news' ? 'font-bold underline' : ''}`}>
                            News
                        </div>
                    </Link>
                    <Link href="/donate">
                        <div className={`text-white hover:underline ${router === '/donate' ? 'font-bold underline' : ''}`}>
                            Donate
                        </div>
                    </Link>
                    <Link href="/gallery">
                        <div className={`text-white hover:underline ${router === '/gallery' ? 'font-bold underline' : ''}`}>
                            Gallery
                        </div>
                    </Link>
                </nav>
                <div className="hidden md:flex ml-auto">
                    {currentUser ? (
                        <Link href="/portal">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm md:text-base font-semibold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                            >
                                Portal
                            </motion.button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm md:text-base font-semibold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                            >
                                Login
                            </motion.button>
                        </Link>
                    )}
                </div>
                <div className="md:hidden">
                    <motion.button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none menu-button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
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
                    </motion.button>
                </div>
            </div>
            <motion.div
                className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden fixed inset-0 bg-gray-800 bg-opacity-90 z-50`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isMenuOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex justify-between items-center p-4 bg-teal-600">
                    <h2 className="text-white text-xl font-bold">MENU</h2>
                    <motion.button
                        onClick={closeMenu}
                        className="text-white focus:outline-none"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </motion.button>
                </div>
                <div className="flex flex-col space-y-4 p-6 menu-content text-lg">
                    <Link href="/">
                        <motion.div
                            onClick={closeMenu}
                            className={`flex items-center py-4 px-6 text-white hover:bg-teal-700 rounded-md transition duration-300 ${router === '/' ? 'font-bold underline' : ''}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="mr-2">🏠</span>
                            Home
                        </motion.div>
                    </Link>
                    <Link href="/about">
                        <motion.div
                            onClick={closeMenu}
                            className={`flex items-center py-4 px-6 text-white hover:bg-teal-700 rounded-md transition duration-300 ${router === '/about' ? 'font-bold underline' : ''}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="mr-2">📖</span>
                            About
                        </motion.div>
                    </Link>
                    <Link href="/news">
                        <motion.div
                            onClick={closeMenu}
                            className={`flex items-center py-4 px-6 text-white hover:bg-teal-700 rounded-md transition duration-300 ${router === '/news' ? 'font-bold underline' : ''}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="mr-2">📰</span>
                            News
                        </motion.div>
                    </Link>
                    <Link href="/donate">
                        <motion.div
                            onClick={closeMenu}
                            className={`flex items-center py-4 px-6 text-white hover:bg-teal-700 rounded-md transition duration-300 ${router === '/donate' ? 'font-bold underline' : ''}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="mr-2">💰</span>
                            Donate
                        </motion.div>
                    </Link>
                    <Link href="/gallery">
                        <motion.div
                            onClick={closeMenu}
                            className={`flex items-center py-4 px-6 text-white hover:bg-teal-700 rounded-md transition duration-300 ${router === '/gallery' ? 'font-bold underline' : ''}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="mr-2">🎨</span>
                            Gallery
                        </motion.div>
                    </Link>
                    {currentUser ? (
                        <Link href="/portal">
                            <motion.div
                                onClick={closeMenu}
                                className="flex items-center py-4 px-6 text-white hover:bg-teal-700 rounded-md transition duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="mr-2">🔑</span>
                                Portal
                            </motion.div>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <motion.div
                                onClick={closeMenu}
                                className="flex items-center py-4 px-6 text-white hover:bg-teal-700 rounded-md transition duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="mr-2">🔒</span>
                                Login
                            </motion.div>
                        </Link>
                    )}
                </div>
            </motion.div>
        </header>
    );
};

export default Header;
