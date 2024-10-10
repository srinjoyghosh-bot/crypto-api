import cron from "node-cron";
import { fetchCryptoData } from "../service/coinService";
import Crypto from "../models/crypto";

const coins = ["bitcoin", "matic-network", "ethereum"];

const fetchAndStoreCryptoData = async () => {
  try {
    const data = await fetchCryptoData(coins);
    for (const coinId of coins) {
      if (data[coinId]) {
        const {
          usd: price,
          usd_market_cap: marketCap,
          usd_24h_change: dailyChange,
        } = data[coinId];
        const crypto = new Crypto({ coinId, price, marketCap, dailyChange });
        await crypto.save();
      }
    }
    console.log("Crypto data updated");
  } catch (error) {
    console.error("Error fetching crypto data:", error);
  }
};

export const startCryptoJob = () => {
  cron.schedule("0 */2 * * *", () => {
    fetchAndStoreCryptoData();
  });
};
