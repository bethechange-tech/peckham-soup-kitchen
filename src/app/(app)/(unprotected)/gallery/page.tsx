'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Page = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Main Content */}
            <main className="container mx-auto p-6">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">Photo Gallery</h1>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Search"
                            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <div className="flex items-center space-x-2">
                            <div className="bg-gray-200 p-2 rounded-full">
                                <Image
                                    src="https://via.placeholder.com/150"
                                    alt="user"
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                            </div>
                            <span className="font-medium text-gray-700">Brittany</span>
                        </div>
                    </div>
                </header>

                {/* Filter and Gallery */}
                <div>
                    <div className="flex flex-wrap items-center space-x-2 mb-6">
                        <span className="px-4 py-2 bg-green-200 text-green-800 rounded-full cursor-pointer hover:bg-green-300 transition">All</span>
                        <span className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full cursor-pointer hover:bg-gray-300 transition">Branding</span>
                        <span className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full cursor-pointer hover:bg-gray-300 transition">Design</span>
                        <span className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full cursor-pointer hover:bg-gray-300 transition">Development</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array(12).fill("").map((_, index) => (
                            <motion.div
                                key={index}
                                className="bg-white shadow-lg rounded-lg overflow-hidden"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <ImageWithPlaceholder index={index} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

// Component to handle image loading and display a placeholder
const ImageWithPlaceholder = ({ index }: { index: number }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="relative w-full h-48">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <div className="loader border-t-4 border-teal-600 rounded-full w-12 h-12 animate-spin"></div>
                </div>
            )}
            <Image
                src={`https://via.placeholder.com/400x300`}
                alt={`Placeholder ${index + 1}`}
                layout="fill"
                objectFit="cover"
                onLoadingComplete={() => setIsLoading(false)}
                className="w-full h-full"
            />
        </div>
    );
};

export default Page;
