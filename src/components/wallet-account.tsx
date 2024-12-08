import { shrinkWalletAddress } from "@/utils/shrink-wallet-address";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

export function WalletAccount() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && (
        <div className="rounded-sm p-2 bg-slate-200 shadow">
          {ensName
            ? `${ensName} (${shrinkWalletAddress(address)})`
            : shrinkWalletAddress(address)}
          <button className="ml-4" onClick={() => disconnect()}>
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
