import { useState, useEffect } from "react";
import { ethers } from "ethers";

export function useGetNonce() {
  const [provider, setProvider] = useState<ethers.JsonRpcProvider | null>(null);

  const getNonce = async (userAddress: `0x${string}` | undefined) => {
    if (!userAddress) {
      return;
    }
    if (provider) {
      return provider.getTransactionCount(userAddress);
    } else {
      const newProviderInstance = new ethers.JsonRpcProvider(
        "http://127.0.0.1:8545"
      );
      setProvider(newProviderInstance);
      return newProviderInstance.getTransactionCount(userAddress);
    }
  };

  return { getNonce };
}
