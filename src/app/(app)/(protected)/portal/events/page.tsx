"use client";
import React from 'react';
import Image from 'next/image';

const Page = () => {
    return (
        <div className="flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl"> {/* Adjusted max width to max-w-3xl */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">Create Event</h2>
                    <button className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
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

                <form>
                    {/* Event Name */}
                    <div className="mb-6">
                        <label
                            htmlFor="event-name"
                            className="block text-sm font-semibold text-gray-700"
                        >
                            Event Name
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="text"
                                id="event-name"
                                className="block w-full border border-gray-300 rounded-lg p-3 pr-28 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                placeholder="Enter event name"
                            />
                            <button
                                type="button"
                                className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Add Description
                            </button>
                        </div>
                    </div>
                    {/* Date and Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label
                                htmlFor="date"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Date
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type="date"
                                    id="date"
                                    className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="time"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Time
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type="time"
                                    id="time"
                                    className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Duration */}
                    <div className="mb-6">
                        <label
                            htmlFor="duration"
                            className="block text-sm font-semibold text-gray-700"
                        >
                            Duration
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="text"
                                id="duration"
                                className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                placeholder="3h 45m"
                            />
                        </div>
                    </div>
                    {/* Location */}
                    <div className="mb-6">
                        <label
                            htmlFor="location"
                            className="block text-sm font-semibold text-gray-700"
                        >
                            Location
                        </label>
                        <div className="relative mt-1 flex">
                            <select
                                id="location"
                                className="block w-full border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                                <option>Choose Location</option>
                                <option>Room 1</option>
                                <option>Room 2</option>
                            </select>
                            <button
                                type="button"
                                className="bg-green-600 text-white px-4 py-2 rounded-r-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Set Meeting Room
                            </button>
                        </div>
                    </div>
                    {/* Add Guests */}
                    <div className="mb-6">
                        <label
                            htmlFor="guests"
                            className="block text-sm font-semibold text-gray-700"
                        >
                            Add Guests
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="email"
                                id="guests"
                                className="block w-full border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                placeholder="contact@example.com"
                            />
                            <button
                                type="button"
                                className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    {/* Guest Avatars */}
                    <div className="flex items-center mt-6">
                        <div className="flex -space-x-4">
                            <Image
                                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                                src="https://via.placeholder.com/40"
                                alt="Guest 1"
                                width={40}
                                height={40}
                            />
                            <Image
                                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                                src="https://via.placeholder.com/40"
                                alt="Guest 2"
                                width={40}
                                height={40}
                            />
                            <Image
                                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                                src="https://via.placeholder.com/40"
                                alt="Guest 3"
                                width={40}
                                height={40}
                            />
                            <Image
                                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                                src="https://via.placeholder.com/40"
                                alt="Guest 4"
                                width={40}
                                height={40}
                            />
                            <Image
                                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                                src="https://via.placeholder.com/40"
                                alt="Guest 5"
                                width={40}
                                height={40}
                            />
                        </div>
                        <span className="text-sm text-gray-500 ml-4">+3</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Page;
