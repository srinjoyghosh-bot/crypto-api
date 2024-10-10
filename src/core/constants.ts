export const CoinIds = {
  BITCOIN: "bitcoin",
  ETHEREUM: "ethereum",
  MATIC: "matic-network",
};

export const getCoinIds = (): string[] => {
  return Object.values(CoinIds);
};
