import mongoose, { Schema, Document } from "mongoose";

export interface ICrypto extends Document {
  coinId: string;
  price: number;
  marketCap: number;
  dailyChange: number;
  timestamp: Date;
}

const CryptoSchema: Schema = new Schema({
  coinId: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  dailyChange: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<ICrypto>("Crypto", CryptoSchema);
