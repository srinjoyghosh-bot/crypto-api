import express from "express";
import {
  getCryptoStats,
  getCryptoDeviation,
} from "../controller/cryptoController";

const router = express.Router();

router.get("/stats", getCryptoStats);
router.get("/deviation", getCryptoDeviation);

export default router;
