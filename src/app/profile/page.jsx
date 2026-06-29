import { getUserSession } from '../lib/core/session';
import Image from 'next/image';

const ProfileHomePage = async () => {
    const sessionData = await getUserSession();
    
    const user = sessionData?.user || sessionData; 

    const defaultAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80";

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    
                    <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-600 w-full" />

                    <div className="px-6 pb-8 sm:px-8 sm:pb-10 relative">
                        
                        <div className="absolute -top-16 left-6 sm:left-8">
                            <div className="h-28 w-28 rounded-2xl ring-4 ring-white overflow-hidden bg-slate-200 shadow-md relative">
                                <Image 
                                    src={user?.image || defaultAvatar} 
                                    alt={user?.name || "User Avatar"}
                                    fill
                                    className="object-cover"
                                    unoptimized 
                                    priority
                                />
                            </div>
                        </div>

                        <div className="pt-16 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-2xl font-bold text-slate-900">
                                        {user?.name || "Guest User"}
                                    </h1>
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                                        {user?.plan || "Free"} Plan
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 mt-1">{user?.email || "No email linked"}</p>
                            </div>
                        </div>

                        <hr className="my-6 border-slate-100" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Account Role</span>
                                <span className="text-lg font-semibold text-slate-800 mt-2 capitalize">
                                    {user?.role || "Collaborator"}
                                </span>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Current Membership</span>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-lg font-semibold text-slate-800 capitalize">
                                        {user?.plan || "Free"}
                                    </span>
                                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                </div>
                            </div>

                        </div>

                        <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
                            <span>StartupForge Verified Account</span>
                            <span>ID: {user?.id || user?._id || "N/A"}</span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfileHomePage;