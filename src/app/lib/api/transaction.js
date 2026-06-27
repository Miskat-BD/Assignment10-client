'use server'

import { serverFetch } from "../core/server"


export const getAllTransaction = async () => {
    return serverFetch('/api/transaction')
}