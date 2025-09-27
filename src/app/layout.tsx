import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pizza Pantry",
  description: "Inventory management app for a pizza shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-gray-50 text-gray-900">
          <header className="p-4 bg-red-600 text-white font-bold flex gap-6">
            <a href="/">🍕 Pizza Pantry</a>
            <a href="/inventory" className="hover:underline">
              Inventory
            </a>
          </header>

          <main className="p-6">{children}</main>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
