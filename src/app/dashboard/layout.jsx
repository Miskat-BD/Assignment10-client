import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getUserSession } from "../lib/core/session";
import SignOutButton from "@/components/SignOutButton";

export default async function DashboardLayout({ children }) {
    const user = await getUserSession();

    if (!user) {
        redirect("/auth/login?redirect=/dashboard");
    }

    const role = user?.role || "collaborator";

    const menuItems = {
        founder: [
            { name: "Overview", href: "/dashboard/founder" },
            { name: "My Startup", href: "/dashboard/founder/my-startup" },
            { name: "Add Opportunity", href: "/dashboard/founder/add-opportunity" },
            { name: "Manage Opportunities", href: "/dashboard/founder/manage-opportunities" },
            { name: "Applications", href: "/dashboard/founder/applications" },
        ],
        collaborator: [
            { name: "Overview", href: "/dashboard/collaborator" },
            { name: "My Applications", href: "/dashboard/collaborator/my-applications" },
            { name: "Profile", href: "/dashboard/collaborator/profile" },
        ],
        admin: [
            { name: "Overview", href: "/dashboard/admin" },
            { name: "Manage Users", href: "/dashboard/admin/manage-users" },
            { name: "Manage Startups", href: "/dashboard/admin/manage-startups" },
            { name: "Transactions", href: "/dashboard/admin/transactions" },
        ],
    };

    const currentMenu = menuItems[role] || menuItems.collaborator;

    return (
        <div className="flex min-h-[calc(100vh-140px)] bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 my-4">

            <aside className="hidden lg:flex w-64 bg-white border-r border-slate-100 p-6 flex-col justify-between shrink-0">
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            {user?.image && (
                                <Image src={user?.image} alt={user?.name} className="w-8 h-8 rounded-full object-cover" width={500} height={500} />
                            )}
                            <h2 className="text-sm font-bold text-slate-800 line-clamp-1">{user?.name}</h2>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                            {role}
                        </span>
                    </div>

                    <nav className="space-y-1">
                        {currentMenu.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="border-t border-slate-100 pt-4">
                    <SignOutButton />
                </div>
            </aside>

            <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-x-hidden bg-slate-50">
                {children}
            </main>
        </div>
    );
}