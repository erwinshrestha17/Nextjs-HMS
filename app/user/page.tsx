"use client"
import CheckInCheckOut from "@/app/components/user/checkin-checkout/page";

export default function Page(){
    const handleBooking = (bookingDetails: any) => {
        console.log('Booking Details:', bookingDetails);
        // You can perform any logic here, such as sending data to an API.
    };
    return (
        <>

            <CheckInCheckOut onBook={handleBooking}/>
        </>
    )
}