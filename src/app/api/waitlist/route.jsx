import { NextResponse } from "next/server";
import { getToken } from "../../lib/auth";
import { headers } from "next/headers";
import { DJANGO_API_ENDPOINT } from "../../../config/defaults";

const DJANGO_API_WAITLIST_URL = `${DJANGO_API_ENDPOINT}/waitlist/`;

export async function GET(request) {
    const authToken = getToken();
    if (!authToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    };

    const response = await fetch(DJANGO_API_WAITLIST_URL, options);
    if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to fetch from waitlist API:", errorData);
        return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
}

export async function POST(request) {
    let headers = {
        "Content-Type" : "application/json",
        "Accept" : "application/json",
    }
    const authToken = getToken();
    if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`
    }

    const requestData = await request.json();
    const jsonData = JSON.stringify(requestData);
    const requestOptions = {
        method: "POST",
        headers: headers,
        body: jsonData
    };

    try {
        const response = await fetch(DJANGO_API_WAITLIST_URL, requestOptions);
        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(errorData, { status: response.status });
        }

        const responseData = await response.json();
        return NextResponse.json({ message: "Successfully added to waitlist", data: responseData }, { status: 201 });
    } catch (error) {
        console.error("Error during waitlist submission:", error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
