'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Articles } from '@/payload-types';
import { FaChevronDown } from 'react-icons/fa';

const Page: React.FC<{ catergories: string[], articles: Articles[] }> = ({ catergories, articles }) => {
    const [filter, setFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('Newest');

    const filteredArticles = articles
        ?.filter(article => filter === 'All' || (article.category as any).name === filter)
        .sort((a, b) => {
            if (sortOrder === 'Newest') {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            } else if (sortOrder === 'Oldest') {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            } else if (sortOrder === 'Title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Handle sorting option change
    const handleSortChange = (order: string) => {
        setSortOrder(order);
        setIsDropdownOpen(false); // Close dropdown after selecting an option
    };


    return (
        <>
            {/* Hero Section */}
            <section className="bg-gray-100 py-10 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-teal-600 mb-4">Our Blog & News</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    {`Stay updated with the latest news and events at Peckham Soup Kitchen. Learn about our initiatives and the impact we're making in the community.`}
                </p>
            </section>

            {/* Filter and Sort Section */}
            <section className="py-6">
                <div className="flex flex-wrap justify-between items-center px-6">
                    <div className="flex space-x-4 mb-4 md:mb-0">
                        {catergories?.map(category => (
                            <button
                                key={category}
                                className={`py-2 px-4 rounded transition-all duration-300 ${filter === category ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-teal-100'}`}
                                onClick={() => setFilter(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <button
                            className="flex items-center bg-gray-200 text-gray-600 py-2 px-4 rounded hover:bg-teal-100 transition-all duration-300"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            Sort By: {sortOrder} <FaChevronDown className="ml-2" />
                        </button>
                        {isDropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded shadow-lg z-50">
                                <li
                                    className={`py-2 px-4 cursor-pointer hover:bg-teal-100 transition-colors duration-200 ${sortOrder === 'Newest' ? 'bg-teal-600 text-white' : 'text-gray-700'}`}
                                    onClick={() => handleSortChange('Newest')}
                                >
                                    Newest
                                </li>
                                <li
                                    className={`py-2 px-4 cursor-pointer hover:bg-teal-100 transition-colors duration-200 ${sortOrder === 'Oldest' ? 'bg-teal-600 text-white' : 'text-gray-700'}`}
                                    onClick={() => handleSortChange('Oldest')}
                                >
                                    Oldest
                                </li>
                                <li
                                    className={`py-2 px-4 cursor-pointer hover:bg-teal-100 transition-colors duration-200 ${sortOrder === 'Title' ? 'bg-teal-600 text-white' : 'text-gray-700'}`}
                                    onClick={() => handleSortChange('Title')}
                                >
                                    Title
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </section>

            {/* Articles Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-8">
                {filteredArticles.map((article, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
                    >
                        <Image
                            src={article.image}
                            alt={article.title}
                            width={400}
                            height={250}
                            className="w-full object-cover h-56 transition-transform duration-300 ease-in-out hover:scale-105"
                            loading="lazy"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-teal-700 mb-3">{article.title}</h2>
                            <p className="text-gray-700 mb-5 leading-relaxed">{article.description}</p>
                            <Link href={`/news/${article.slug}`} legacyBehavior>
                                <a className="inline-block text-teal-700 font-medium hover:underline hover:text-teal-500 transition-colors duration-200">
                                    Read more →
                                </a>
                            </Link>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}

export default Page;
