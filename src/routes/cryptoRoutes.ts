import express from "express";
import {
  getCryptoStats,
  getCryptoDeviation,
} from "../controller/cryptoController";
import { validateRequest,statsValidation, deviationValidation } from '../middleware/validationMiddleware';

const router = express.Router();

router.get("/stats",statsValidation,validateRequest, getCryptoStats);
router.get("/deviation",deviationValidation,validateRequest, getCryptoDeviation);

export default router;
