"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    // Simulated Auth State (Will be integrated with Better Auth later)
    const [user, setUser] = useState(null);

    const menuItems = [
        { label: "Home", path: "/" },
        { label: "Browse Startups", path: "/startups" },
        { label: "Browse Opportunities", path: "/opportunities" },
    ];

    return (
        <div className="navbar bg-base-100 border-b border-base-200 sticky top-0 z-50 backdrop-blur-md bg-opacity-90 px-4 md:px-8">
            {/* Navbar Start: Mobile Hamburger & Logo */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" aria-label="Toggle Menu">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-1"
                    >
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.path}
                                    className={pathname === item.path ? "active text-white bg-indigo-600" : ""}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <Link href="/" className="font-bold text-2xl text-green-900 tracking-tight">
                    StartupForge
                </Link>
            </div>

            {/* Navbar Center: Desktop Navigation */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2 font-medium">
                    {menuItems.map((item, index) => {
                        const isActive = pathname === item.path;
                        return (
                            <li key={index}>
                                <Link
                                    href={item.path}
                                    className={`hover:text-green-800 transition-colors ${isActive ? "text-green-800 font-semibold bg-transparent" : "text-slate-600"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Navbar End: Authentication (Profile Dropdown / Login-Register Buttons) */}
            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
                            <div className="w-10 rounded-full ring ring-indigo-600 ring-offset-base-100 ring-offset-2">
                                <img alt={user.name} src={user.image} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-60 gap-2 border border-base-200"
                        >
                            <li className="px-2 py-1 border-b border-base-200">
                                <p className="font-semibold text-slate-500 text-xs uppercase tracking-wider">Signed in as</p>
                                <p className="font-bold text-green-800 truncate">{user.email}</p>
                            </li>
                            <li>
                                <Link href="/dashboard" className="justify-between">
                                    Dashboard
                                    <span className="badge badge-indigo text-white bg-green-900 text-[10px]">{user.role}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile">My Profile</Link>
                            </li>
                            <li className="mt-2">
                                <button className="btn btn-error btn-sm btn-outline w-full text-left">
                                    Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-green-800 hidden sm:inline-block">
                            Login
                        </Link>
                        <Link href="/register" className="btn bg-green-800 hover:bg-green-900 text-white border-none min-h-0 h-10 px-5">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}