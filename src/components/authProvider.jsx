"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const LOCAL_STORAGE_KEY = "is-logged-in";
const LOGIN_REDIRECT_URL = "/";
const LOGOUT_REDIRECT_URL = "/login";
const LOGIN_REQUIRED_URL = "/login";
const LOCAL_USERNAME_KEY = "username"

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("")
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const invalidNextUrl = ['/login', '/logout']
    const nextUrl = searchParams.get("next")
    const nextUrlValid = nextUrl && nextUrl.startsWith("/") && !invalidNextUrl.includes(nextUrl)
    console.log(nextUrl, nextUrlValid)
    useEffect(() => {
        const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedAuthStatus) {
            const storedAuthStatusInt = parseInt(storedAuthStatus);
            setIsAuthenticated(storedAuthStatusInt === 1);
        }
        const storedUn = localStorage.getItem(LOCAL_USERNAME_KEY);
        if (storedUn) {
            setUsername(storedUn);
        }
    }, []);

    const login = (username) => {
        setIsAuthenticated(true);
        localStorage.setItem(LOCAL_STORAGE_KEY, "1");
        if (username){
            localStorage.setItem(LOCAL_USERNAME_KEY, `${username}`)
            setUsername(username)
        }
        else {
            localStorage.removeItem(LOCAL_USERNAME_KEY)

        }
            
        console.log(searchParams)
        router.replace(LOGIN_REDIRECT_URL);
        
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.setItem(LOCAL_STORAGE_KEY, "0");
        router.replace(LOGOUT_REDIRECT_URL);
    };

    const loginRequiredRedirect = () => {
        setIsAuthenticated(false);
        localStorage.setItem(LOCAL_STORAGE_KEY, "0");
        let loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${pathname}`;
        
        if (LOGIN_REQUIRED_URL === pathname) {
            loginWithNextUrl = LOGIN_REDIRECT_URL;
        }
        
        router.replace(loginWithNextUrl);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loginRequiredRedirect, username }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
