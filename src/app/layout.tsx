import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Toaster } from "@/components/toaster";
import WalletConnectionProvider from "@/providers/WalletConnectionProvider";
import { Navbar } from "@/components/top-navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Battleswaps",
  description: "A platform for Uniswap v4 trading battles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WalletConnectionProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto bg-background p-8">
                <div className="container mx-auto">{children}</div>
              </main>
            </div>
          </div>
          <Toaster />
        </body>
      </html>
    </WalletConnectionProvider>
  );
}
