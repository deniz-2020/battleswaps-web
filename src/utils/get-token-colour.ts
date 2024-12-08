export const getTokenColor = (symbol: string) => {
  const colorMap: any = {
    BTC: "bg-yellow-400", // Bitcoin
    ETH: "bg-blue-500", // Ethereum
    USDT: "bg-green-500", // Tether
    BNB: "bg-yellow-600", // Binance Coin
    SOL: "bg-teal-500", // Solana
    USDC: "bg-blue-300", // USD Coin
    XRP: "bg-indigo-500", // Ripple
    STETH: "bg-purple-500", // Lido Staked Ether
    TON: "bg-teal-300", // Toncoin
    DOGE: "bg-yellow-500", // Dogecoin
    ADA: "bg-blue-400", // Cardano
    SHIB: "bg-red-400", // Shiba Inu
    DOT: "bg-pink-500", // Polkadot
    LINK: "bg-blue-600", // Chainlink
    SUI: "bg-teal-600", // Sui
    BCH: "bg-green-400", // Bitcoin Cash
    PEPE: "bg-green-600", // Pepe
    LEO: "bg-orange-400", // UNUS SED LEO
    NEAR: "bg-indigo-400", // NEAR Protocol
    LTC: "bg-gray-500", // Litecoin
    UNI: "bg-pink-400", // Uniswap
    APT: "bg-yellow-300", // Aptos
    DAI: "bg-green-300", // Dai
    ICP: "bg-purple-400", // Internet Computer
    HBAR: "bg-blue-200", // Hedera
    CRO: "bg-red-500", // Cronos
    ETC: "bg-green-200", // Ethereum Classic
    POL: "bg-pink-200", // POL (ex-MATIC)
    TAO: "bg-indigo-300", // Bittensor
    RENDER: "bg-orange-500", // Render
    KAS: "bg-yellow-200", // Kaspa
    TIA: "bg-teal-200", // Celestia
    ARB: "bg-blue-700", // Arbitrum
    OM: "bg-purple-200", // MANTRA
    VET: "bg-gray-200", // VeChain
    FET: "bg-purple-300", // FET
    FIL: "bg-blue-100", // Filecoin
    OKB: "bg-orange-600", // OKB
    BONK: "bg-yellow-100", // Bonk
    STX: "bg-teal-100", // Stacks
    ATOM: "bg-blue-800", // Cosmos
    WIF: "bg-green-100", // dogwifhat
    FTM: "bg-purple-100", // Fantom
    INJ: "bg-indigo-100", // Injective
    SEI: "bg-teal-800", // Sei
    XMR: "bg-gray-600", // Monero
    IMX: "bg-green-800", // Immutable
    OP: "bg-red-600", // Optimism
    MNT: "bg-orange-300", // Mantle
    AAVE: "bg-indigo-600", // Aave
    "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707": "bg-orange-100", // token0 for PoC
    "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9": "bg-blue-100", // token1 for PoC
  };

  console.log("symbol", colorMap[symbol]);

  return colorMap[symbol] || "bg-gray-400"; // Default color if symbol not found
};

export const getTokenCurrency = (tokenAddress: string) => {
  const currencyMap: any = {
    "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707": "TKZ", // token0 for PoC
    "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9": "TKJ", // token1 for PoC
  };

  return currencyMap[tokenAddress] || "---";
};
