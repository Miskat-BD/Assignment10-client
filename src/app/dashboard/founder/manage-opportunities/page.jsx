import { getOpportunitiesByStartupId } from "@/app/lib/api/opportunities";
import { getStartupByFounderId } from "@/app/lib/api/startup";
import { getUserSession } from "@/app/lib/core/session";
import ManageOpportunitiesTable from "@/components/dashboard/ManageOpportunitiesTable";

export default async function ManageOpportunitiesPage() {
    const user = await getUserSession();

    let myStartup = null;
    let opportunities = [];

    if (user?.id) {
        myStartup = await getStartupByFounderId(user.id);
        
        if (myStartup) {
            const startupId = myStartup._id?.toString() || myStartup.id?.toString();
            
            const oppList = await getOpportunitiesByStartupId(startupId);
            if (Array.isArray(oppList)) {
                opportunities = oppList;
            }
        }
    }

    return (
        <div className="max-w-6xl space-y-6 p-2 animate-fade-in">
            <div className="pb-4 border-b border-slate-100">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">
                    Manage Opportunities
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    View the roles you have posted using your Startup ID.
                </p>
            </div>

            <ManageOpportunitiesTable 
                myStartup={myStartup} 
                opportunities={opportunities} 
            />
        </div>
    );
}