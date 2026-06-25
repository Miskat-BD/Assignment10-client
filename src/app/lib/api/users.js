'use server'

import { serverFetch } from "../core/server"

export const getUserById = async (id) => {
    return serverFetch(`/api/users/${id}`)
}