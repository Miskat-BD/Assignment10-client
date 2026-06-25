"use client";

import React from "react";
import { Card } from "@heroui/react";

export default function StatsSection() {
    const stats = [
        { value: "500+", label: "Verified Startups", sub: "Actively hiring & growing" },
        { value: "12K+", label: "Talents Connected", sub: "Engineers, founders & growth hackers" },
        { value: "$45M+", label: "Funding Tracked", sub: "Raised by ecosystem startups" },
        { value: "94%", label: "Success Rate", sub: "Matchmaking satisfaction" }
    ];

    return (
        <section className="py-16 bg-white relative">
            <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="bg-slate-900 text-white rounded-[2rem] p-8 sm:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 relative z-10 text-center">
                        {stats.map((stat, index) => (
                            <div 
                                key={index} 
                                className={`flex flex-col gap-2 ${
                                    index !== stats.length - 1 ? "lg:border-r lg:border-slate-800" : ""
                                } pr-4`}
                            >
                                <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400 tracking-tight">
                                    {stat.value}
                                </span>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm sm:text-base font-bold text-slate-200 tracking-wide">
                                        {stat.label}
                                    </span>
                                    <span className="text-xs text-slate-400 font-normal hidden sm:inline">
                                        {stat.sub}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </section>
    );
}