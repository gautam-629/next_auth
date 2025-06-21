 "use server"

import { jwtVerify, SignJWT } from "jose";
import { encodedkey } from "./constrant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
    user: {
        id: string;
        name: string;
    };
    // accessToken: string;
    // refreshToken: string;
}

export async function createSession(payload: Session) {
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const session = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedkey);

    (await cookies()).set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiredAt,
        sameSite: 'lax',
        path: '/'
    });
}

export async function getSession(): Promise<Session | null> {
    const cookie = (await cookies()).get('session');
    if (!cookie || !cookie.value) return null;

    try {
        const { payload } = await jwtVerify(cookie.value, encodedkey, {
            algorithms: ['HS256']
        });

        return payload as Session;
    } catch (error) {
        console.log('Failed to verify session', error);
        redirect('/auth/signin');
    }
}

export async function deleteSession() {
    (await cookies()).delete('session')
}