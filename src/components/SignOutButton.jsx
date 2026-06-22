"use client";

import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/auth/login");
        router.refresh();
    };

    return (
        <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
        >
            Logout
        </button>
    );
};

export default SignOutButton;