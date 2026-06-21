"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";

const Navbar = () => {
    const [mounted, setMounted] = useState(false);

    // Hydration Error চিরতরে দূর করার জন্য মাউন্টেন চেক
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // সার্ভার রেন্ডারিং এর সময় একটি সেফ স্ট্রাকচার রিটার্ন করবে যেন ক্র্যাশ না করে
        return (
            <div className="navbar bg-base-100 border-b border-base-200 sticky top-0 z-50 px-4 md:px-8 h-16">
                <div className="navbar-start">
                    <Link href="/" className="font-bold text-xl text-emerald-600">
                        StartupForge
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="navbar bg-base-100 border-b border-base-200 sticky top-0 z-50 backdrop-blur-md bg-opacity-80 px-4 md:px-8">
            <div className="navbar-start">
                {/* Logo / Brand Name */}
                <Link href="/" className="font-bold text-xl text-emerald-600 tracking-tight">
                    StartupForge
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2 text-sm font-medium text-slate-600">
                    <li><Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link></li>
                    <li><Link href="/startups" className="hover:text-emerald-600 transition-colors">Browse Startups</Link></li>
                    <li><Link href="/opportunities" className="hover:text-emerald-600 transition-colors">Browse Opportunities</Link></li>
                </ul>
            </div>

            <div className="navbar-end">
                <div className="flex items-center gap-4">
                    {/* Login Link */}
                    <Link 
                        href="/login" 
                        className="text-sm font-medium text-slate-600 hover:text-emerald-600 hidden sm:inline-block transition-colors"
                    >
                        Login
                    </Link>

                    {/* Register Button */}
                    <Link 
                        href="/auth/register" 
                        className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl text-sm font-medium px-4 h-10 min-h-0 flex items-center justify-center shadow-sm shadow-emerald-100/50 transition-colors"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;