const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 text-center">
            <p>&copy; 2025 Hotel Paradise. All rights reserved.</p>
            <p>
                <a href="/privacy-policy" className="text-orange-600 hover:underline">Privacy Policy</a> |{" "}
                <a href="/terms-of-service" className="text-orange-600 hover:underline">Terms of Service</a>
            </p>
        </footer>
    );
};

export default Footer;
