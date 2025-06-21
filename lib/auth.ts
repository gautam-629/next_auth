'use server'

import { redirect} from "next/navigation";
import { FormState, SignUpFormSchema } from "./type";
import { BACKEND_URL } from "./constrant";

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