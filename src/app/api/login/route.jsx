"use server";

import { NextResponse } from 'next/server';
import { setToken } from '../../lib/auth'; // Ensure setToken and getToken are imported
import { DJANGO_API_ENDPOINT } from '../../../config/defaults';
const DJANGO_API_LOGIN_URL = `${DJANGO_API_ENDPOINT}/token/pair`;

export async function POST(request) {
    const requestdata = await request.json();
    const jsonData = JSON.stringify(requestdata);

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonData,
    };

    try {
        const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions);

        // Ensure the response is ok before trying to parse it
        if (!response.ok) {
            const errorData = await response.text(); // Read response as text first
            console.error("Login failed:", errorData);
            return NextResponse.json({"error": errorData}, { status: response.status });
        }

        // Now parse the response JSON safely
        const responseData = await response.json();
        console.log("Response Data:", responseData);

        // Make sure to destructure access and refresh correctly
        const {username, access } = responseData; // Destructure from responseData

        setToken(access);
        // Optionally, you may want to set the refresh token as well
        // setRefreshToken(refresh);

        return NextResponse.json({"message": "Login successful", "token": access, "username": username }, { status: 200 });
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({"error": "An unexpected error occurred"}, { status: 500 });
    }
}
