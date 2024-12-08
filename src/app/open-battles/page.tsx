"use client";

import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Badge } from "@/components/badge";
import { shrinkWalletAddress } from "@/utils/shrink-wallet-address";
import { Button } from "@/components/button";
import { useGetBattleRequests } from "@/hooks/blockchain/use-get-battle-requests";
import { getTokenColor, getTokenCurrency } from "@/utils/get-token-colour";
import { formatDuration } from "@/utils/format-duration";
import { useIsClient } from "@/hooks/use-is-client";
import { useAcceptBattle } from "@/hooks/blockchain/use-accept-battle";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function OpenBattles() {
  const router = useRouter();
  const isClient = useIsClient();
  const { data: battleRequests } = useGetBattleRequests();
  const {
    acceptBattle,
    writeError: acceptBattleError,
    status: acceptBattleStatus,
  } = useAcceptBattle();

  useEffect(() => {
    if (acceptBattleStatus === "success") {
      toast({
        title: "Battle accepted",
        description:
          "You have successfully accepted a battle. Trades in this pool will gain you points this battle",
        className: "text-zinc-50 bg-slate-700",
        duration: Infinity,
      });
      router.push("/my-battles");
    } else if (acceptBattleStatus === "error") {
      toast({
        title: "Failed to accept battle",
        description: acceptBattleError?.message,
        className: "text-neutral-50 bg-red-600",
        duration: Infinity,
      });
    }
  }, [acceptBattleStatus]);

  const onClickAcceptBattle = async (
    token0: string,
    token1: string,
    requester: string
  ) => {
    console.log("clicked accept battle buitton");
    await acceptBattle({ token0, token1, requester });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Open battle requests</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Challenger</TableHead>
            <TableHead>Opponent</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Start amount</TableHead>
            <TableHead>Prize amount</TableHead>
            <TableHead>Time of request</TableHead>
            <TableHead>Accept?</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {openBattles.map((battle, index) => (
            <TableRow key={index} className="pt-8 pb-8">
              <TableCell>{shrinkWalletAddress(battle.requester)}</TableCell>
              <TableCell>
                {battle.opponent ===
                "0x0000000000000000000000000000000000000000"
                  ? "Anyone"
                  : shrinkWalletAddress(battle.opponent)}
              </TableCell>
              <TableCell>{isClient && formatDuration(86400)}</TableCell>
              <TableCell>
                <Badge
                  className={`p-2 mb-2 ${colorMap[battle.token0]}`}
                  variant="outline"
                >
                  {battle.startAmountToken0} {battle.token0}
                </Badge>
                <br />
                <Badge
                  className={`p-2 mb-2 ${getTokenColor(battle.token1)}`}
                  variant="outline"
                >
                  {battle.startAmountToken1} {battle.token1}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={`p-2 mb-2 ${getTokenColor(battle.token0)}`}
                  variant="outline"
                >
                  {battle.prizeAmountToken0} {battle.token0}
                </Badge>
                <br />
                <Badge
                  className={`p-2 mb-2 ${getTokenColor(battle.token1)}`}
                  variant="outline"
                >
                  {battle.prizeAmountToken1} {battle.token1}
                </Badge>
              </TableCell>
              <TableCell>{battle.timeOfRequest}</TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    onClickAcceptBattle(
                      battle.token0,
                      battle.token1,
                      battle.requester
                    )
                  }
                  disabled={acceptBattleStatus === "pending"}
                >
                  {acceptBattleStatus === "pending"
                    ? "See MetaMask"
                    : "Accept battle"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/*
export interface BattleRequest {
  requester: string;
  opponent: string;
  prizePotShareToken0: bigint;
  prizePotShareToken1: bigint;
  duration: bigint;
  startBalanceToken0: string;
  startBalanceToken1: string;
  token0: string;
  token1: string;
  timestamp: bigint;
}

*/

// Dummy data for open battle requests
const openBattles = [
  {
    requester: "0xd6a5d1d3acfe0116dc024e1c8148b5f67bdea002",
    opponent: "0x0000000000000000000000000000000000000000",
    duration: "18 hours 24 minutes",
    token0: "BTC",
    token1: "ETH",
    startAmountToken0: "2000",
    startAmountToken1: "2000",
    prizeAmountToken0: "50000",
    prizeAmountToken1: "50000",
    timeOfRequest: "2024-12-05T08:15:30",
  },
  {
    requester: "0xd273ff4a4bf5360143a5242c15918dacc1f5cba0",
    opponent: "0x0000000000000000000000000000000000000000",
    duration: "4 hours 43 minutes",
    token0: "LINK",
    token1: "DOGE",
    startAmountToken0: "2000",
    startAmountToken1: "2000",
    prizeAmountToken0: "50000",
    prizeAmountToken1: "50000",
    timeOfRequest: "2024-12-06T14:42:17",
  },
  {
    requester: "0x761f08e8de7b6e2c7f93b22c852e09d640d1aa93",
    opponent: "0x0000000000000000000000000000000000000000",
    duration: "12 hours 30 minutes",
    token0: "DOT",
    token1: "LINK",
    startAmountToken0: "2000",
    startAmountToken1: "2000",
    prizeAmountToken0: "50000",
    prizeAmountToken1: "50000",
    timeOfRequest: "2024-12-07T19:58:09",
  },
  {
    requester: "0x69720cc918279c389018db6f76eb423f6bcc3255",
    opponent: "0x0000000000000000000000000000000000000000",
    duration: "18 hours 23 minutes",
    token0: "SOL",
    token1: "USDC",
    startAmountToken0: "2000",
    startAmountToken1: "2000",
    prizeAmountToken0: "50000",
    prizeAmountToken1: "50000",
    timeOfRequest: "2024-12-05T06:25:45",
  },
  {
    requester: "0x8c146a50d8c5d186df69fe001bb1a4565ac081fd",
    opponent: "0x0000000000000000000000000000000000000000",
    duration: "5 hours 18 minutes",
    token0: "USDC",
    token1: "BTC",
    startAmountToken0: "2000",
    startAmountToken1: "2000",
    prizeAmountToken0: "50000",
    prizeAmountToken1: "50000",
    timeOfRequest: "2024-12-08T22:33:12",
  },
  {
    requester: "0x66bb489c7e87c609fb1d0ede49e02f2d544cf22c",
    opponent: "0x0000000000000000000000000000000000000000",
    duration: "16 hours 39 minutes",
    token0: "NEAR",
    token1: "UNI",
    startAmountToken0: "2000",
    startAmountToken1: "2000",
    prizeAmountToken0: "50000",
    prizeAmountToken1: "50000",
    timeOfRequest: "2024-12-07T11:10:00",
  },
  {
    requester: "0x34ba0c843114651002ea9a545b678c617ac18673",
    opponent: "0x0000000000000000000000000000000000000000",
    duration: "4 hours 4 minutes",
    token0: "UNI",
    token1: "DOT",
    startAmountToken0: "2000",
    startAmountToken1: "2000",
    prizeAmountToken0: "50000",
    prizeAmountToken1: "50000",
    timeOfRequest: "2024-12-06T17:49:53",
  },
  {
    requester: "0x27ec29750dd9761e3687af0915a62b8fd8ec5b59",
    opponent: "0x0000000000000000000000000000000000000000",
    duration: "4 hours 17 minutes",
    token0: "BTC",
    token1: "BNB",
    startAmountToken0: "2000",
    startAmountToken1: "2000",
    prizeAmountToken0: "50000",
    prizeAmountToken1: "50000",
    timeOfRequest: "2024-12-08T13:05:47",
  },
  {
    requester: "0x3d852569d4f8686504bb84668f3afb3384eae801",
    opponent: "0x0000000000000000000000000000000000000000",
    duration: "6 hours 51 minutes",
    token0: "BNB",
    token1: "ATOM",
    startAmountToken0: "2000",
    startAmountToken1: "2000",
    prizeAmountToken0: "50000",
    prizeAmountToken1: "50000",
    timeOfRequest: "2024-11-15T12:29:52",
  },
  {
    requester: "0xe8ad7bc02a856cf83cd2393b0ffdbde5d27a6a7f",
    opponent: "0x0000000000000000000000000000000000000000",
    duration: "18 hours 49 minutes",
    token0: "OP",
    token1: "UNI",
    startAmountToken0: "2000",
    startAmountToken1: "2000",
    prizeAmountToken0: "50000",
    prizeAmountToken1: "50000",
    timeOfRequest: "2024-12-07T09:21:36",
  },
];

const colorMap: any = {
  BTC: "bg-yellow-400", // Bitcoin
  ETH: "bg-blue-500", // Ethereum
  USDT: "bg-green-500", // Tether
  BNB: "bg-yellow-600", // Binance Coin
  SOL: "bg-teal-500", // Solana
  USDC: "bg-blue-300", // USD Coin
  XRP: "bg-indigo-500", // Ripple
  STETH: "bg-purple-500", // Lido Staked Ether
  TON: "bg-teal-300", // Toncoin
  DOGE: "bg-yellow-500", // Dogecoin
  ADA: "bg-blue-400", // Cardano
  SHIB: "bg-red-400", // Shiba Inu
  DOT: "bg-pink-500", // Polkadot
  LINK: "bg-blue-600", // Chainlink
  SUI: "bg-teal-600", // Sui
  BCH: "bg-green-400", // Bitcoin Cash
  PEPE: "bg-green-600", // Pepe
  LEO: "bg-orange-400", // UNUS SED LEO
  NEAR: "bg-indigo-400", // NEAR Protocol
  LTC: "bg-gray-500", // Litecoin
  UNI: "bg-pink-400", // Uniswap
  APT: "bg-yellow-300", // Aptos
  DAI: "bg-green-300", // Dai
  ICP: "bg-purple-400", // Internet Computer
  HBAR: "bg-blue-200", // Hedera
  CRO: "bg-red-500", // Cronos
  ETC: "bg-green-200", // Ethereum Classic
  POL: "bg-pink-200", // POL (ex-MATIC)
  TAO: "bg-indigo-300", // Bittensor
  RENDER: "bg-orange-500", // Render
  KAS: "bg-yellow-200", // Kaspa
  TIA: "bg-teal-200", // Celestia
  ARB: "bg-blue-700", // Arbitrum
  OM: "bg-purple-200", // MANTRA
  VET: "bg-gray-200", // VeChain
  FET: "bg-purple-300", // FET
  FIL: "bg-blue-100", // Filecoin
  OKB: "bg-orange-600", // OKB
  BONK: "bg-yellow-100", // Bonk
  STX: "bg-teal-100", // Stacks
  ATOM: "bg-blue-800", // Cosmos
  WIF: "bg-green-100", // dogwifhat
  FTM: "bg-purple-100", // Fantom
  INJ: "bg-indigo-100", // Injective
  SEI: "bg-teal-800", // Sei
  XMR: "bg-gray-600", // Monero
  IMX: "bg-green-800", // Immutable
  OP: "bg-red-600", // Optimism
  MNT: "bg-orange-300", // Mantle
  AAVE: "bg-indigo-600", // Aave
  "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707": "bg-orange-100", // token0 for PoC
  "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9": "bg-blue-100", // token1 for PoC
};
