import { NextFunction, Request, Response } from "express";
import Crypto from "../models/crypto";
import { stddev } from "../utils/mathUtils";
import { AppError, HttpCode } from "../core/appError";
import { formatResponse } from "../utils/responseFormatter";

export const getCryptoStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { coin } = req.query;

  try {
    if (!coin) {
      throw new AppError(
        "Coin query parameter is required",
        HttpCode.BAD_REQUEST
      );
    }
    const latestRecord = await Crypto.findOne({ coinId: coin }).sort({
      timestamp: -1,
    });
    if (!latestRecord) {
      throw new AppError(
        "No data found for the given coin",
        HttpCode.NOT_FOUND
      );
    }

    res.status(HttpCode.OK).json(
      formatResponse(
        true,
        {
          price: latestRecord.price,
          marketCap: latestRecord.marketCap,
          "24hChange": latestRecord.hourlyChange,
        },
        "Crypto stats fetched successfully!"
      )
    );
  } catch (error) {
    next(
      error instanceof AppError
        ? error
        : new AppError(
            "Error fetching crypto stats",
            HttpCode.INTERNAL_SERVER_ERROR
          )
    );
  }
};

export const getCryptoDeviation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { coin } = req.query;

  try {
    if (!coin) {
      throw new AppError(
        "Coin query parameter is required",
        HttpCode.BAD_REQUEST
      );
    }
    const records = await Crypto.find({ coinId: coin })
      .sort({ timestamp: -1 })
      .limit(100);
    if (records.length < 2) {
      throw new AppError(
        "Not enough data to calculate deviation",
        HttpCode.BAD_REQUEST
      );
    }

    const prices = records.map((record) => record.price);
    const deviation = stddev(prices);
    res.status(HttpCode.OK).json(formatResponse(true,{ deviation },"Crypto deviation calculated successfully!"));
  } catch (error) {
    next(
      error instanceof AppError
        ? error
        : new AppError(
            "Error calculating deviation",
            HttpCode.INTERNAL_SERVER_ERROR
          )
    );
  }
};
