import { Request, Response } from "express";
import Crypto from "../models/crypto";
import { stddev } from "../utils/mathUtils";

export const getCryptoStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { coin } = req.query;
  if (!coin) {
    res.status(400).json({ error: "Coin query parameter is required" });
  }

  try {
    const latestRecord = await Crypto.findOne({ coinId: coin }).sort({
      timestamp: -1,
    });
    if (!latestRecord) {
      res.status(404).json({ error: "No data found for the given coin" });
      return;
    }

    res.json({
      price: latestRecord.price,
      marketCap: latestRecord.marketCap,
      "24hChange": latestRecord.hourlyChange,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching crypto stats" });
  }
};

export const getCryptoDeviation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { coin } = req.query;
  if (!coin) {
    res.status(400).json({ error: "Coin query parameter is required" });
    return;
  }

  try {
    const records = await Crypto.find({ coinId: coin })
      .sort({ timestamp: -1 })
      .limit(100);
    if (records.length < 2) {
      res.status(400).json({ error: "Not enough data to calculate deviation" });
      return;
    }

    const prices = records.map((record) => record.price);
    const deviation = stddev(prices);
    res.json({ deviation });
  } catch (error) {
    res.status(500).json({ error: "Error calculating deviation" });
  }
};
