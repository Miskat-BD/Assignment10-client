import OpportunityCard from "@/components/OpportunityCard";
import { allOpportunity } from "../lib/api/opportunities";
import { Pagination } from "@heroui/react";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import FilterBox from "@/components/FilterBox"; 

const OpportunitiesPage = async ({ searchParams }) => {
    const params = await searchParams;
    
    const activePage = Number(params?.page) || 1;
    const searchQuery = params?.search || "";
    const workTypeQuery = params?.workType || ""; // 👈 ইউআরএল থেকে শুধু workType নেওয়া

    // এপিআই কল
    const { opportunities, page, totalPages } = await allOpportunity(
        activePage, 
        6, 
        searchQuery, 
        workTypeQuery
    );
    
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    // পেজিনেশন লিংক হেল্পার
    const getPageLink = (pageNumber) => {
        const urlParams = new URLSearchParams();
        urlParams.set("page", pageNumber);
        if (searchQuery) urlParams.set("search", searchQuery);
        if (workTypeQuery) urlParams.set("workType", workTypeQuery);
        
        return `/opportunities?${urlParams.toString()}`;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 border-b border-slate-100 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Explore Opportunities
                    </h1>
                    <p className="text-sm text-slate-500 mt-2">
                        Discover exciting roles posted by growing startups.
                    </p>
                </div>
                <SearchBox />
            </div>

            {/* 🎛️ ফিল্টার বক্স */}
            <FilterBox />

            {!opportunities || opportunities.length === 0 ? (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-12 text-center text-slate-500 font-medium">
                    😭 No opportunities available for your selected criteria. Check back later!
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
                    
                    {/* 📊 সিঙ্কড পেজিনেশন */}
                    <div className="flex w-full justify-center items-center p-5 mt-10">
                        <Pagination size="sm">
                            <Pagination.Content className="flex items-center justify-center gap-1">
                                <Pagination.Item>
                                    <Pagination.Previous isDisabled={page === 1}>
                                        <Link className="flex gap-2 items-center" href={getPageLink(page - 1)}>
                                            <Pagination.PreviousIcon />
                                            Prev
                                        </Link>
                                    </Pagination.Previous>
                                </Pagination.Item>

                                {pages.map((p) => (
                                    <Pagination.Item key={p}>
                                        <Link href={getPageLink(p)}>
                                            <Pagination.Link className={`${p === page && 'bg-blue-500 text-white'}`} isActive={p === page}>
                                                {p}
                                            </Pagination.Link>
                                        </Link>
                                    </Pagination.Item>
                                ))}

                                <Pagination.Item>
                                    <Pagination.Next isDisabled={page === totalPages}>
                                        <Link className="flex gap-2 items-center" href={getPageLink(page + 1)}>
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