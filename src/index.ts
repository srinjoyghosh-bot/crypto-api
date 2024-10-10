import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cryptoRoutes from "./routes/cryptoRoutes";
import { startCryptoJob } from "./jobs/cryptoJob";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1", cryptoRoutes);

const port = process.env.PORT ?? 3000;

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    startCryptoJob();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
