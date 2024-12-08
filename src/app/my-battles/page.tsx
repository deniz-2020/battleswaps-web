"use client";

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
import { getTokenColor } from "@/utils/get-token-colour";
import { Battle, useGetBattles } from "@/hooks/blockchain/use-get-battles";
import { useAccount } from "wagmi";
import { formatDuration } from "@/utils/format-duration";

const userIsRequester = (
  battle: Battle,
  userAddress: `0x${string}` | undefined
) => {
  return battle.player0 === userAddress;
};

export default function MyBattles() {
  const { address: userAddress } = useAccount();
  const { data: battles } = useGetBattles();

  const userBattles = battles.filter((battle) => {
    return battle.player0 === userAddress || battle.player1 === userAddress;
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My battles</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Challenger</TableHead>
            <TableHead>Opponent</TableHead>
            <TableHead>Time left until battle ends</TableHead>
            <TableHead>Start amount</TableHead>
            <TableHead>Prize amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {qwe.map((battle, index) => (
            <TableRow key={index} className="pt-8 pb-8">
              <TableCell>
                {userIsRequester(battle, userAddress)
                  ? "You"
                  : shrinkWalletAddress(battle.player0)}
              </TableCell>
              <TableCell>
                {userIsRequester(battle, userAddress)
                  ? shrinkWalletAddress(battle.player1)
                  : "You"}
              </TableCell>
              <TableCell>
                {formatDuration(Number(battle.battleRequest.duration))}
              </TableCell>
              <TableCell>
                <Badge className={`p-2 mb-2`} variant="outline">
                  {battle.battleRequest.startBalanceToken0}{" "}
                  {battle.battleRequest.token0}
                </Badge>
                <br />
                <Badge className={`p-2 mb-2`} variant="outline">
                  {battle.battleRequest.startBalanceToken1}{" "}
                  {battle.battleRequest.token1}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={`p-2 mb-2 ${getTokenColor(
                    battle.battleRequest.token0
                  )} long-shadow`}
                  variant="secondary"
                >
                  {battle.battleRequest.prizePotShareToken0}{" "}
                  {battle.battleRequest.token0}
                </Badge>
                <br />
                <Badge
                  className={`p-2 mb-2 ${getTokenColor(
                    battle.battleRequest.token1
                  )}`}
                  variant="secondary"
                >
                  {battle.battleRequest.prizePotShareToken1}{" "}
                  {battle.battleRequest.token1}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const qwe: Battle[] = [
  {
    player0: "0x1234567890abcdef1234567890abcdef12345678",
    player1: "0xabcdef1234567890abcdef1234567890abcdef12",
    startedAt: 1702032000,
    endsAt: 1702035600,
    player0Token0Balance: 100.5,
    player0Token1Balance: 200.75,
    player1Token0Balance: 150.25,
    player1Token1Balance: 175.5,
    battleRequest: {
      requester: "0x1234567890abcdef1234567890abcdef12345678",
      opponent: "0xabcdef1234567890abcdef1234567890abcdef12",
      prizePotShareToken0: BigInt("10000000"),
      prizePotShareToken1: BigInt("5000000"),
      duration: BigInt("3600"),
      startBalanceToken0: "200000",
      startBalanceToken1: "10000",
      token0: "BTC",
      token1: "ETH",
      timestamp: BigInt("1702028400"),
    },
  },
];
