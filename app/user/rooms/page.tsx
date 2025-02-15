import Link from "next/link";

const RoomsSection = () => {
    return (
        <section className="py-16 px-4 bg-white">
            <h2 className="text-3xl font-semibold text-center mb-12">Our Rooms</h2>
            <div className="flex flex-wrap justify-center gap-8">
                {/* Example Room Card */}
                <div className="w-full sm:w-1/3 bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src="https://example.com/room1.jpg" alt="Luxury Suite" className="w-full h-64 object-cover" />
                    <div className="p-6">
                        <h3 className="text-xl font-semibold">Luxury Suite</h3>
                        <p className="text-lg text-gray-600 mb-4">Spacious room with stunning views of the city skyline.</p>
                        <p className="text-lg font-semibold text-orange-600">$300 per night</p>
                        <Link href="/rooms/luxury">
                            <a className="text-orange-600 hover:underline mt-4 inline-block">View Details</a>
                        </Link>
                    </div>
                </div>

                {/* You can add more room cards here */}
            </div>
        </section>
    );
};

export default RoomsSection;
