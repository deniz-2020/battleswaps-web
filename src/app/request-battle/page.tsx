"use client";

import { ethers, toBigInt } from "ethers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Button } from "@/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";
import { useToast } from "@/hooks/use-toast";
import { SelectInput, SelectInputItem } from "@/components/select-input";
import { useGetPoolIds } from "@/hooks/blockchain/use-get-pool-ids";
import { useEffect, useState } from "react";
import { useGetTokensByPoolId } from "@/hooks/blockchain/use-get-tokens-by-pool-id";
import CryptoTokenPair from "@/components/crypto-token-pair";
import { useRequestBattle } from "@/hooks/blockchain/use-request-battle";

const formSchema = z.object({
  poolId: z.string().min(1, "Pool ID is required"),
  prizePotShareToken0: z
    .string()
    .min(1, "Prize pot share for Token 0 is required"),
  prizePotShareToken1: z
    .string()
    .min(1, "Prize pot share for Token 1 is required"),
  duration: z.string().min(1, "Duration is required"),
  startBalanceToken0: z
    .string()
    .min(1, "Start balance for Token 0 is required"),
  startBalanceToken1: z
    .string()
    .min(1, "Start balance for Token 1 is required"),
  opponent: z.string(),
});

export default function RequestBattle() {
  const { data: poolIds } = useGetPoolIds();
  const { data: tokensByPoolId, refetch: tokensByPoolIdRefetch } =
    useGetTokensByPoolId();
  const {
    requestBattle,
    writeError: requestBattleError,
    status: requestBattleStatus,
  } = useRequestBattle();

  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      poolId: "",
      prizePotShareToken0: "",
      prizePotShareToken1: "",
      duration: "",
      startBalanceToken0: "",
      startBalanceToken1: "",
      opponent: "",
    },
  });

  const [token0Name, setToken0Name] = useState<string>("Token 0");
  const [token1Name, setToken1Name] = useState<string>("Token 1");

  const [token0Currency, setToken0Currency] = useState<string>("TK0");
  const [token1Currency, setToken1Currency] = useState<string>("TK1");

  useEffect(() => {
    if (tokensByPoolId) {
      setToken0Name(tokensByPoolId.token0Name);
      setToken0Currency(tokensByPoolId.token0Currency);
      setToken1Name(tokensByPoolId.token1Name);
      setToken1Currency(tokensByPoolId.token1Currency);
    }
  }, [tokensByPoolId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const params = {
      prizePotShareToken0: toBigInt(values.prizePotShareToken0),
      prizePotShareToken1: toBigInt(values.prizePotShareToken1),
      duration: toBigInt(values.duration),
      token0: tokensByPoolId?.token0Address ?? "0x",
      token1: tokensByPoolId?.token1Address ?? "0x",
      startBalanceToken0: toBigInt(values.startBalanceToken0),
      startBalanceToken1: toBigInt(values.startBalanceToken1),
      opponent:
        values.opponent.length > 0
          ? values.opponent
          : "0x0000000000000000000000000000000000000000",
    };
    await requestBattle(params);
  };

  useEffect(() => {
    if (requestBattleStatus === "success") {
      // TODO: Small UI bug where errors still show success toaster
      toast({
        title: "Battle requested",
        description:
          "You have successfully requested a battle. Please wait until another trader accepts.",
        className: "text-zinc-50 bg-slate-700",
        duration: Infinity,
      });
      router.push("/open-battles");
    } else if (requestBattleStatus === "error") {
      toast({
        title: "Failed to request battle",
        description: requestBattleError?.message,
        className: "text-neutral-50 bg-red-600",
        duration: Infinity,
      });
    }
  }, [requestBattleStatus]);

  const selecterItems: SelectInputItem[] = poolIds.map((poolId) => {
    return { value: poolId, text: poolId };
  });

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Request a Battle</h1>
      <CryptoTokenPair
        token0Name={tokensByPoolId ? token0Name : undefined}
        token0Currency={tokensByPoolId ? token0Currency : undefined}
        token1Name={tokensByPoolId ? token1Name : undefined}
        token1Currency={tokensByPoolId ? token1Currency : undefined}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="poolId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pool</FormLabel>
                <FormControl>
                  <SelectInput
                    items={selecterItems}
                    placeholder="-"
                    onChange={field.onChange}
                    callback={(newValue) => {
                      tokensByPoolIdRefetch(newValue);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The pool in which the trades will happen
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  The duration of the battle (in seconds)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="opponent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opponent Address (optional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  The Ethereum address of your opponent (if this is provided,
                  other addresses cannot accept this battle)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <h2 className="text-xl font-semibold mb-4">Start balances</h2>
          <FormField
            control={form.control}
            name="startBalanceToken0"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Start Balance {token0Name} ({token0Currency})
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>In wei</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startBalanceToken1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Start Balance {token1Name} ({token1Currency})
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>In wei</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <h2 className="text-xl font-semibold mb-4">Prize</h2>
          <FormField
            control={form.control}
            name="prizePotShareToken0"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prize Pot Share {token0Name}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>In wei</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prizePotShareToken1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prize Pot Share {token1Name}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>In wei</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={requestBattleStatus === "pending"}>
            {requestBattleStatus === "pending"
              ? "Please approve transaction in your MetaMask wallet"
              : "Submit Battle Request"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
