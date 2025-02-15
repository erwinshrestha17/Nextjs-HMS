"use client"
import { ChangeEvent, useState, useEffect } from "react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Bed, Users } from "lucide-react"; // Importing icons from Lucide

// Type for the `onBook` prop
interface CheckInCheckOutProps {
    onBook?: (bookingDetails: any) => void;
}

export default ({ onBook }: CheckInCheckOutProps) => {
    const [dates, setDates] = useState({ checkIn: "", checkOut: "" });
    const [numRooms, setNumRooms] = useState("1");
    const [adults, setAdults] = useState("1");
    const [children, setChildren] = useState("0");

    // Set today's date and tomorrow's date for check-in and check-out
    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const todayString = today.toISOString().split('T')[0];
        const tomorrowString = tomorrow.toISOString().split('T')[0];

        setDates({
            checkIn: todayString,
            checkOut: tomorrowString,
        });
    }, []);

    const handleBooking = () => {
        const bookingDetails = {
            checkIn: dates.checkIn,
            checkOut: dates.checkOut,
            numRooms,
            adults,
            children,
        };
        if (onBook) {
            onBook(bookingDetails);
        } else {
            alert(`Booking Details:\nCheck-In: ${dates.checkIn}\nCheck-Out: ${dates.checkOut}\nNumber of Rooms: ${numRooms}\nAdults: ${adults}\nChildren: ${children}`);
        }
    };

    return (
        <div className="p-8 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl rounded-2xl max-w-5xl mx-auto text-white">
            <div className="flex flex-wrap md:flex-nowrap gap-6 items-end">
                <div className="flex-1">
                    <div className="relative flex items-center gap-4">
                        <div className="flex-1">
                            <Input
                                type="date"
                                className="bg-white text-black p-2 rounded-md w-full pl-8"
                                value={dates.checkIn}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setDates({ ...dates, checkIn: e.target.value })}
                                required
                                min={dates.checkIn} // Prevent selecting past dates
                            />
                        </div>
                        <div className="flex-1">
                            <Input
                                type="date"
                                className="bg-white text-black p-2 rounded-md w-full pl-8"
                                value={dates.checkOut}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setDates({ ...dates, checkOut: e.target.value })}
                                required
                                min={dates.checkIn} // Prevent selecting a check-out date before check-in
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="relative">
                        <select
                            className="bg-white text-black w-full p-2 rounded-md pl-10"
                            value={numRooms}
                            onChange={(e) => setNumRooms(e.target.value)}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <Bed className="absolute left-3 top-2 text-gray-500" />
                    </div>
                </div>

                <div className="flex-1">
                    <div className="relative">
                        <select
                            className="bg-white text-black w-full p-2 rounded-md pl-10"
                            value={adults}
                            onChange={(e) => setAdults(e.target.value)}
                        >
                            {[...Array(6)].map((_, i) => (
                                <option key={i} value={String(i + 1)}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        <Users className="absolute left-3 top-2 text-gray-500" />
                    </div>
                </div>

                <div className="flex-1">
                    <div className="relative">
                        <select
                            className="bg-white text-black w-full p-2 rounded-md pl-10"
                            value={children}
                            onChange={(e) => setChildren(e.target.value)}
                        >
                            {[...Array(6)].map((_, i) => (
                                <option key={i} value={String(i)}>
                                    {i}
                                </option>
                            ))}
                        </select>
                        <Users className="absolute left-3 top-2 text-gray-500" />
                    </div>
                </div>

                <div className="flex-none">
                    <Button
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold h-12 mt-6 px-6 rounded-lg shadow-md"
                        onClick={handleBooking}
                    >
                        Book Now
                    </Button>
                </div>
            </div>
        </div>

    );
};
