import { ReactNode } from "react";
import Header from "@/app/components/user/Header";
import Footer from "@/app/components/user/Footer";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow mx-4 my-6 mb-2">{children}</main> {/* Added margin */}
                <Footer />
            </div>


    );
}
