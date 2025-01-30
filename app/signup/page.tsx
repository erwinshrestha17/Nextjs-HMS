 'use client' // pages/signing.js

import React from "react";

export default function SignInPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [agreeTerms, setAgreeTerms] = React.useState(false);

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Sign Up</h2>

                <form >
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="agreeTerms"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                checked={agreeTerms}
                                onChange={() => setAgreeTerms(!agreeTerms)}
                            />
                            <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-600">I agree to the Terms and Conditions</label>
                        </div>
                    </div>

                    <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300">Sign Up</button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Login</a></p>
                </div>
            </div>
        </div>
    );
}
