'use client';
import React from 'react';
import Image from 'next/image';
import { articles } from '../data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { Articles } from '@/payload-types';

// Utility function to format date
const formatDate = (dateString: string | number | Date) => {
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    } catch {
        return 'Invalid date';
    }
};

const getThreeRandomArticles = (allArticles: typeof articles) => {
    const shuffled = [...allArticles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
};

const ClientComp = ({ article }: { article: Articles }) => {
    const router = useRouter();
    const randomArticles = getThreeRandomArticles(articles);

    return (
        <div className="bg-gray-50 py-12 animate-fade-in">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Back Button */}
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => router.back()}
                        className="text-teal-600 hover:text-teal-700 transition-colors flex items-center space-x-2 hover:animate-pulse"
                        aria-label="Go back"
                    >
                        <FaArrowLeft className="h-5 w-5" />
                        <span>Back</span>
                    </button>
                </div>

                {/* Main Content and Sidebar */}
                <div className="md:flex md:space-x-8">
                    {/* Article Content */}
                    <div className="md:w-2/3 bg-white p-8 rounded-lg shadow-lg transition-all hover:shadow-xl animate-slide-up">
                        {/* Article Metadata */}
                        <div className="mb-6">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{article?.title}</h1>
                            <div className="flex items-center text-sm text-gray-500 space-x-2">
                                <span>By {article?.author}</span>
                                <span className="block w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>{(article?.category as any).name}</span>
                                <span className="block w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>{formatDate(article?.date)}</span>
                            </div>
                        </div>

                        {/* Article Image */}
                        <div className="mb-8">
                            <Image
                                src={article?.image || '/images/placeholder.png'}
                                alt={article?.title || 'Article Image'}
                                width={800}
                                height={450}
                                loading="lazy"
                                className="rounded-lg object-cover w-full shadow-md transition-transform transform hover:scale-105 animate-fade-in"
                            />
                        </div>

                        {/* Article Content */}
                        <div className="prose max-w-none text-gray-800 animate-fade-in">
                            <p style={{ whiteSpace: 'pre-line' }}>{article?.extendedDescription}</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="md:w-1/3 mt-12 md:mt-0 animate-slide-up">
                        {/* Related Articles */}
                        <div className="bg-white p-8 rounded-lg shadow-lg mb-8 transition-all hover:shadow-xl">
                            <h4 className="text-2xl font-bold mb-4 text-gray-900">Related Articles</h4>
                            <ul className="space-y-4">
                                {randomArticles.map((relatedArticle, index) => (
                                    <li key={index} className="hover:animate-bounce">
                                        <Link href={`/news/${relatedArticle.slug}`}>
                                            <span className="cursor-pointer text-teal-600 hover:text-teal-800 transition-colors font-medium">
                                                {relatedArticle.title}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Subscribe to Newsletter */}
                        <div className="bg-white p-8 rounded-lg shadow-lg transition-all hover:shadow-xl">
                            <h4 className="text-2xl font-bold mb-4 text-gray-900">Subscribe to Newsletter</h4>
                            <p className="text-gray-600 mb-6">Stay updated with the latest news and articles.</p>
                            <form className="animate-fade-in">
                                <input
                                    type="email"
                                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring focus:ring-teal-200 transition-shadow"
                                    placeholder="Enter your email"
                                    aria-label="Email address"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-teal-600 text-white py-3 rounded-lg shadow-lg hover:bg-teal-700 transition-colors font-semibold hover:animate-pulse"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ClientComp;
