"use client";

import React from "react";
import Link from "next/link";

const UnauthorizedPage = () => {
    return (
        <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 bg-base-100">
            <div className="max-w-md w-full space-y-6">

                {/* 🔒 Visual Shield / Lock Icon Box */}
                <div className="relative flex justify-center items-center">
                    <div className="w-32 h-32 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center shadow-inner animate-pulse">
                        <svg
                            className="w-16 h-16 text-rose-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
                        </svg>
                    </div>
                    <div className="absolute top-2 right-12 font-bold text-rose-600 bg-rose-100 px-3 py-1 text-xs rounded-full shadow-sm border border-rose-200">
                        Access Denied
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-3">
                    <h1 className="text-3xl font-extrabold text-slate-800 md:text-4xl tracking-tight">
                        Unauthorized Access!
                    </h1>
                    <p className="text-slate-500 max-w-sm mx-auto text-sm md:text-base leading-relaxed">
                        You do not have permission to view this specific dashboard or resource. Please log in with an authorized account or return to the main platform.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    {/* Go Back Home */}
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-md shadow-emerald-100 transition-all text-center text-sm"
                    >
                        Go Back Home
                    </Link>

                    {/* Previous Page or Switch Account Link */}
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto px-6 py-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl transition-all text-center text-sm"
                    >
                        Go Back
                    </button>
                </div>

                {/* Optional Footer Text */}
                <p className="text-xs text-slate-400 mt-4">
                    Think this is a mistake? Contact StartupForge administration.
                </p>
            </div>
        </div>
    );
};

export default UnauthorizedPage;