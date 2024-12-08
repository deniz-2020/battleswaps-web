import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import abi from "../../abi/BattleswapsHook.json";
import { useGetNonce } from "./use-get-nonce";

type AcceptBattleParams = {
  token0: string;
  token1: string;
  requester: string;
};

const useAcceptBattle = () => {
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

  const acceptBattle = async (acceptBattleParams: AcceptBattleParams) => {
    const nonce = await getNonce(userAddress);
    console.log("nonceeeeeee", nonce);
    console.log("acceptBattleParams", acceptBattleParams);
    if (nonce !== null && nonce !== undefined) {
      writeContract({
        address: process.env
          .NEXT_PUBLIC_BATTLESWAPS_HOOK_ADDRESS as `0x${string}`,
        abi,
        functionName: "acceptBattle",
        args: [acceptBattleParams],
        nonce,
        gas: BigInt(3000000),
      });
    }
  };

  return { acceptBattle, isConfirming, isConfirmed, writeError, status };
};

export { useAcceptBattle };
