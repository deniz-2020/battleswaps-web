import { useReadContract } from "wagmi";
import abi from "../../abi/BattleswapsHook.json";

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

const useGetBattleRequests = () => {
  const { data, isError, isLoading, error } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_BATTLESWAPS_HOOK_ADDRESS as `0x${string}`,
    functionName: "getAllBattleRequests",
  });

  return { data: (data as BattleRequest[]) ?? [], isError, error, isLoading };
};

export { useGetBattleRequests };
