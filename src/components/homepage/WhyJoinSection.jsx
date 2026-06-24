"use client";

import React from "react";
import { Card } from "@heroui/react";

export default function WhyJoinSection() {
    const reasons = [
        {
            title: "Direct Equity & Roles",
            description: "Skip the corporate red tape. Connect directly with visionary founders and secure roles with real impact and equity.",
            icon: "🚀",
            badge: "For Talents",
            colorClass: "from-pink-500/10 to-rose-500/5 text-rose-600 border-rose-100"
        },
        {
            title: "Vetted Startup Network",
            description: "Access high-potential, curated startups that have been thoroughly verified for funding, vision, and growth.",
            icon: "💎",
            badge: "Quality First",
            colorClass: "from-blue-500/10 to-indigo-500/5 text-blue-600 border-blue-100"
        },
        {
            title: "Seamless Ecosystem",
            description: "From hiring and networking to early-stage investment tracking, manage your entire startup journey in one place.",
            icon: "⚡",
            badge: "All-in-One",
            colorClass: "from-amber-500/10 to-orange-500/5 text-orange-600 border-amber-100"
        }
    ];

    return (
        <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">
                        ✨ Our Value Proposition
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-4">
                        Why Join StartupForge?
                    </h2>
                    <p className="text-base sm:text-lg text-slate-500 mt-4 leading-relaxed">
                        We bridge the gap between brilliant minds and next-generation companies. Here is how we redefine your journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {reasons.map((item, index) => (
                        <Card 
                            key={index} 
                            className="group relative border border-gray-300 bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] hover:border-slate-200/80 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col gap-5 overflow-hidden"
                        >
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none opacity-50 mix-blend-multiply" />

                            <Card.Header className="flex items-center justify-between w-full pb-0 z-10">
                                <div className={`text-2xl bg-gradient-to-br ${item.colorClass} border w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                    {item.icon}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
                                    {item.badge}
                                </span>
                            </Card.Header>
                            
                            <Card.Content className="flex flex-col gap-3 z-10 pt-2">
                                <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 text-sm sm:text-[14px] leading-relaxed font-normal">
                                    {item.description}
                                </p>
                            </Card.Content>
                        </Card>
                    ))}
                </div>

            </div>
        </section>
    );
}