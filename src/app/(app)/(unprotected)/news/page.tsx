'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { articles } from './data';

const Page = () => {
    const [filter, setFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('Newest');

    const filteredArticles = articles
        .filter(article => filter === 'All' || article.category === filter)
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
                        {['All', 'Events', 'Updates', 'Stories'].map(category => (
                            <button
                                key={category}
                                className={`py-2 px-4 rounded transition-all duration-300 ${filter === category ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-teal-100'}`}
                                onClick={() => setFilter(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="flex space-x-4">
                        <select
                            className="bg-gray-200 text-gray-600 py-2 px-4 rounded hover:bg-teal-100 transition-all duration-300"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="Newest">Newest</option>
                            <option value="Oldest">Oldest</option>
                            <option value="Title">Title</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Articles Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                {filteredArticles.map((article, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
                        <Image src={article.image} alt={article.title} width={400} height={250} className="w-full object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-bold text-teal-600 mb-2">{article.title}</h2>
                            <p className="text-gray-600 mb-4">{article.description}</p>
                            <Link href={article.link} legacyBehavior><a className="text-teal-600 hover:underline">Read more</a></Link>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}

export default Page;
