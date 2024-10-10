import dotenv from "dotenv";
import { AppError, HttpCode } from "../core/appError";
dotenv.config();

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price";

export const fetchCryptoData = async (coinIds: string[]): Promise<any> => {
  try {
    const response = await fetch(
      `${COINGECKO_API_URL}?ids=${coinIds.join(
        ","
      )}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
    );
    if (!response.ok) {
      throw new AppError('Failed to fetch data from CoinGecko', HttpCode.INTERNAL_SERVER_ERROR);
    }
    return response.json();
  } catch (error) {
    throw new AppError(`Service error: ${(error as Error).message}`, HttpCode.INTERNAL_SERVER_ERROR);
  }
};
