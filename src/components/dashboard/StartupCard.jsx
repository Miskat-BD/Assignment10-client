import Image from "next/image";
import Link from "next/link";

export default function StartupCard({ startup }) {
    return (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow h-full">
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 relative rounded-xl overflow-hidden border border-slate-100 shrink-0 bg-slate-50">
                        <Image
                            src={startup.logo || "/placeholder-logo.png"}
                            alt={startup.name || startup.startup_name || "Logo"}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="overflow-hidden">
                        <h2 className="text-lg font-bold text-slate-900 truncate">
                            {startup.name || startup.startup_name}
                        </h2>
                        <p className="text-xs font-semibold text-emerald-600 truncate">
                            {startup.industry}
                        </p>
                    </div>
                </div>

                <div className="inline-block px-2.5 py-1 bg-slate-50 text-slate-700 text-xs font-bold rounded-lg border border-slate-200/60">
                    🚀 {startup.fundingStage || startup.funding_stage || "Idea Phase"}
                </div>

                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {startup.description}
                </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between gap-2">
                <div className="overflow-hidden">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Founder</p>
                    <p className="text-xs font-medium text-slate-700 truncate max-w-35">
                        {startup.founderName}
                    </p>
                </div>

                <Link
                    href={`/startups/${startup._id}`}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors inline-block text-center"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}