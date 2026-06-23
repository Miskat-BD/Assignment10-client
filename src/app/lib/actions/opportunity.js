'use server'

import { serverMutation } from "../core/server"


export const createOpportunity = async (finalOpportunityData)=>{
    return serverMutation('/api/opportunity', "POST", finalOpportunityData)
}