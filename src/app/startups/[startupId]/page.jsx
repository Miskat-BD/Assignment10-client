import { getStartupDetailsById } from "@/app/lib/api/startup";
import Image from "next/image";
import Link from "next/link";

const StartupDetailsPage = async ({ params }) => {
    const { startupId } = await params; 
    const startup = await getStartupDetailsById(startupId);

    if (!startup) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-sm">⚠️</div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Startup Not Found</h2>
                <Link href="/startups" className="mt-5 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-all shadow-sm">
                    ← Back to Startups
                </Link>
            </div>
        );
    }

    // কেস-ইনসেনসিティブ চেক করার জন্য স্ট্যাটাসটিকে ছোট হাতের অক্ষরে রূপান্তর করে নেওয়া হলো
    const currentStatus = startup.status?.toLowerCase();

    // স্ট্যাটাস অনুযায়ী ডাইনামিক টপ অ্যাকসেন্ট বার কালার নির্ধারণ
    let accentBarColor = "bg-emerald-500"; // Default / Active
    if (currentStatus === "pending") accentBarColor = "bg-amber-500";
    if (currentStatus === "rejected") accentBarColor = "bg-rose-500";

    return (
        <div className="min-h-screen bg-slate-50/40 pb-16">
            {/* Top Navigation Bar */}
            <div className="max-w-5xl mx-auto px-4 pt-8">
                <Link 
                    href="/startups" 
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider transition-colors bg-white px-4 py-2.5 rounded-xl border border-slate-200/60 shadow-sm"
                >
                    ← All Startups
                </Link>
            </div>

            {/* Main Content Layout */}
            <div className="max-w-5xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* LEFT COLUMN: Profile & Pitch Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header Profile Card */}
                    <div className="bg-white border border-slate-200/70 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
                        {/* Soft Ambient Glow Effect */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                            {/* Logo Frame */}
                            <div className="w-24 h-24 relative rounded-xl overflow-hidden border border-slate-100 bg-slate-50 shadow-inner flex items-center justify-center shrink-0">
                                <Image 
                                    src={startup.logo || "/placeholder-logo.png"} 
                                    alt={startup.name || "Startup Logo"} 
                                    fill 
                                    className="object-contain p-2"
                                />
                            </div>

                            {/* Identity Details */}
                            <div className="space-y-3 w-full text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-center sm:justify-start flex-wrap">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                                        {startup.name}
                                    </h1>
                                    
                                    {/* Main Header Status Badge (Dynamic) */}
                                    {currentStatus === "pending" && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold tracking-wider rounded-md uppercase border border-amber-200/40 mx-auto sm:mx-0">
                                            {startup.status}
                                        </span>
                                    )}
                                    {currentStatus === "rejected" && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 bg-rose-50 text-rose-700 text-[10px] font-bold tracking-wider rounded-md uppercase border border-rose-200/40 mx-auto sm:mx-0">
                                            {startup.status}
                                        </span>
                                    )}
                                    {currentStatus !== "pending" && currentStatus !== "rejected" && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-wider rounded-md uppercase border border-emerald-200/40 mx-auto sm:mx-0">
                                            {startup.status || "Active"}
                                        </span>
                                    )}
                                </div>
                                
                                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200/60">
                                    {startup.industry}
                                </span>

                                <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                                    <p className="flex items-center justify-center sm:justify-start gap-2">
                                        <span className="text-slate-400 font-medium uppercase tracking-wider">Founder:</span> 
                                        <span className="text-slate-700 font-medium">{startup.founderEmail}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pitch Description Box */}
                    <div className="bg-white border border-slate-200/70 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                            <span>📝</span> About the Venture
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
                            {startup.description}
                        </p>
                    </div>
                </div>

                {/* RIGHT COLUMN: Sidebar Stats & Actions */}
                <div className="space-y-6">
                    {/* Dynamic Funding & Opportunity Card */}
                    <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                        {/* Dynamic top active accent bar based on status */}
                        <div className={`absolute top-0 left-0 right-0 h-[3px] ${accentBarColor}`} />
                        
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Current Round</p>
                        <h3 className="text-xl font-bold mt-1 tracking-tight text-slate-900 flex items-center gap-2">
                            🚀 {startup.fundingStage || "Idea Phase"}
                        </h3>
                        
                        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs">
                            {/* Dynamic Opportunity Status Row */}
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 font-medium">Opportunity Status</span>
                                
                                {currentStatus === "pending" && (
                                    <span className="text-amber-600 bg-amber-50 px-2 py-0.5 font-bold rounded text-[11px] capitalize border border-amber-200/40">
                                        Pending
                                    </span>
                                )}
                                {currentStatus === "rejected" && (
                                    <span className="text-rose-600 bg-rose-50 px-2 py-0.5 font-bold rounded text-[11px] capitalize border border-rose-200/40">
                                        Rejected
                                    </span>
                                )}
                                {currentStatus !== "pending" && currentStatus !== "rejected" && (
                                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 font-bold rounded text-[11px] capitalize border border-emerald-200/40">
                                        Active
                                    </span>
                                )}
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 font-medium">Verified Profile</span>
                                <span className="text-slate-700 font-semibold">Yes</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StartupDetailsPage;