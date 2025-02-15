import Link from "next/link";

const HeroSection = () => {
    return (
        <section className="relative w-full h-[80vh] bg-cover bg-center" style={{ backgroundImage: "url('https://example.com/hero-image.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
                <h1 className="text-4xl font-semibold mb-4">Welcome to Hotel Paradise</h1>
                <p className="text-lg mb-6">Your perfect getaway awaits.</p>
                <Link href="/book-now">
                    <a className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-500">Book Now</a>
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;
