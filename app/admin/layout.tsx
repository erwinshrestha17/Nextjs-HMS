"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HomeIcon, Cog6ToothIcon, UserIcon } from "@heroicons/react/24/outline";
import { BedDouble, CalendarCheck, Users, Menu, LogOut } from "lucide-react";
import axios from "axios";

const sidebarItems = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon },
    { name: "Rooms", href: "/admin/rooms", icon: BedDouble },
    { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "User", href: "/admin/user", icon: UserIcon },
    { name: "Settings", href: "/admin/settings", icon: Cog6ToothIcon },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Hydration check, set client-side flag if needed
    }, []);

    const handleLogout = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            // Send logout request to backend
            const response = await axios.get('http://localhost:8000/api/admin/logout');
            console.log('Logout successful:', response.data);
            router.push('/'); // Redirect to home or login page after successful logout
        } catch (err: any) {
            // Capture and display error message if logout fails
            const errorMessage = err.response?.data?.message || "Something went wrong during logout.";
            setError(errorMessage);
            console.error('Logout error:', errorMessage);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`bg-gray-900 text-white fixed top-0 left-0 bottom-0 h-full flex flex-col transition-all duration-300 ${
                    isSidebarOpen ? "w-64" : "w-16"
                }`}
            >
                <div className="p-5 flex items-center justify-between">
                    <span className={`text-xl font-bold transition-all ${isSidebarOpen ? "block" : "hidden"}`}>
                        Hotel Admin
                    </span>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 px-2 space-y-2">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                                pathname.startsWith(item.href) ? "bg-gray-700" : "hover:bg-gray-800"
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className={`${isSidebarOpen ? "block" : "hidden"}`}>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-gray-800 rounded-md mt-auto"
                >
                    <LogOut className="w-5 h-5" />
                    <span className={`${isSidebarOpen ? "block" : "hidden"}`}>Logout</span>
                </button>
            </aside>

            {/* Main Content - Stays Fixed, Adjusts Only on Collapse */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300`}
                style={{ marginLeft: isSidebarOpen ? "16rem" : "4rem" }} // 64px = 4rem, 256px = 16rem
            >
                {/* Top Bar */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <span className="text-lg font-semibold">Admin Dashboard</span>
                    <div className="text-sm text-gray-600">Welcome, Admin</div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">
                    {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
