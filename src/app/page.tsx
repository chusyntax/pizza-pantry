"use client";

import {
  useUser,
  SignOutButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center px-4">
        <h1 className="text-5xl font-bold text-white">
          Welcome to The Pizza Inventory App 📦
        </h1>
        <p className="text-lg text-gray-300 max-w-xl">
          Manage your items, track quantities, and keep your inventory organized
          effortlessly.
        </p>
        <div className="flex gap-4 mt-4">
          <SignUpButton>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Sign Up
            </button>
          </SignUpButton>
          <SignInButton>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center">
      <h1 className="text-5xl font-bold text-white">
        Welcome, {user.firstName} 👋
      </h1>
      <p className="text-lg text-gray-300 max-w-xl">
        You are now signed in. Access your inventory and manage your items
        efficiently.
      </p>
      <div className="flex gap-4 mt-4">
        <a href="/inventory">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Go to Inventory
          </button>
        </a>
        <a href="/add-item">
          <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
            Add Item
          </button>
        </a>
        <SignOutButton>
          <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
