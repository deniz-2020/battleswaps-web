export const shrinkWalletAddress = (address: string): string => {
  if (typeof address !== "string" || address.length < 8) {
    throw new Error(
      "Invalid address. Must be a string with at least 8 characters."
    );
  }

  const firstPart = address.slice(0, 4); // First 4 characters
  const lastPart = address.slice(-4); // Last 4 characters
  return `${firstPart}....${lastPart}`;
};
