import OpportunityCard from "@/components/OpportunityCard";
import { allOpportunity } from "../lib/api/opportunities";
import { Pagination } from "@heroui/react";
import Link from "next/link";

const OpportunitiesPage = async ({ searchParams }) => {
    const params = await searchParams;
    console.log(params, ' page');
    const { opportunities, page, totalPages } = await allOpportunity(params.page);
    // console.log(opportunities, 'all ');
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }
    console.log(pages, 'page');

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
                <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {opportunities.map((opp) => (
                        <OpportunityCard
                            key={opp._id || opp.id}
                            opportunity={opp}
                        />
                    ))}
                    
                </div>
                <div className="flex justify-center items-center text-center mx-auto p-5 mt-10">
                        <Pagination size="sm">
                            <Pagination.Content>
                                <Pagination.Item>
                                    <Pagination.Previous
                                        isDisabled={page === 1}

                                    >
                                        <Link className="flex gap-2" href={`/opportunities?page=${page - 1}`}>
                                            <Pagination.PreviousIcon />
                                            Prev</Link>
                                    </Pagination.Previous>
                                </Pagination.Item>

                                {/* [1, 2, 3, 4, 5, 6, 7, 8, 9] */}
                                {pages.map((p) => (
                                    <Pagination.Item key={p}>
                                        <Link href={`/opportunities?page=${p}`}>
                                            <Pagination.Link className={`${p === page && 'bg-blue-500 text-white'}`} isActive={p === page}>
                                                {p}
                                            </Pagination.Link>
                                        </Link>
                                    </Pagination.Item>
                                ))}
                                <Pagination.Item>
                                    <Pagination.Next
                                        isDisabled={page === totalPages}
                                    >
                                        <Link className="flex gap-2" href={`/opportunities?page=${page + 1}`}>
                                            Next
                                            <Pagination.NextIcon />
                                        </Link>
                                    </Pagination.Next>
                                </Pagination.Item>
                            </Pagination.Content>
                        </Pagination>
                    </div>
                </>
                
            )}
        </div>
    );
};

export default OpportunitiesPage;