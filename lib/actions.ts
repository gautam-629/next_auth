'use server'

import { authFetch } from "./authFetch";

import { BACKEND_URL } from "./constrant";
// import { getSession } from "./session"

export const getProfile=async()=>{
//    const session=await getSession();

//    const response= await fetch(`${BACKEND_URL}/auth/protected`,{
//     method:'get',
//     headers:{
//         authorization:`Bearer ${session?.accessToken}`
//     }
//    })

const response=await authFetch(`${BACKEND_URL}/auth/protected`)

   const result=await response.json()

   return result;
}