"use client";

import React, { useState } from 'react';
import { Edit as EditIcon, Eye as EyeIcon, Trash as TrashIcon } from "lucide-react";
import { useRouter } from 'next/navigation';

interface BookingActionsProps {
    bookingId: number;
}

const BookingActions: React.FC<BookingActionsProps> = ({ bookingId }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Handle Edit action: Navigate to the booking edit page
    const handleEdit = () => {
        router.push(`/admin/bookings/edit/${bookingId}`);
    };

    // Handle Delete action: Perform API call to delete the booking
    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete booking ${bookingId}?`)) {
            setLoading(true);
            try {
                // Make your API call to delete the booking
                const response = await fetch(`/api/bookings/${bookingId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert(`Booking ${bookingId} deleted successfully.`);
                    // Optionally, trigger a refresh or navigate away
                    // router.refresh();  // This might be useful to refresh the list after deletion
                } else {
                    alert(`Failed to delete booking ${bookingId}.`);
                }
            } catch (error) {
                alert('An error occurred while deleting the booking.');
            } finally {
                setLoading(false);
            }
        }
    };

    // Handle View action: Navigate to the booking details page
    const handleView = () => {
        router.push(`/admin/customers/views/${bookingId}`);
    };

    return (
        <td className="px-6 py-3">
            {/* Using flexbox to align buttons in the same row */}
            <div className="flex space-x-2">
                <button
                    onClick={handleEdit}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                    aria-label={`Edit booking ${bookingId}`}
                >
                    <EditIcon className="w-5 h-5 inline" />
                </button>
                <button
                    onClick={handleDelete}
                    className={`px-3 py-1 ${loading ? 'bg-gray-500' : 'bg-red-500'} text-white rounded-md hover:bg-red-600 transition-colors`}
                    aria-label={`Delete booking ${bookingId}`}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? "Deleting..." : <TrashIcon className="w-5 h-5 inline" />}
                </button>
                <button
                    onClick={handleView}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    aria-label={`View booking ${bookingId}`}
                >
                    <EyeIcon className="w-5 h-5 inline" />
                </button>
            </div>
        </td>
    );
};

export default BookingActions;
