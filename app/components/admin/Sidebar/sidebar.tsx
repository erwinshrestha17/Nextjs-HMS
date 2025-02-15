"use client"
import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HomeIcon, Cog6ToothIcon, UserIcon } from "@heroicons/react/24/outline";
import { BedDouble, CalendarCheck, Users, Menu, LogOut } from "lucide-react";
import axios from "axios";

const sidebarItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
    { name: "Rooms", href: "/admin/dashboard/rooms", icon: BedDouble },
    { name: "Bookings", href: "/admin/dashboard/bookings", icon: CalendarCheck },
    { name: "Customers", href: "/admin/dashboard/customers", icon: Users },
    { name: "User", href: "/admin/dashboard/user", icon: UserIcon },
    { name: "Settings", href: "/admin/dashboard/settings", icon: Cog6ToothIcon },
];

export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: { isSidebarOpen: boolean, setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const pathname = usePathname();
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
            router.push('/admin/login'); // Redirect to user or login page after successful logout
        } catch (err: any) {
            // Capture and display error message if logout fails
            const errorMessage = err.response?.data?.message || "Something went wrong during logout.";
            setError(errorMessage);
            console.error('Logout error:', errorMessage);
        }
    };

    return (
        <>
            {/* Sidebar */}
            <section>
                <aside className={`bg-gray-900 text-white fixed top-0 left-0 bottom-0 h-full flex flex-col transition-all duration-300 ${
                    isSidebarOpen ? "w-64" : "w-16"
                }`}>
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
            </section>
        </>
    );
};
