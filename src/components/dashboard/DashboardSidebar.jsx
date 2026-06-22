"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "../SignOutButton";
import Image from "next/image";

const SidebarContent = ({ user, role, currentMenu, pathname, setIsOpen }) => (
    <div className="flex flex-col justify-between h-full p-6 bg-white">
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    {user?.image && (
                        <Image
                            width={300}
                            height={300}
                            src={user.image}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover border border-emerald-100"
                        />
                    )}
                    <h2 className="text-sm font-bold text-slate-800 line-clamp-1">{user?.name}</h2>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {role}
                </span>
            </div>

            <nav className="space-y-1">
                {currentMenu.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)} // মোবাইল মেনু বন্ধ করার জন্য
                            className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                    ? "bg-emerald-50 text-emerald-700 font-semibold"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </div>

        {/* Logout Button */}
        <div className="border-t border-slate-100 pt-4">
            <SignOutButton />
        </div>
    </div>
);

export default function DashboardSidebar({ user, role, currentMenu }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <div className="lg:hidden flex items-center justify-between bg-white px-4 py-3 border-b border-slate-100 w-full sticky top-0 z-30">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 hover:bg-slate-50 rounded-lg text-slate-700"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{role} board</span>
            </div>

            {/* 📱 Mobile Drawer Backdrop & Menu */}
            {isOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    <div
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="relative w-72 max-w-sm bg-white h-full shadow-2xl flex flex-col animate-slide-in">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="h-full pt-10">
                            <SidebarContent
                                user={user}
                                role={role}
                                currentMenu={currentMenu}
                                pathname={pathname}
                                setIsOpen={setIsOpen}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* 💻 Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 border-r border-slate-100 shrink-0 bg-white">
                <div className="w-full h-full sticky top-24">
                    <SidebarContent
                        user={user}
                        role={role}
                        currentMenu={currentMenu}
                        pathname={pathname}
                        setIsOpen={setIsOpen}
                    />
                </div>
            </aside>
        </>
    );
}