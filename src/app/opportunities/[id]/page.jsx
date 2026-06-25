import { getOpportunityById } from "@/app/lib/api/opportunities";
import OpportunityDetailsClient from "@/components/OpportunityDetailsClient";


export default async function OpportunityDetailsPage({ params }) {
    const { id } = await params;
    
    const opportunity = await getOpportunityById(id);
    // console.log(opportunity, 'details');

    if (!opportunity) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-slate-500 font-medium">Opportunity not found.</p>
            </div>
        );
    }

    return <OpportunityDetailsClient opportunity={opportunity} />;
}