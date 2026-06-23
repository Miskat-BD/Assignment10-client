import React from "react";

export default function PendingApprovalBanner({ myStartup }) {
    // console.log(myStartup);

    const isRejected = myStartup?.status === "rejected";

    const containerClass = isRejected
        ? "bg-rose-50 border-rose-200 text-rose-800"
        : "bg-[#FFFBEB] border-[#FDE68A] text-[#B45309]";

    return (
        <div className={`border rounded-2xl p-4 flex items-center gap-3 text-sm md:text-base font-medium shadow-sm max-w-4xl transition-all duration-300 ${containerClass}`}>
            <span className="text-lg">{isRejected ? "❌" : "⏳"}</span>
            <div>
                {isRejected ? (
                    <span>
                        Your startup profile was <strong>rejected</strong> by the admin.
                    </span>
                ) : (
                    <span>Your startup is pending admin approval before it appears publicly.</span>
                )}
            </div>
        </div>
    );
}