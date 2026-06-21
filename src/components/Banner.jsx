"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Banner = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20 md:py-32 rounded-3xl my-6 border border-emerald-100/50">
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative max-w-4xl mx-auto text-center px-6 flex flex-col items-center justify-center">

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight"
                >
                    Where Brilliant Ideas Meet <br />
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        The Perfect Team
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed"
                >
                    StartupForge connects visionary startup founders with talented collaborators.
                    Publish your ideas, showcase your skills, build elite teams, and build the future together.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                >
                    <Link
                        href="/startups"
                        className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-100 transition-all duration-200 text-center hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Explore Startups
                    </Link>

                    <Link
                        href="/opportunities"
                        className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl border border-slate-200 shadow-sm transition-all duration-200 text-center hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Find Opportunities
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 font-medium border-t border-slate-100 pt-8 w-full max-w-lg"
                >
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Founders Matching
                    </div>
                    <div className="hidden sm:block text-slate-200">|</div>
                    <div>Talent Acquisition</div>
                    <div className="hidden sm:block text-slate-200">|</div>
                    <div>Secure Ecosystem</div>
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;