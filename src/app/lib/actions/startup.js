'use server'

import { serverMutation } from "../core/server"

export const createStartup = async (data)=>{
    return serverMutation('/startups', "POST", data)
}
