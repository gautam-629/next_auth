export const BACKEND_URL=process.env.NEXT_PUBLIC_BACKEND_URL

export const secretKey=process.env.NEXT_PUBLIC_SESSION_SECRET_KEY

export const encodedkey=new TextEncoder().encode(secretKey)