import { getApplicationByEmail } from '@/app/lib/actions/applications';
import { getUserSession } from '@/app/lib/core/session';
import MyApplicationsTable from '@/components/dashboard/MyApplicationsTable'; // path thik kore niben

const MyApplicationsPage = async () => {
    const user = await getUserSession();
    const applications = (await getApplicationByEmail(user?.email)) || [];

    return (
        <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">My Applications</h2>
                <p className="text-sm text-slate-500 mt-1">
                    You have submitted total {applications.length} applications.
                </p>
            </div>

            {applications.length === 0 ? (
                <div className="text-center p-10 bg-slate-50 rounded-2xl border border-dashed text-slate-500">
                    You have not applied to any roles yet.
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <MyApplicationsTable applications={applications} />
                </div>
            )}
        </div>
    );
};

export default MyApplicationsPage;