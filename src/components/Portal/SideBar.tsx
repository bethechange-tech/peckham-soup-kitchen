'use client';

import React from 'react';
import {
    FaTachometerAlt,
    FaDollarSign,
    FaUserGraduate,
    FaFileInvoiceDollar,
    FaBook,
    FaCalendarAlt,
    FaRegFileAlt,
    FaBell,
    FaPowerOff,
    FaImage,
    FaCalendarDay
} from 'react-icons/fa';
import Link from 'next/link'; // Use Link for navigation

interface SidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <>
            {/* Sidebar as Modal on Mobile */}
            <aside
                className={`fixed inset-0 z-50 md:relative md:z-0 md:translate-x-0 bg-gradient-to-b from-teal-600 to-cyan-600 text-white flex flex-col py-8 px-6 shadow-xl transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:w-64`}
            >
                <div className="flex items-center justify-center mb-10">
                    <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
                        <FaUserGraduate size={40} />
                    </div>
                </div>

                {/* Sidebar Top Section */}
                <nav className="flex flex-col space-y-4">
                    {[
                        { name: 'Dashboard', icon: <FaTachometerAlt />, href: '/portal' },
                        { name: 'Payment Info', icon: <FaDollarSign />, href: '/payment-info' },
                        { name: 'Registration', icon: <FaFileInvoiceDollar />, href: '/registration' },
                        { name: 'Courses', icon: <FaBook />, href: '/courses' },
                        { name: 'Event Page', icon: <FaCalendarDay />, href: '/portal/events' },  // Event Page
                        { name: 'Image Page', icon: <FaImage />, href: '/portal/images' },        // Image Page
                    ].map((item) => (
                        <Link key={item.name} href={item.href}>
                            <div className="flex items-center space-x-3 py-2 hover:bg-teal-700 transition-all rounded-lg px-3">
                                {item.icon}
                                <span className="text-lg font-medium">{item.name}</span>
                            </div>
                        </Link>
                    ))}
                </nav>

                {/* Sidebar Bottom Section */}
                <div className="mt-auto">
                    <nav className="flex flex-col space-y-4">
                        {[
                            { name: 'Drop Semester', icon: <FaCalendarAlt />, href: '/drop-semester' },
                            { name: 'Result', icon: <FaRegFileAlt />, href: '/result' },
                            { name: 'Notice', icon: <FaBell />, href: '/notice' },
                            { name: 'Schedule', icon: <FaCalendarAlt />, href: '/schedule' }
                        ].map((item) => (
                            <Link key={item.name} href={item.href}>
                                <div className="flex items-center space-x-3 py-2 hover:bg-teal-700 transition-all rounded-lg px-3">
                                    {item.icon}
                                    <span className="text-lg font-medium">{item.name}</span>
                                </div>
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-6 flex items-center space-x-3 py-2 hover:bg-teal-700 transition-all rounded-lg px-3">
                        <FaPowerOff />
                        <span className="text-lg font-medium">Logout</span>
                    </div>
                </div>

                {/* Close Sidebar Button (Visible on Mobile) */}
                <button
                    onClick={toggleSidebar}
                    className="absolute top-4 right-4 text-white focus:outline-none md:hidden"
                >
                    &times;
                </button>
            </aside>

            {/* Overlay when Sidebar is open */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
