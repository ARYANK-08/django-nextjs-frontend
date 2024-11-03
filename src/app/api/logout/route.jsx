import { deleteToken } from "../../lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Call the correct function
        const myTokenResponse = await deleteToken(); 
        return NextResponse.json({ message: "Tokens deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting tokens:", error);
        return NextResponse.json({ error: "Failed to delete tokens" }, { status: 500 });
    }
}
