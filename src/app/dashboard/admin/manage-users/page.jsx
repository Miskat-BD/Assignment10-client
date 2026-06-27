import { getAllUsers } from "@/app/lib/api/users";
import UserTable from "@/components/dashboard/UserTable";

const AdminManageUsersPage = async () => {
    const users = await getAllUsers() || [];

    return (
        <div className="space-y-6 p-4 md:p-6 bg-slate-50/50 rounded-3xl min-h-screen">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">
                    Manage Users
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    View user profiles, subscription plans, and restrict accounts if needed.
                </p>
            </div>

            <UserTable users={users} />
        </div>
    );
};

export default AdminManageUsersPage;