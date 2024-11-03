"use client";
import { useEffect } from "react";
import useSWR from "swr";
import { useAuth } from "@/components/authProvider";
import WaitlistTable from "./table";

const fetcher = async url => {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error("An error occured while fetching the data.")
    // Attach extra info to the error object
    error.info = await res.json()
    error.status = res.status
    throw error

  }
  return res.json();
};

const WAITLIST_API_URL = "/api/waitlist/";

export default function Page() {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <WaitlistTable/>
     </main>
  )
}
