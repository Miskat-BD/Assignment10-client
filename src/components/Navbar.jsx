"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();
    const {
        data: session,
        error
    } = authClient.useSession()
    const user = session?.user
    // console.log(user);
    const router = useRouter()
    // Safety guard rails for Next.js SSR Hydration
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const menuItems = [
        { label: "Home", path: "/" },
        { label: "Browse Startups", path: "/startups" },
        { label: "Browse Opportunities", path: "/opportunities" },
    ];

    const closeDropdown = () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };
    const handleSignOut = async ()=>{
        await authClient.signOut()
        router.push('/')
        router.refresh()
    }

    return (
        <div className="navbar bg-base-100 border-b border-base-200 sticky top-0 z-50 px-4 md:px-8">
            {/* Navbar Start: Mobile Hamburger & Logo */}
            <div className="navbar-start">
                <div className="dropdown dropdown-bottom lg:hidden">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                        aria-label="Toggle Menu"
                    >
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
                        className="dropdown-content menu menu-sm mt-3 z-50 p-2 shadow-lg bg-base-100 rounded-box w-52 gap-1 border border-base-200 absolute left-0"
                    >
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.path}
                                    className={`py-2 px-3 block rounded-md ${pathname === item.path
                                        ? "text-white !bg-emerald-600 font-medium"
                                        : "text-slate-700 hover:bg-slate-100"
                                        }`}
                                    onClick={closeDropdown}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <Link href="/" className="font-bold text-2xl text-emerald-600 tracking-tight ml-2 lg:ml-0" onClick={closeDropdown}>
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
                                    className={`hover:text-emerald-600 transition-colors ${isActive ? "text-emerald-600 font-semibold bg-transparent" : "text-slate-600"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Navbar End: Authentication (Protected against Hydration Mismatch) */}
            <div className="navbar-end">
                {!mounted ? (
                    // Skeleton/Spacer structure during Server-Side Pass to prevent mismatch errors
                    <div className="flex items-center gap-4 opacity-0">
                        <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                    </div>
                ) : user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
                            <div className="w-10 rounded-full ring ring-emerald-600 ring-offset-base-100 ring-offset-2">
                                <Image alt={user?.name} src={user?.image} height={100} width={100}/>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-50 p-3 shadow-lg bg-base-100 rounded-box w-60 gap-2 border border-base-200"
                        >
                            <li className="px-2 py-1 border-b border-base-200">
                                <p className="font-semibold text-slate-500 text-xs uppercase tracking-wider">Signed in as</p>
                                <p className="font-bold text-emerald-600 truncate">{user?.email}</p>
                            </li>
                            <li>
                                <Link href={`/dashboard/${user?.role}`} className="justify-between" onClick={closeDropdown}>
                                    Dashboard
                                    <span className="badge text-white bg-emerald-600 text-[10px]">{user?.role}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" onClick={closeDropdown}>My Profile</Link>
                            </li>
                            <li className="mt-2">
                                <button onClick={handleSignOut} className="btn btn-error btn-sm btn-outline w-full text-left">
                                    Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link href="/auth/login" className="text-sm font-medium text-slate-600 hover:text-emerald-600 hidden sm:inline-block">
                            Login
                        </Link>
                        <Link href="/auth/register" className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none min-h-0 h-10 px-5 normal-case">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}