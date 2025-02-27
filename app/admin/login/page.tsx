"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeOffIcon } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext"; // Use AuthContext

export default function LoginPage() {
    const { login } = useContext(AuthContext)!; // ✅ Use context for state management
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("staff"); // ✅ Default role as "staff" (change as needed)
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Reset error state before request

        try {
            const response = await axios.post("http://localhost:8000/api/admin/login", { email, password, role });

            console.log("Login successful:", response.data);

            // ✅ Store user in AuthContext instead of localStorage manually
            login(response.data.user);

            // ✅ Redirect based on role
            if (role === "admin") {
                router.push("/admin/dashboard");
            } else if (role === "staff") {
                router.push("/admin/dashboard");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid email or password"); // ✅ Handle API error messages dynamically
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-600">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Error Message */}
                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
                        </div>
                        <Link href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-700">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Signup Link */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-blue-500 hover:text-blue-700">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
