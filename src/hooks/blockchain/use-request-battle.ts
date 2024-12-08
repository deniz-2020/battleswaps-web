import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import abi from "../../abi/BattleswapsHook.json";
import { useGetNonce } from "./use-get-nonce";

type RequestBattleParams = {
  prizePotShareToken0: bigint;
  prizePotShareToken1: bigint;
  duration: bigint;
  token0: string;
  token1: string;
  startBalanceToken0: bigint;
  startBalanceToken1: bigint;
  opponent: string;
};

const useRequestBattle = () => {
  const {
    data: hash,
    writeContract,
    status,
    error: writeError,
  } = useWriteContract();
  const { address: userAddress } = useAccount();
  const { getNonce } = useGetNonce();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const requestBattle = async (requestBattleParams: RequestBattleParams) => {
    const nonce = await getNonce(userAddress);
    console.log("nonce", nonce);
    writeContract({
      address: process.env
        .NEXT_PUBLIC_BATTLESWAPS_HOOK_ADDRESS as `0x${string}`,
      abi,
      functionName: "requestBattle",
      args: [requestBattleParams],
      nonce,
      gas: BigInt(3000000),
    });
  };

  return { requestBattle, isConfirming, isConfirmed, writeError, status };
};

export { useRequestBattle };
