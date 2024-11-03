"use client";
import { useState } from 'react';
import useSWR from 'swr';
import { useAuth } from '@/components/authProvider';
import { ThemeToggleButton } from '@/components/themeToggleButton';
import { WaitlistForm } from '@/app/waitlist/forms';

// Define types for the API response
type ApiResponse = {
  apiEndpoint: string;
};

// Define the auth context type
type AuthContextType = {
  isAuthenticated: boolean;
  user?: {
    id: string;
    email: string;
    // Add other user properties as needed
  };
};

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<ApiResponse> =>
  fetch(...args).then(res => res.json());

export default function Home() {
  const auth = useAuth() as unknown as AuthContextType;  // Type assertion for auth context
  const { data, error, isLoading } = useSWR<ApiResponse>("/api/hello", fetcher);

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-red-500">Error loading data</div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="animate-pulse">Loading...</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>{data?.apiEndpoint}</div>
      <div>
        <WaitlistForm />
      </div>
      <div>
        {auth.isAuthenticated ? "Hello user" : "Hello guest"}
      </div>
      <div>
        <ThemeToggleButton />
      </div>
    </main>
  );
}