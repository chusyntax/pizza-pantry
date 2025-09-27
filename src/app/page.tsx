"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
        <p className="text-lg">You are not signed in.</p>
        <a
          href="/sign-in"
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Go to Sign In
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      <h1 className="text-2xl font-bold">Welcome, {user.firstName} 👋</h1>
      <SignOutButton>
        <button className="px-4 py-2 bg-gray-800 text-white rounded-lg">
          Sign Out
        </button>
      </SignOutButton>
    </div>
  );
}
