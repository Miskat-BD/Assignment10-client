'use server'

import { serverMutation } from "../core/server"

export const subscription = async (data) => {
    return serverMutation('/api/subscription', 'POST', data)
}