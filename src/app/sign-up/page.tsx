"use client";

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-white mb-4">Sign Up</h1>
        <SignUp />
      </div>
    </div>
  );
}
