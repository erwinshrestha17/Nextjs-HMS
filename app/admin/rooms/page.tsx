"use client";

import React, { useState, useEffect } from "react";
import { EditIcon, TrashIcon } from "lucide-react";
import { CheckCircleIcon, XCircleIcon, WrenchIcon } from "lucide-react";
import debounce from "lodash.debounce";
import Pagination from "@/app/components/Pagination/Pagination"; // Add lodash.debounce for debouncing search

const initialRooms = [
    { "id": 1, "number": "101", "type": "Single", "status": "Available", "floor": 1 },
    { "id": 2, "number": "102", "type": "Double", "status": "Occupied", "floor": 1 },
    { "id": 3, "number": "103", "type": "Suite", "status": "Under Maintenance", "floor": 1 },

    { "id": 4, "number": "201", "type": "Single", "status": "Available", "floor": 2 },
    { "id": 5, "number": "202", "type": "Double", "status": "Occupied", "floor": 2 },
    { "id": 6, "number": "203", "type": "Suite", "status": "Available", "floor": 2 },

    { "id": 7, "number": "301", "type": "Single", "status": "Available", "floor": 3 },
    { "id": 8, "number": "302", "type": "Double", "status": "Occupied", "floor": 3 },
    { "id": 9, "number": "303", "type": "Suite", "status": "Available", "floor": 3 },

    { "id": 10, "number": "401", "type": "Single", "status": "Available", "floor": 4 },
    { "id": 11, "number": "402", "type": "Double", "status": "Occupied", "floor": 4 },
    { "id": 12, "number": "403", "type": "Deluxe", "status": "Under Maintenance", "floor": 4 },

    { "id": 13, "number": "501", "type": "Single", "status": "Available", "floor": 5 },
    { "id": 14, "number": "502", "type": "Double", "status": "Occupied", "floor": 5 },
    { "id": 15, "number": "503", "type": "Deluxe", "status": "Available", "floor": 5 },

    { "id": 16, "number": "601", "type": "Suite", "status": "Occupied", "floor": 6 },
    { "id": 17, "number": "602", "type": "Deluxe", "status": "Available", "floor": 6 },
    { "id": 18, "number": "603", "type": "Suite", "status": "Available", "floor": 6 },

    { "id": 19, "number": "701", "type": "Penthouse", "status": "Available", "floor": 7 },
    { "id": 20, "number": "702", "type": "Super Deluxe", "status": "Occupied", "floor": 7 }
];

const usePagination = (items: any[], itemsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return { currentItems, nextPage, prevPage, currentPage, totalPages };
};

const Rooms = () => {
    const [rooms, setRooms] = useState(initialRooms);
    const [search, setSearch] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<any>(null);
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
    const [roomStatus, setRoomStatus] = useState('');
    const [roomType, setRoomType] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const roomsPerPage = 3;

    // Debounced search handler
    const handleSearch = debounce((value: string) => {
        setDebouncedSearch(value);
    }, 500);

    useEffect(() => {
        setSearch(debouncedSearch);
    }, [debouncedSearch]);

    const filteredRooms = rooms.filter(room => {
        const searchTerm = search.toLowerCase();
        return (
            (room.number.toLowerCase().includes(searchTerm) ||
                room.type.toLowerCase().includes(searchTerm)) &&
            (!roomStatus || room.status === roomStatus) &&
            (!roomType || room.type === roomType)
        );
    });

    const { currentItems, nextPage, prevPage, currentPage, totalPages } = usePagination(
        filteredRooms,
        roomsPerPage
    );

    const handleEdit = (room: any) => {
        setSelectedRoom(room);
        setEditMode(true);
    };

    const handleDelete = (id: number) => {
        setConfirmDelete(id);
    };

    const confirmRoomDelete = () => {
        setRooms(rooms.filter((room) => room.id !== confirmDelete));
        setConfirmDelete(null);
    };

    const cancelDelete = () => setConfirmDelete(null);

    const handleAddOrUpdateRoom = (room: any) => {
        if (editMode) {
            setRooms(
                rooms.map((r) => (r.id === room.id ? { ...r, ...room } : r))
            );
        } else {
            setRooms([...rooms, { ...room, id: rooms.length + 1 }]);
        }
        setEditMode(false);
        setSelectedRoom(null);
    };

    const handleStatusChange = (id: number, newStatus: string) => {
        setRooms(
            rooms.map((room) =>
                room.id === id ? { ...room, status: newStatus } : room
            )
        );
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Rooms</h2>

            {/* Search and Filters */}
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)} // Use debounced search
                    placeholder="Search by Room Number"
                    className="px-4 py-2 border rounded-md"
                />

                <select
                    value={roomStatus}
                    onChange={(e) => setRoomStatus(e.target.value)}
                    className="px-4 py-2 border rounded-md"
                >
                    <option value="">All Status</option>
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                </select>

                <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="px-4 py-2 border rounded-md"
                >
                    <option value="">All Types</option>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Suite">Suite</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Penthouse">Penthouse</option>
                </select>

                <button
                    onClick={() => {
                        setSearch("");
                        setRoomStatus("");
                        setRoomType("");
                    }}
                    className="p-2 bg-red-500 text-white rounded-md"
                >
                    Clear Filters
                </button>

                <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Add New Room
                </button>
            </div>

            {/* Room Table */}
            {/* Room Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Room Number</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Room Type</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Floor</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map(room => (
                        <tr key={room.id} className="border-b hover:bg-gray-100">
                            <td className="px-6 py-3">{room.number}</td>
                            <td className="px-6 py-3">{room.type}</td>
                            <td className="px-6 py-3">{room.floor}</td>

                            <td className="px-6 py-3">
                                {/* Status Section with Icons and Dropdown */}
                                <div className="flex items-center space-x-2">
                                    {/* Status Icon */}
                                    <div className="flex items-center">
                                        {room.status === "Available" && (
                                            <CheckCircleIcon className="text-green-500 w-5 h-5" />
                                        )}
                                        {room.status === "Occupied" && (
                                            <XCircleIcon className="text-orange-500 w-5 h-5" />
                                        )}
                                        {room.status === "Under Maintenance" && (
                                            <WrenchIcon className="text-yellow-500 w-5 h-5" />
                                        )}
                                    </div>

                                    {/* Status Dropdown */}
                                    <div className="relative">
                                        <select
                                            value={room.status}
                                            onChange={(e) => handleStatusChange(room.id, e.target.value)}
                                            className="block w-36 px-4 py-2 pr-10 text-sm font-medium border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            aria-label="Select room status"
                                        >
                                            <option value="Available" className="text-green-500">
                                                Available
                                            </option>
                                            <option value="Occupied" className="text-orange-500">
                                                Occupied
                                            </option>
                                            <option value="Under Maintenance" className="text-yellow-500">
                                                Under Maintenance
                                            </option>
                                        </select>
                                        {/* Removed duplicate dropdown arrow */}
                                    </div>
                                </div>
                            </td>

                            <td className="px-6 py-3 space-x-2">
                                {/* Edit and Delete Buttons */}
                                <button
                                    onClick={() => handleEdit(room)}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                                    aria-label={`Edit room ${room.number}`}
                                >
                                    <EditIcon className="w-4 h-4 inline" />
                                </button>
                                <button
                                    onClick={() => handleDelete(room.id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                    aria-label={`Delete room ${room.number}`}
                                >
                                    <TrashIcon className="w-4 h-4 inline" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                nextPage={nextPage}
                prevPage={prevPage}
            />




            {/*/!* Pagination *!/*/}
            {/*<div className="flex justify-between items-center mt-6">*/}
            {/*    <button*/}
            {/*        onClick={prevPage}*/}
            {/*        disabled={currentPage === 1}*/}
            {/*        className="px-4 py-2 bg-blue-500 text-white rounded-md"*/}
            {/*    >*/}
            {/*        Prev*/}
            {/*    </button>*/}
            {/*    <div>*/}
            {/*        Page {currentPage} of {totalPages}*/}
            {/*    </div>*/}
            {/*    <button*/}
            {/*        onClick={nextPage}*/}
            {/*        disabled={currentPage === totalPages}*/}
            {/*        className="px-4 py-2 bg-blue-500 text-white rounded-md"*/}
            {/*    >*/}
            {/*        Next*/}
            {/*    </button>*/}
            {/*</div>*/}

            {/* Edit Modal */}
            {editMode && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Edit Room</h3>
                        <input
                            type="text"
                            value={selectedRoom?.number}
                            onChange={(e) =>
                                setSelectedRoom({ ...selectedRoom, number: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-md mb-4"
                            placeholder="Room Number"
                        />
                        <input
                            type="text"
                            value={selectedRoom?.type}
                            onChange={(e) =>
                                setSelectedRoom({ ...selectedRoom, type: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-md mb-4"
                            placeholder="Room Type"
                        />
                        <input
                            type="text"
                            value={selectedRoom?.floor}
                            onChange={(e) =>
                                setSelectedRoom({ ...selectedRoom, floor: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-md mb-4"
                            placeholder="Floor"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={() => handleAddOrUpdateRoom(selectedRoom)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditMode(false)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this room?</h3>
                        <div className="flex justify-between">
                            <button
                                onClick={confirmRoomDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-300 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Rooms;
