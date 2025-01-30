"use client";

import React, { useState, useEffect } from "react";
import BookingActions from "@/app/components/admin/bookings/BookingActions";

interface Booking {
    id: number;
    customerName: string;
    email: string;
    phone: string;
    checkInDate: string;
    checkOutDate: string;
    roomType: string;
    status: string;
    paymentStatus: string;
    specialRequests: string;
}

// Dummy data for testing
const dummyBookings: Booking[] = [
    { id: 1, customerName: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", checkInDate: "2025-02-10", checkOutDate: "2025-02-12", roomType: "Double", status: "Confirmed", paymentStatus: "Paid", specialRequests: "Vegetarian meal" },
    { id: 2, customerName: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210", checkInDate: "2025-02-15", checkOutDate: "2025-02-18", roomType: "Suite", status: "Pending", paymentStatus: "Unpaid", specialRequests: "Late check-in" },
    { id: 3, customerName: "Alice Brown", email: "alice.brown@example.com", phone: "456-789-0123", checkInDate: "2025-03-01", checkOutDate: "2025-03-05", roomType: "Single", status: "Cancelled", paymentStatus: "Refunded", specialRequests: "Window view" },
];

const fetchBookings = async (): Promise<Booking[]> => {
    try {
        const res = await fetch("/api/bookings", { cache: "no-store" });

        if (!res.ok) {
            const errorMessage = `Failed to fetch bookings: ${res.status} ${res.statusText}`;
            throw new Error(errorMessage);
        }

        return res.json(); // Assuming this returns an array of Booking objects
    } catch (error: any) {
        console.error("Error fetching bookings:", error.message || error);

        // Return an empty array or fallback data depending on your use case
        return []; // or return dummyBookings if you have predefined data
    }
};


export default function Page() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [paymentFilter, setPaymentFilter] = useState("");
    const [roomTypeFilter, setRoomTypeFilter] = useState("");

    useEffect(() => {
        fetchBookings().then(setBookings);
    }, []);

    useEffect(() => {
        let filtered = bookings;

        if (searchQuery) {
            filtered = filtered.filter((booking) =>
                booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                booking.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter) {
            filtered = filtered.filter((booking) => booking.status === statusFilter);
        }

        if (paymentFilter) {
            filtered = filtered.filter((booking) => booking.paymentStatus === paymentFilter);
        }

        if (roomTypeFilter) {
            filtered = filtered.filter((booking) => booking.roomType === roomTypeFilter);
        }

        setFilteredBookings(filtered);
    }, [searchQuery, statusFilter, paymentFilter, roomTypeFilter, bookings]);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-gray-700 mb-6">Admin Booking Panel</h1>

            {/* Filters */}
            {/* Filters */}
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by customer or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded-md w-60"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="">All Status</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                <select
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="">All Payments</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Refunded">Refunded</option>
                </select>
                <select
                    value={roomTypeFilter}
                    onChange={(e) => setRoomTypeFilter(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="">All Room Types</option>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Suite">Suite</option>
                </select>
                <button
                    onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("");
                        setPaymentFilter("");
                        setRoomTypeFilter("");
                    }}
                    className="p-2 bg-red-500 text-white rounded-md"
                >
                    Clear Filters
                </button>
            </div>

            {/* Booking Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto md:table-fixed">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Booking ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Customer Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Check-in</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Check-out</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Room Type</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Payment</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Special Requests</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking) => (
                            <tr key={booking.id} className="border-b hover:bg-gray-100">
                                <td className="px-6 py-3">{booking.id}</td>
                                <td className="px-6 py-3">{booking.customerName}</td>
                                <td className="px-6 py-3">{booking.email}</td>
                                <td className="px-6 py-3">{booking.checkInDate}</td>
                                <td className="px-6 py-3">{booking.checkOutDate}</td>
                                <td className="px-6 py-3">{booking.roomType}</td>
                                <td className="px-6 py-3">{booking.status}</td>
                                <td className="px-6 py-3">{booking.paymentStatus}</td>
                                <td className="px-6 py-3">{booking.specialRequests}</td>
                                <td className="px-6 py-3">
                                    <BookingActions bookingId={booking.id} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={10} className="text-center py-4 text-gray-600">
                                No bookings found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
