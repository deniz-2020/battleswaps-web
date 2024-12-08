import React from "react";

interface TokenProps {
  name: string;
  symbol: string;
  color: string;
}

const Token: React.FC<TokenProps> = ({ name, symbol, color }) => (
  <div
    className={`flex items-center justify-center p-3 rounded-full ${color} w-28 h-28`}
  >
    <div className="text-center">
      <h3 className="font-bold text-base truncate">{name}</h3>
      <p className="text-xs opacity-80">{symbol}</p>
    </div>
  </div>
);

type CryptoTokenPairProps = {
  token0Name?: string;
  token0Currency?: string;
  token1Name?: string;
  token1Currency?: string;
};

export default function CryptoTokenPair({
  token0Name,
  token0Currency,
  token1Name,
  token1Currency,
}: CryptoTokenPairProps) {
  return (
    <div className="flex justify-center">
      <div className="flex items-center space-x-3 mb-2">
        <Token
          name={token0Name ?? ""}
          symbol={token0Currency ?? ""}
          color={
            token0Name
              ? "bg-orange-100 text-orange-600"
              : "bg-slate-100 text-slate-600"
          }
        />
        <div className="text-xl font-bold">/</div>
        <Token
          name={token1Name ?? ""}
          symbol={token1Currency ?? ""}
          color={
            token1Name
              ? "bg-blue-100 text-blue-600"
              : "bg-slate-100 text-slate-600"
          }
        />
      </div>
    </div>
  );
}
