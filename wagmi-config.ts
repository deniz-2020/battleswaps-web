"use client";

import { http, createConfig } from "wagmi";
import { mainnet, sepolia, anvil } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [anvil],
  transports: {
    [anvil.id]: http(),
  },
  connectors: [metaMask()],
});
