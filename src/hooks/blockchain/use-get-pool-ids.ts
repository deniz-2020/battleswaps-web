import { useReadContract } from "wagmi";
import abi from "../../abi/BattleswapsRouter.json";

const useGetPoolIds = () => {
  const { data, isError, isLoading, error } = useReadContract({
    abi,
    address: process.env
      .NEXT_PUBLIC_BATTLESWAPS_ROUTER_ADDRESS as `0x${string}`,
    functionName: "getAllPoolIds",
  });

  return { data: (data as string[]) ?? [], isError, error, isLoading };
};

export { useGetPoolIds };
