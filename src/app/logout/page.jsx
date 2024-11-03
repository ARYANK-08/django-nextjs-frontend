"use client";
import { useAuth } from "@/components/authProvider";

const LOGOUT_URL = '/api/logout/';

export default function Page() {
    const auth = useAuth()
    async function handleClick(event) {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}), // Sending an empty JSON object
        };

        try {
            const response = await fetch(LOGOUT_URL, requestOptions);
            const data = await response.json();

            if (response.ok) {
                auth.logout()
                console.log("Logged out successfully");


            } else {
                console.error("Logout failed:", data);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    return (
        <div className="h-[95vh]">
            <div className="max-w-md mx-auto py-5">
                <h1>Sure you want to logout?</h1>
                <button 
                    className="bg-red-500 px-3 py-2 text-white hover:bg-red-600" 
                    onClick={handleClick}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
