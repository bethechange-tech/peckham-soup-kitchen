'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import Image from 'next/image';
import { articles } from '../data';

const NewsArticle = () => {
    // Assuming we're displaying the first article for this example
    const article = articles[0];

    if (!article) {
        return <p>Article not found</p>;
    }

    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-6">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-col lg:flex-row">
                    {/* Article Image Section */}
                    <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                        <Image
                            src={article.image}
                            alt={article.title}
                            layout="responsive"
                            width={700}
                            height={400}
                            className="rounded-lg object-cover"
                        />
                    </div>

                    {/* Article Details Section */}
                    <div className="lg:w-1/2 lg:pl-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">{article.title}</h1>
                        <p className="text-gray-700 font-semibold">{article.category}</p>
                        <p className="text-gray-500 mb-4">{new Date(article.date).toDateString()}</p>

                        <div className="prose max-w-none text-gray-700 mb-6 lg:h-72 overflow-y-auto">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.description}</ReactMarkdown>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.extendedDescription}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsArticle;
