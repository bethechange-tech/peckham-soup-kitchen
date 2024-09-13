"use client";
import React, { useState } from 'react';
import {
    FaSearch,
    FaBars,
    FaUserCircle,
    FaDollarSign
} from 'react-icons/fa';
import { useStore } from '../../../_zustand/store';
import Sidebar from '@/components/Portal/SideBar';

const Dashboard = () => {
    const currentUser = useStore((state) => state.currentUser);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Get current date
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        < main className="flex-1 p-4 md:p-8">
            {/* Header */}
            < header className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0 bg-white shadow-lg rounded-lg p-4" >
                <div className="relative w-full md:w-80">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-gray-100 px-4 py-2 pr-12 rounded-full shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition duration-300 w-full"
                    />
                    <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-500 hover:text-teal-700 transition duration-300 cursor-pointer" />
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <h2 className="text-gray-900 text-xl font-bold leading-tight">
                            {currentUser?.name || 'Guest User'}
                        </h2>
                        <p className="text-teal-600 text-md">
                            {currentUser?.roles?.join(', ') || 'No roles assigned'}
                        </p>
                    </div>
                    <div className="relative group">
                        <div className="rounded-full border-2 border-teal-500 shadow-md overflow-hidden w-12 h-12 sm:w-14 sm:h-14">
                            <img src="/images/user-avatar.png" alt="User Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full shadow-md"></div>
                    </div>
                </div>
            </header >



            {/* Welcome Section */}
            < section className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg p-8 mb-8 flex flex-col md:flex-row items-center justify-between shadow-lg space-y-4 md:space-y-0" >
                <div>
                    <p className="mb-2 text-sm font-light">{currentDate}</p>
                    <h1 className="text-3xl font-extrabold">{currentUser?.name}</h1>
                    <p className="font-light">Always stay updated in your student portal</p>
                </div>
                <FaUserCircle className="hidden md:block w-28 h-28" />
            </section >

            {/* Finance Section */}
            < section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" >
                {
                    [
                        { label: 'Total Payable', amount: '$10,000', icon: <FaDollarSign />, highlighted: false },
                        { label: 'Total Paid', amount: '$5,000', icon: <FaDollarSign />, highlighted: true },
                        { label: 'Others', amount: '$300', icon: <FaDollarSign />, highlighted: false }
                    ].map((item) => (
                        <div
                            key={item.label}
                            className={`bg-white rounded-xl shadow-xl p-6 flex items-center transition-transform transform hover:scale-105 ${item.highlighted ? 'border-4 border-teal-600' : 'border-2 border-gray-200'}`}
                        >
                            <div className="text-teal-600 bg-teal-100 p-3 rounded-full mr-4">
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-gray-700 text-sm font-medium">{item.label}</p>
                                <h3 className="text-2xl font-extrabold text-teal-600">{item.amount}</h3>
                            </div>
                        </div>
                    ))
                }
            </section >

            {/* Enrolled Courses */}
            < section className="my-8" >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">Enrolled Courses</h2>
                    <a href="#" className="text-teal-600 font-medium hover:underline transition duration-200 ease-in-out">
                        See all
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {['Object-Oriented Programming', 'Fundamentals of Database Systems'].map((course, idx) => (
                        <div
                            key={course + idx}
                            className="bg-white rounded-xl shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg"
                        >
                            <h3 className="text-gray-800 text-xl font-bold mb-4">{course}</h3>
                            <button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
                                View
                            </button>
                        </div>
                    ))}
                </div>
            </section >
        </main >
    );
};

export default Dashboard;
