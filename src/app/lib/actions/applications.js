'use server'

import { serverFetch, serverMutation } from "../core/server"

export const applyToOpportunity = async (data)=>{
    return serverMutation('/api/applications', 'POST', data)
}

export const getApplicationCheck = async (opportunityId, applicantEmail)=>{
    return serverFetch(`/api/applications/check?opportunityId=${opportunityId}&email=${applicantEmail}`)
}

// await fetch(`http://localhost:8000/api/applications/check?opportunityId=${opportunityId}&email=${applicantEmail}`);
//                 const data = await res.json();