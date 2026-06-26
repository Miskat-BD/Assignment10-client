import { getApplicationsByStartupId } from "@/app/lib/api/applications.";
import { getStartupByFounderId } from "@/app/lib/api/startup";
import { getUserSession } from "@/app/lib/core/session";
import FounderApplicationsTable from "@/components/dashboard/FounderApplicationsTable";

export default async function FounderApplicationsPage() {
    const user = await getUserSession();
    
    let myStartup = null;
    let applications = [];

    if (user?.id) {
        // প্রথমে ফাউন্ডারের নিজস্ব স্টার্টআপ প্রোফাইল নিয়ে আসা হচ্ছে
        myStartup = await getStartupByFounderId(user.id);
        
        if (myStartup) {
            const startupId = myStartup._id?.toString() || myStartup.id?.toString();
            // স্টার্টআপ আইডি দিয়ে জমা হওয়া অ্যাপ্লিকেশনগুলো ফেচ করা হচ্ছে
            const appList = await getApplicationsByStartupId(startupId);
            if (Array.isArray(appList)) {
                applications = appList;
            }
        }
    }

    return (
        <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Manage Applications</h2>
                <p className="text-sm text-slate-500 mt-1">
                    Review and manage applications submitted to your startup. Total: {applications.length}
                </p>
            </div>

            {!myStartup ? (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
                    <p className="text-amber-800 font-medium">
                        ⚠️ Please create your startup profile first to view applications.
                    </p>
                </div>
            ) : applications.length === 0 ? (
                <div className="text-center p-10 bg-slate-50 rounded-2xl border border-dashed text-slate-500">
                    No applications received yet for this startup.
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <FounderApplicationsTable initialApplications={applications} />
                </div>
            )}
        </div>
    );
}