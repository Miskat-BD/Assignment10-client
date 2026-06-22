import React from "react";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { getUserSession } from "../lib/core/session";

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
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)] bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 my-4">
            
            <DashboardSidebar user={user} role={role} currentMenu={currentMenu} />

            <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-x-hidden bg-slate-50">
                {children}
            </main>
        </div>
    );
}