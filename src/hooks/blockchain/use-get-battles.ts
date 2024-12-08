import { useReadContract } from "wagmi";
import abi from "../../abi/BattleswapsHook.json";
import { BattleRequest } from "./use-get-battle-requests";

export interface Battle {
  player0: string;
  player1: string;
  startedAt: number;
  endsAt: number;
  player0Token0Balance: number;
  player0Token1Balance: number;
  player1Token0Balance: number;
  player1Token1Balance: number;
  battleRequest: BattleRequest;
}

const useGetBattles = () => {
  const { data, isError, isLoading, error } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_BATTLESWAPS_HOOK_ADDRESS as `0x${string}`,
    functionName: "getBattles",
  });

  return { data: (data as Battle[]) ?? [], isError, error, isLoading };
};

export { useGetBattles };
