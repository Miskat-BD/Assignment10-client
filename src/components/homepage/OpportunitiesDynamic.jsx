import { allOpportunity } from "@/app/lib/api/opportunities";
import OpportunityCard from "../OpportunityCard";
import Link from "next/link";

const OpportunitiesDynamic = async () => {
    const {opportunities} = await allOpportunity();

    if (!opportunities || opportunities.length === 0) {
        return (
            <div className="text-center p-10">No opportunities</div>
        )
    };

    return (
        <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [bg-size:16px_16px] opacity-60 pointer-events-none" />

            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Join the Mission</span>
                        </div>
                        <h2 className="text-3xl my-5 sm:text-4xl font-black text-slate-900 tracking-tight">
                            Featured <span className="text-emerald-600">Opportunities</span>
                        </h2>
                        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-xl">
                            Find the perfect roles to scale your impact. Work directly with visionary founders.
                        </p>
                    </div>

                    <Link href={'/opportunities'} className="self-start md:self-auto text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group transition-colors">
                        View all opportunities
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {opportunities.slice(0, 3).map((opportunity) => (
                        <OpportunityCard key={opportunity._id || opportunity.id} opportunity={opportunity} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default OpportunitiesDynamic;