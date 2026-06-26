import React from 'react';
import { requiredRole } from "@/app/lib/core/session";
import Link from 'next/link';
import { getAllUsers } from '@/app/lib/api/users';
import { getAllStartups } from '@/app/lib/api/startup';
import { allOpportunity } from '@/app/lib/api/opportunities';


const AdminDashboardPage = async () => {
    // ১. অ্যাডমিন রোল ভ্যালিডেশন
    await requiredRole("admin");

    // ২. ব্যাকেন্ড থেকে প্যারালালি সব ডেটা ফেচ করা
    let users = [];
    let startups = [];
    let opportunities = [];

    try {
        const [usersData, startupsData, oppData] = await Promise.all([
            getAllUsers(),
            getAllStartups(),
            allOpportunity()
        ]);

        users = usersData || [];
        startups = startupsData || [];
        opportunities = oppData || [];
    } catch (error) {
        console.error("Error loading admin overview stats:", error);
    }

    // ৩. ডাইনামিক ডেটা ফিল্টারিং (যেমন: প্রিমিয়াম ইউজার কতজন)
    const premiumUsersCount = users.filter(user => user.plan === 'premium').length;

    // ৪. স্ট্যাটস কার্ড অবজেক্ট অ্যারে
    const stats = [
        {
            name: "Total Users",
            value: users.length,
            change: `${premiumUsersCount} Premium Subscriptions`,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            name: "Total Startups",
            value: startups.length,
            change: "Growing Ecosystem",
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            name: "Total Opportunities",
            value: opportunities.length,
            change: "Live Positions",
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        }
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">
                        Admin Overview
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Platform health monitoring and system control panel.
                    </p>
                </div>
            </div>

            {/* 📊 Platform Performance Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <div 
                        key={stat.name} 
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md"
                    >
                        <div>
                            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{stat.name}</p>
                            <h3 className="text-3xl font-bold text-slate-800 mt-2 tracking-tight">{stat.value}</h3>
                            <span className="text-xs text-slate-500 block mt-1">{stat.change}</span>
                        </div>
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                            <svg className={`w-6 h-6 ${stat.color}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AdminDashboardPage;