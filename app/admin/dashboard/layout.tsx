"use client";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Sidebar } from "@/app/components/admin/Sidebar/sidebar";
import Header from "@/app/components/admin/Header/page";
import AuthGuard from "../../context/AuthGuard";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation"; // Corrected import

export default function Dashboard({ children }: { children: ReactNode }) {
    const context = useContext(AuthContext);
    const [error, setError] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const router = useRouter();

    if (!context) {
        return <p>Loading...</p>;
    }

    const { user } = context;

    useEffect(() => {
        // Ensure user exists, if not redirect
        if (!user) {
            router.push("/admin/login"); // Redirect to login if no user found in context
        }
    }, [user, router]);

    return (
        <AuthGuard>
            <div className="flex h-screen bg-gray-100">
                <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <section className="flex-1 flex flex-col">
                    <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? "ml-[16rem]" : "ml-[4rem]"} min-h-screen`}>
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <Header />
                        {children}
                    </main>
                </section>
            </div>
        </AuthGuard>
    );
}
