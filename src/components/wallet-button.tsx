"use client";

import { useAccount } from "wagmi";
import { WalletAccount } from "./wallet-account";
import { WalletOptions } from "./wallet-options";

export function WalletButton() {
  const { isConnected } = useAccount();
  if (isConnected) return <WalletAccount />;
  return <WalletOptions />;
}
