'use client'
import Sidebar from "@/components/Portal/SideBar";
import { useState } from "react";
import { FaBars } from "react-icons/fa";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-teal-50 flex flex-col md:flex-row">
      {/* Sidebar Toggle Button (Visible on Mobile) */}
      <div className="md:hidden p-4">
        <button onClick={toggleSidebar} className="text-teal-600 focus:outline-none">
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar Component */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>

    </div>
  );
}
