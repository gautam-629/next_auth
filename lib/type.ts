import { z } from "zod";

export type FormState={
    error?:{
        name?:string[];
        email?:string[];
        password?:string[]
    }
    message?:string;
}|undefined


export const SignUpFormSchema=z.object({
    name:z.string().min(2,{message:'Name mest be at least 2 characters long.'}).trim(),
    email:z.string().email({message:'Please enter a valid email'}).trim(),
    password:z.string().min(8,{message:'Be at least 8 characters Long'})
             .regex(/[a-zA-Z]/,{message:'Contain at least one letter'})
             .regex(/[0-9]/,{message:'Contain at least one number'})
             .regex(/[^a-zA-Z0-9]/,{message:'contain at lest one special character.'})
             .trim()
})

export const signInFormSchema=z.object({
   
    email:z.string().email({message:'Please enter a valid email'}).trim(),
    password:z.string().min(1,{message:'Password filed must be not be empty'})
            
})