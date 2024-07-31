import React from 'react'
import Link from 'next/link';

const WelcomeSection = () => {
    return (
        <section className="text-center bg-teal-100 p-6 md:p-10 rounded-lg shadow-md mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">
                Welcome To Peckham Soup Kitchen
            </h2>
            <p className="text-teal-600 mb-6 max-w-2xl mx-auto">
                At Peckham Soup Kitchen, we work continuously to support members of the
                Southwark community in need and empower them to improve their lives and
                wellbeing.
            </p>
            <Link href={'/donate'}>
                <button className="hero-button bg-teal-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-full shadow-md transform transition duration-300 ease-in-out hover:bg-teal-700 hover:-translate-y-1">
                    Get Started
                </button>
            </Link>
        </section>
    )
}

export default WelcomeSection