import StartupCard from "@/components/dashboard/StartupCard";
import { getAllStartups } from "../lib/api/startup";

const StartupsPage = async () => {
    const allStartups = await getAllStartups() || []; 
    console.log(allStartups, 'all');

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-10 text-center sm:text-left">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                    Browse Startups
                </h1>
                <p className="text-sm text-slate-500 mt-2 max-w-xl">
                    Explore innovative startups, discover creative minds, and apply to join amazing teams.
                </p>
            </div>

            {allStartups.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-slate-500 font-medium">No startups available right now.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allStartups.map((startup) => (
                        <StartupCard key={startup._id} startup={startup} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default StartupsPage;