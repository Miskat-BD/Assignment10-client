import { getApplicationByEmail } from "@/app/lib/actions/applications";
import { getUserSession } from "@/app/lib/core/session";
import { Card, Surface } from "@heroui/react";

const DashboardCollaboratorPage = async () => {
    const user = await getUserSession();
    // Backend theke retrieved real array parse kora holo
    const applications = (await getApplicationByEmail(user?.email)) || [];

    // 📊 Status tracking and state sorting via reduce
    const totalApplied = applications.length;
    const pendingCount = applications.filter(app => app.Status === "Pending").length;
    const shortlistedCount = applications.filter(app => app.Status === "Approved").length;

    return (
        <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6">
            {/* Top Greeting */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Welcome Back! 👋</h1>
                <p className="text-sm text-slate-500 mt-1">Here is whats happening with your applications today.</p>
            </div>

            {/* 📊 Metrics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-5 border border-slate-100 shadow-sm rounded-2xl bg-white">
                    <span className="text-sm text-slate-500 font-medium">Total Applied</span>
                    <h3 className="text-3xl font-bold text-slate-900 mt-2">{totalApplied}</h3>
                </Card>
                <Card className="p-5 border border-slate-100 shadow-sm rounded-2xl bg-white">
                    <span className="text-sm text-slate-500 font-medium">Pending Review</span>
                    <h3 className="text-3xl font-bold text-amber-600 mt-2">{pendingCount}</h3>
                </Card>
                <Card className="p-5 border border-slate-100 shadow-sm rounded-2xl bg-white">
                    <span className="text-sm text-slate-500 font-medium">Shortlisted</span>
                    <h3 className="text-3xl font-bold text-emerald-600 mt-2">{shortlistedCount}</h3>
                </Card>
            </div>
        </div>
    );
};

export default DashboardCollaboratorPage;