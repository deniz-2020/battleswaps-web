"use client";

import Link from "next/link";
import { WalletButton } from "./wallet-button";

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Battleswaps
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <WalletButton />
        </div>
      </div>
    </nav>
  );
}
