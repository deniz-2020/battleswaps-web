"use client";

import { Key, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Badge } from "@/components/badge";
import { ScrollArea } from "@/components/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { ArrowUpCircle, ArrowDownCircle, Bitcoin, Coins } from "lucide-react";

// Mock data for demonstration
const battleData = {
  id: "BATTLE-001",
  totalPrize: "10000 USDT",
  startTimestamp: new Date("2023-05-01T00:00:00Z"),
  endTimestamp: new Date("2023-05-02T00:00:00Z"),
  initialBalance: {
    token0: "1000 ETH",
    token1: "10 BTC",
  },
  traders: [
    { address: "0x1234...5678", name: "Trader A" },
    { address: "0xabcd...efgh", name: "Trader B" },
  ],
};

const tradeEvents = [
  {
    timestamp: new Date("2023-05-01T02:30:00Z"),
    trader: "0x1234...5678",
    tokenBought: "BTC",
    amountBought: "0.5",
    tokenSold: "ETH",
    amountSold: "10",
  },
  {
    timestamp: new Date("2023-05-01T03:15:00Z"),
    trader: "0xabcd...efgh",
    tokenBought: "ETH",
    amountBought: "15",
    tokenSold: "BTC",
    amountSold: "0.7",
  },
  {
    timestamp: new Date("2023-05-01T04:45:00Z"),
    trader: "0x1234...5678",
    tokenBought: "ETH",
    amountBought: "8",
    tokenSold: "BTC",
    amountSold: "0.3",
  },
  {
    timestamp: new Date("2023-05-01T05:30:00Z"),
    trader: "0xabcd...efgh",
    tokenBought: "BTC",
    amountBought: "0.4",
    tokenSold: "ETH",
    amountSold: "9",
  },
];

const TokenCounter = ({
  trader,
  token0Amount,
  token1Amount,
}: {
  trader: string;
  token0Amount: string;
  token1Amount: string;
}) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle className="text-sm font-medium">{trader}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex justify-between items-center">
        <span className="flex items-center">
          <Coins className="mr-2 h-5 w-5 text-blue-500" /> {token0Amount} ETH
        </span>
        <span className="flex items-center">
          <Bitcoin className="mr-2 h-5 w-5 text-orange-500" /> {token1Amount}{" "}
          BTC
        </span>
      </div>
    </CardContent>
  </Card>
);

const TradeEvent = ({
  event,
  showTrader = false,
}: {
  event: any;
  showTrader: boolean;
}) => (
  <div
    className={`mb-6 relative pl-6 pb-6 border-l-4 ${
      event.trader === "0x1234...5678" ? "border-blue-200" : "border-green-200"
    } last:pb-0`}
  >
    <div className="flex flex-col space-y-1">
      <Badge variant="outline" className="w-fit">
        {format(event.timestamp, "yyyy-MM-dd HH:mm:ss")}
      </Badge>
      {showTrader && (
        <span
          className={`font-medium ${
            event.trader === "0x1234...5678"
              ? "text-blue-500"
              : "text-green-500"
          }`}
        >
          {event.trader === "0x1234...5678" ? "Trader A" : "Trader B"}
        </span>
      )}
      <div className="flex items-center space-x-2">
        <span
          className={`font-semibold ${
            event.tokenBought === "BTC" ? "text-green-500" : "text-blue-500"
          }`}
        >
          Buy: {event.amountBought} {event.tokenBought}
        </span>
        <span className="text-gray-500">for</span>
        <span
          className={`font-semibold ${
            event.tokenSold === "BTC" ? "text-orange-500" : "text-blue-500"
          }`}
        >
          {event.amountSold} {event.tokenSold}
        </span>
      </div>
    </div>
  </div>
);

const CombinedTimeline = ({ events }: any) => (
  <ScrollArea className="h-[400px] pr-4">
    {events
      .sort((a: any, b: any) => a.timestamp.getTime() - b.timestamp.getTime())
      .map((event: any, index: Key | null | undefined) => (
        <TradeEvent key={index} event={event} showTrader={true} />
      ))}
  </ScrollArea>
);

export default function BattleDetails() {
  const [token0Totals, setToken0Totals] = useState({
    "0x1234...5678": 1000,
    "0xabcd...efgh": 1000,
  });
  const [token1Totals, setToken1Totals] = useState({
    "0x1234...5678": 10,
    "0xabcd...efgh": 10,
  });

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Battle stats</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="mb-2">
                <strong>Battle ID:</strong> {battleData.id}
              </p>
              <p className="mb-2">
                <strong>Total Prize:</strong> {battleData.totalPrize}
              </p>
              <p className="mb-2">
                <strong>Start Time:</strong>{" "}
                {format(battleData.startTimestamp, "yyyy-MM-dd HH:mm:ss")}
              </p>
              <p className="mb-2">
                <strong>End Time:</strong>{" "}
                {format(battleData.endTimestamp, "yyyy-MM-dd HH:mm:ss")}
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong>Initial ETH Balance:</strong>{" "}
                {battleData.initialBalance.token0}
              </p>
              <p className="mb-2">
                <strong>Initial BTC Balance:</strong>{" "}
                {battleData.initialBalance.token1}
              </p>
              <p className="mb-2">
                <strong>Trader A:</strong> {battleData.traders[0].address}
              </p>
              <p className="mb-2">
                <strong>Trader B:</strong> {battleData.traders[1].address}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Current balances</h2>
          {battleData.traders.map((trader) => (
            <TokenCounter
              key={trader.address}
              trader={trader.name}
              token0Amount={token0Totals[trader.address]}
              token1Amount={token1Totals[trader.address]}
            />
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Trade Timeline</h2>
          <Tabs defaultValue="combined">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="combined">Combined</TabsTrigger>
              <TabsTrigger value="trader-a">Trader A</TabsTrigger>
              <TabsTrigger value="trader-b">Trader B</TabsTrigger>
            </TabsList>
            <TabsContent value="combined">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Combined Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <CombinedTimeline events={tradeEvents} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="trader-a">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trader A Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    {tradeEvents
                      .filter((event) => event.trader === "0x1234...5678")
                      .map((event, index) => (
                        <TradeEvent
                          key={index}
                          event={event}
                          showTrader={false}
                        />
                      ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="trader-b">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trader B Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    {tradeEvents
                      .filter((event) => event.trader === "0xabcd...efgh")
                      .map((event, index) => (
                        <TradeEvent
                          key={index}
                          event={event}
                          showTrader={false}
                        />
                      ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
