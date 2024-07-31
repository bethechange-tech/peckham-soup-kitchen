'use client';

import React from 'react';
import Image from 'next/image';
import { articles } from '../data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const getThreeRandomArticles = (allArticles: typeof articles) => {
    const shuffled = allArticles.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
};

const NewsArticle = ({ params: { id: slug } }: { params: { id: string } }) => {
    const router = useRouter();
    const article = articles.find(article => article?.slug === slug);
    const randomArticles = getThreeRandomArticles(articles);

    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Back Button */}
                <div className="flex items-center mb-6">
                    <button onClick={() => router.back()} className="text-teal-600 hover:underline flex items-center">
                        <FaArrowLeft className="h-5 w-5 mr-2" />
                        Back
                    </button>
                </div>

                {/* Main Content and Sidebar */}
                <div className="md:flex md:space-x-6">
                    <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md overflow-hidden">
                        {/* Article Metadata */}
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">{article?.title}</h1>
                            <div className="flex items-center text-sm text-gray-500">
                                <span>By {article?.author}</span>
                                <span className="mx-2">|</span>
                                <span>{article?.category}</span>
                                <span className="mx-2">|</span>
                                <span>{article?.date}</span>
                            </div>
                        </div>

                        {/* Article Image */}
                        <div className="mb-6">
                            <Image
                                src={article?.image || '/images/placeholder.png'}
                                alt="Article Image"
                                width={800}
                                height={450}
                                loading="lazy"
                                className="rounded-lg object-cover w-full"
                            />
                        </div>

                        {/* Article Content */}
                        <div className="prose max-w-none text-gray-700 whitespace-normal break-words">
                            <p className='break-normal' style={{ whiteSpace: 'pre-line' }}>{article?.extendedDescription}</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="md:w-1/3 mt-6 md:mt-0">
                        {/* Related Articles */}
                        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <h4 className="text-xl font-bold mb-4 text-gray-800">Related Articles</h4>
                            <ul>
                                {randomArticles.map((article, index) => (
                                    <li key={index} className="mb-4">
                                        <Link href={`/news/${article.slug}`} className="text-teal-600 hover:underline">
                                            {article.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Subscribe to Newsletter */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h4 className="text-xl font-bold mb-4 text-gray-800">Subscribe to Newsletter</h4>
                            <p className="text-gray-600 mb-4">Stay updated with the latest news and articles.</p>
                            <form>
                                <input
                                    type="email"
                                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                    placeholder="Enter your email"
                                />
                                <button className="w-full bg-teal-600 text-white py-2 rounded-lg shadow-md hover:bg-teal-700">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default NewsArticle;
