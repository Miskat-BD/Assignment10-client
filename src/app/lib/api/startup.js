'use server'

import { serverFetch } from "../core/server"

export const getStartupByFounderId = async (founderId)=>{
    return serverFetch(`/startup/${founderId}`)
}