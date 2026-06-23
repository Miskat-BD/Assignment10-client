'use client'
import React from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function PricingPlanSection() {
    const router = useRouter()
    const handleUpgrade = () => {
        router.push('/plans')        
    };

    return (
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-5 shadow-sm max-w-4xl transition-all duration-300 space-y-3">
            <div className="flex items-center gap-2 text-[#D97706] font-bold text-base md:text-lg">
                <span>⚡</span>
                <h3>Premium Required</h3>
            </div>

            <p className="text-[#B45309] text-sm md:text-base font-medium">
                You've used all 3 free opportunity slots. Upgrade to post unlimited opportunities.
            </p>

            <div className="pt-1">
                <Button
                    onClick={handleUpgrade}
                    className="bg-[#D97706] hover:bg-[#B45309] text-white font-bold px-5 py-2 h-auto rounded-xl shadow-md transition-all duration-200 text-sm"
                >
                    Upgrade — $29.99
                </Button>
            </div>
        </div>
    );
}