"use client";

import React, { useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const context = useContext(AuthContext);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!context) {
            throw new Error("AuthContext is not available. Ensure AuthProvider is wrapping your component.");
        }

        const { user } = context;

        if (!user) {
            router.replace("/admin/login");
        } else if (user.role !== "admin") {
            router.replace("/403");
        }

        setLoading(false);
    }, [context, router]);

    if (loading) {
        return <p>Loading...</p>; // Properly handles the loading state
    }

    return <>{children}</>;
};

export default AuthGuard;
