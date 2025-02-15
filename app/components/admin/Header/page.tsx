// components/admin/Header.tsx
"use client"
// components/admin/Header.tsx
import { FC, useState } from "react";
import Link from "next/link";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";  // Notification and User icons

const Header: FC = () => {
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [notifications] = useState([
        { id: 1, message: "New booking received." },
        { id: 2, message: "Room availability updated." },
        { id: 3, message: "Payment received." }
    ]);

    // Toggle notification dropdown
    const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);

    return (
        <header className="bg-white text-black py-4 px-6 shadow-md flex items-center justify-between">
            <div className="flex items-center gap-4">
                {/* Admin Logo (blue) */}
                <UserCircleIcon className="w-8 h-8 text-blue-500" />
                <h1 className="text-xl font-semibold">Hotel Admin</h1>
            </div>

            <div className="flex items-center gap-6">
                {/* Notification Bell */}
                <div className="relative">
                    <button onClick={toggleNotifications} className="text-black">
                        <BellIcon className="w-6 h-6" />
                    </button>
                    {notifications.length > 0 && (
                        <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                            {notifications.length}
                        </span>
                    )}

                    {/* Notification Dropdown */}
                    {notificationsOpen && notifications.length > 0 && (
                        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-2">
                            <ul>
                                {notifications.map((notification) => (
                                    <li key={notification.id} className="p-2 hover:bg-gray-100 rounded-md">
                                        {notification.message}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Admin Profile */}
                <div className="flex items-center gap-2">
                    <UserCircleIcon className="w-8 h-8 text-blue-500" />
                    <span className="hidden sm:block text-sm">Admin Name</span>
                    <button className="text-black hover:text-gray-400">
                        <Link href="/admin/dashboard/profile">Profile</Link>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
