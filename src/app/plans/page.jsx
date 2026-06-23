'use client'
import React from 'react';
import { Button } from "@heroui/react";

const PlansPage = () => {

    return (
        <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-12 bg-slate-50/50">
            <div className="text-center max-w-xl mx-auto space-y-3 mb-12 animate-fade-in">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-200">
                    Pricing Plans
                </span>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                    Choose the Right Plan for Your Startup
                </h1>
                <p className="text-slate-500 text-sm sm:text-base">
                    Find top-tier collaborators, build your dream team, and scale your product without limitations.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

                <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-slate-800">Basic Free</h3>
                            <p className="text-slate-400 text-xs">Perfect for getting started and testing out features.</p>
                            <div className="flex items-baseline gap-1 pt-2">
                                <span className="text-4xl font-extrabold text-slate-900">$0</span>
                                <span className="text-slate-400 text-sm">/forever</span>
                            </div>
                        </div>

                        <ul className="space-y-3 text-sm text-slate-600 border-t border-slate-100 pt-6">
                            <li className="flex items-center gap-3">
                                <span className="text-emerald-500 font-bold">✓</span> Create 1 Startup Profile
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-emerald-500 font-bold">✓</span> <strong>3 Free Opportunity Posts</strong>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-emerald-500 font-bold">✓</span> Basic Talent Directory Access
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 line-through">
                                ✕ Profile Verification Badge
                            </li>
                        </ul>
                    </div>

                    <div className="pt-8">
                        <Button
                            disabled
                            className="w-full bg-slate-100 text-slate-400 font-semibold h-11 rounded-xl cursor-not-allowed"
                        >
                            Current Plan
                        </Button>
                    </div>
                </div>

                <div className="bg-linear-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between shadow-xl text-white relative transform md:-translate-y-2">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                        Most Popular
                    </span>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-amber-400">Premium Growth</h3>
                            <p className="text-slate-400 text-xs">Unlock full recruiting power with no limitations.</p>
                            <div className="flex items-baseline gap-1 pt-2">
                                <span className="text-4xl font-extrabold text-white">$49.99</span>
                                <span className="text-slate-400 text-sm">/monthly</span>
                            </div>
                        </div>

                        <ul className="space-y-3 text-sm text-slate-300 border-t border-slate-800 pt-6">
                            <li className="flex items-center gap-3">
                                <span className="text-amber-400 font-bold">✓</span> Create 1 Startup Profile
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <span className="text-amber-400 font-bold">✓</span> <strong>Unlimited Opportunity Posts</strong>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-amber-400 font-bold">✓</span> Featured Profile in Search List
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-amber-400 font-bold">✓</span> Verified Premium Badge
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-amber-400 font-bold">✓</span> 24/7 Priority Support
                            </li>
                        </ul>
                    </div>

                    <div className="pt-8">
                        <form action={'/api/checkout_sessions'} method='POST'>
                            <Button
                                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold h-11 rounded-xl shadow-lg shadow-amber-500/10 transition-all duration-200" type='submit'
                            >
                                Upgrade via Stripe ⚡
                            </Button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PlansPage;