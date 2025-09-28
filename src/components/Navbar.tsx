"use client";

import Link from "next/link";
import { useClerk, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Navbar() {
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut({ redirectUrl: "/sign-in" });
  };

  return (
    <nav className="bg-blue-600 text-white font-bold p-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="hover:underline">
          🍕 Pizza Pantry
        </Link>

        <SignedIn>
          <Link href="/inventory" className="hover:underline">
            Inventory
          </Link>
          <Link href="/add-item" className="hover:underline">
            Add Item
          </Link>
        </SignedIn>
      </div>

      <div>
        <SignedIn>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-gray-800 text-gray-100 rounded hover:bg-gray-700"
          >
            Logout
          </button>
        </SignedIn>

        <SignedOut>
          <Link
            href="/sign-in"
            className="px-3 py-1 bg-gray-800 text-gray-100 rounded hover:bg-gray-700"
          >
            Login
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
}
