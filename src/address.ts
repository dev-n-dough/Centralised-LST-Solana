import { PublicKey } from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

export const PRIVATE_KEY = process.env.PVT_KEY;
export const PUBLIC_KEY = new PublicKey(process.env.PUB_KEY!);
export const TOKEN_MINT_ADDRESS = process.env.MINT_ADDRESS;