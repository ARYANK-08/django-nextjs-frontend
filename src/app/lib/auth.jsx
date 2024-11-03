import { cookies } from "next/headers";

const TOKEN_AGE = 3600;
const TOKEN_NAME = "auth-token";
const TOKEN_REFRESH_NAME = "auth-refresh-token";

export function getToken() { 
    const myAuthToken = cookies().get(TOKEN_NAME);
    return myAuthToken?.value; // Ensure this returns a valid token
}


export function getRefreshToken() {
    // Logout
    const myAuthRefreshToken = cookies().get(TOKEN_REFRESH_NAME);
    return myAuthRefreshToken?.value;
}

export function setToken(authToken) {
    // Login
    cookies().set({
        name: TOKEN_NAME,
        value: authToken,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: TOKEN_AGE,
    });
}

export function setRefreshToken(authRefreshToken) {
    // Login
    cookies().set({
        name: TOKEN_REFRESH_NAME,
        value: authRefreshToken,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: TOKEN_AGE,
    });
}

export function deleteToken() {
    // Logout
    cookies().delete(TOKEN_NAME);
    cookies().delete(TOKEN_REFRESH_NAME); // Ensure both tokens are deleted
}
