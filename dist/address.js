"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_MINT_ADDRESS = exports.PUBLIC_KEY = exports.PRIVATE_KEY = void 0;
const web3_js_1 = require("@solana/web3.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PRIVATE_KEY = process.env.PVT_KEY;
exports.PUBLIC_KEY = new web3_js_1.PublicKey(process.env.PUB_KEY);
exports.TOKEN_MINT_ADDRESS = process.env.MINT_ADDRESS;
