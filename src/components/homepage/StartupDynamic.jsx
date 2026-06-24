import { getAllStartups } from "@/app/lib/api/startup";
import StartupCard from "../dashboard/StartupCard";
import Link from "next/link";

const StartupDynamic = async () => {
    const startups = await getAllStartups();
    
    if (!startups || startups.length === 0) {
        return (
            <div className="text-center p-10">No Startups </div>
        )
    };

    return (
        <section className="relative py-16 sm:py-24 overflow-hidden bg-slate-50/50">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Discover Innovation</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black my-5 text-slate-900 tracking-tight">
                            Featured <span className="text-emerald-600">Startups</span>
                        </h2>
                        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-xl">
                            Meet the trailblazing companies transforming industries and redefining tomorrow.
                        </p>
                    </div>
                    
                    <Link href={'/startups'} className="self-start md:self-auto text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group transition-colors">
                        Explore all startups 
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {startups.slice(0, 3).map((startup) => (
                        <StartupCard key={startup._id} startup={startup} />
                    ))}
                </div>
                
            </div>
        </section>
    );
};

export default StartupDynamic;