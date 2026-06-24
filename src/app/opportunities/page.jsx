import OpportunityCard from "@/components/OpportunityCard";
import { allOpportunity } from "../lib/api/opportunities";

const OpportunitiesPage = async () => {
    const opportunities = await allOpportunity();
    // console.log(opportunities, 'all ');

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 border-b border-slate-100 pb-5">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Explore Opportunities
                </h1>
                <p className="text-sm text-slate-500 mt-2">
                    Discover exciting roles posted by growing startups.
                </p>
            </div>

            {!opportunities || opportunities.length === 0 ? (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-12 text-center text-slate-500 font-medium">
                    😭 No opportunities available right now. Check back later!
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {opportunities.map((opp) => (
                        <OpportunityCard
                            key={opp._id || opp.id}
                            opportunity={opp}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OpportunitiesPage;