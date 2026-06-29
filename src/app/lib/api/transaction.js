'use server'

import { protectedFetch, serverFetch } from "../core/server"


export const getAllTransaction = async () => {
    return protectedFetch('/api/transaction')
}