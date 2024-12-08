import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import BattleswapsRouterJson from "../../abi/BattleswapsRouter.json";

type Response = {
  token0Address: string;
  token0Name: string;
  token0Currency: string;
  token1Address: string;
  token1Name: string;
  token1Currency: string;
};

const useGetTokensByPoolId = () => {
  const [poolId, setPoolId] = useState<string | null>(null);
  const [data, setData] = useState<Response | undefined>(undefined);

  const { refetch } = useReadContract({
    abi: BattleswapsRouterJson,
    address: process.env
      .NEXT_PUBLIC_BATTLESWAPS_ROUTER_ADDRESS as `0x${string}`,
    functionName: "getTokenDataByPoolId",
    args: poolId ? [poolId] : undefined,
    query: {
      enabled: false,
    },
  });

  useEffect(() => {
    const doFetch = async () => {
      if (poolId) {
        const res = await refetch();
        if (res.data) {
          setData(res.data as Response);
        }
      }
    };

    doFetch();
  }, [poolId]);

  const refetchWithArgs = (newPoolId: string) => {
    setPoolId(newPoolId);
  };

  return { data, refetch: refetchWithArgs };
};

export { useGetTokensByPoolId };
