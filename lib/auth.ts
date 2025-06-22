'use server'

import { redirect} from "next/navigation";
import { FormState, signInFormSchema, SignUpFormSchema } from "./type";
import { BACKEND_URL } from "./constrant";
import { createSession, deleteSession } from "./session";
import { revalidatePath } from "next/cache";

export async function singnUp(state:FormState,formData:FormData):Promise<FormState> {
    
    //validate form data
     const validationFields=SignUpFormSchema.safeParse({
        name:formData.get('name'),
        email:formData.get('email'),
        password:formData.get('password')
     });

     if(!validationFields.success){
        return{
            error:validationFields.error.flatten().fieldErrors
        };
     }

      try {
        // Use BACKEND_URL constant instead of hardcoded localhost
        const response = await fetch(`${BACKEND_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(validationFields.data)
        });


        if (response.ok) {
            redirect('/auth/signin');
        } else {
            const errorText = await response.text();
            return {
                message: response.status === 409 
                    ? 'The user already exists!' 
                    : `Error: ${response.status} - ${errorText || response.statusText}`
            };
        }
    } catch (error) {
        console.error('Network error:', error);
        return {
            message: 'Network error: Unable to connect to server. Please check if the backend is running.'
        };
    }

    
}

export async function signIn(state:FormState,formData:FormData):Promise<FormState> {
    //validate form data
     const validationFields=signInFormSchema.safeParse({
        email:formData.get('email'),
        password:formData.get('password')
     });

     if(!validationFields.success){
        return{
            error:validationFields.error.flatten().fieldErrors
        };
     }

   const response=await fetch(`${BACKEND_URL}/auth/signin`,{
    method:'Post',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(validationFields.data)
})

   if(response.ok){

    //create a session for authentication user
  const result=await response.json()

 await createSession({
          user:{
            id:result.id,
            name:result.name
          },
            accessToken:result.accessToken,
            refreshToken:result.refreshToken
  })

        redirect('/')
   }
   else{
      return{
        message:response.status==401?'Invalid Credentials':response.statusText
      }
   }

}


export async function logoutAction(){
    await deleteSession()
    revalidatePath('/','layout');
    redirect('/')
}


export const refreshToken= async(oldRefreshToken:string)=>{
 try {
    const response=await fetch(`${BACKEND_URL}/auth/refresh`,{
        method:'POST',
        headers:{
           'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            refresh:oldRefreshToken
        })
    })
    if(!response.ok){
        throw new Error('Failed to refresh token')
    }
    const {accessToken,refreshToken}=await response.json();
     await fetch('http://localhost:3000/api/auth/update',{
       method:'POST',
        headers:{
           'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            refreshToken,
            accessToken
        })
     })
    return accessToken
 } catch (error) {
    console.log('refreshToken failed',error)
 }
}