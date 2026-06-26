import { getAllStartups } from "@/app/lib/api/startup";
import StartupTable from "@/components/dashboard/StartupTable";

const AdminManageStartupPage = async () => {
    const allStartup = await getAllStartups() || [];

    return (
        <div className="space-y-6 p-4 md:p-6 bg-slate-50/50 rounded-3xl min-h-screen">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">
                    Manage Startups
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Review, approve, or reject ecosystem startup applications.
                </p>
            </div>

            <StartupTable startups={allStartup} />
        </div>
    );
};

export default AdminManageStartupPage;