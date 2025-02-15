"use client"
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "react-feather";
import Page from "@/app/user/about/page"; // Using Feather Icons for simplicity

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-gray-800">
                        <Link href="/">HotelName</Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/" className="text-gray-600 hover:text-blue-600">
                            Home
                        </Link>
                        <Link href="/user/about" className="text-gray-600 hover:text-blue-600">
                            About Us
                        </Link>
                        <Link href="/user/rooms" className="text-gray-600 hover:text-blue-600">
                            Rooms
                        </Link>
                        <Link href="/user/contact" className="text-gray-600 hover:text-blue-600">
                            Contact
                        </Link>
                        <Link href="/signup" className="text-gray-600 hover:text-blue-600">
                            Book Now
                        </Link>
                    </nav>

                    {/* Mobile Hamburger Menu */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-gray-600">
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <nav className="space-y-4 px-4 py-6">
                        <Link href="/" className="block text-gray-600 hover:text-blue-600">
                            Home
                        </Link>
                        <Link href="/about" className="block text-gray-600 hover:text-blue-600">
                            About Us
                        </Link>
                        <Link href="/rooms" className="block text-gray-600 hover:text-blue-600">
                            Rooms
                        </Link>
                        <Link href="/contact" className="block text-gray-600 hover:text-blue-600">
                            Contact
                        </Link>
                        <Link href="/book" className="block text-gray-600 hover:text-blue-600">
                            Book Now
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
