import dotenv from "dotenv";
dotenv.config();

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price";

export const fetchCryptoData = async (coinIds: string[]): Promise<any> => {
  const response = await fetch(
    `${COINGECKO_API_URL}?ids=${coinIds.join(
      ","
    )}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data from CoinGecko");
  }
  return response.json();
};
