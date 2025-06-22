"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const mintTokens_1 = require("./mintTokens");
const app = (0, express_1.default)();
const HELIUS_RESPONSE = { "accountData": [{ "account": "J8UCWrtBS9jBRV9TdSTizuyGAWqtKNzqY4FMxa3axTu7", "nativeBalanceChange": -1000080000, "tokenBalanceChanges": [] }, { "account": "9aSZyVasS8zccDBHyTuJKwDvLe4hszcm7mnoGPVyXFB5", "nativeBalanceChange": 1000000000, "tokenBalanceChanges": [] }, { "account": "11111111111111111111111111111111", "nativeBalanceChange": 0, "tokenBalanceChanges": [] }, { "account": "ComputeBudget111111111111111111111111111111", "nativeBalanceChange": 0, "tokenBalanceChanges": [] }], "description": "J8UCWrtBS9jBRV9TdSTizuyGAWqtKNzqY4FMxa3axTu7 transferred 1 SOL to 9aSZyVasS8zccDBHyTuJKwDvLe4hszcm7mnoGPVyXFB5.", "events": {}, "fee": 80000, "feePayer": "J8UCWrtBS9jBRV9TdSTizuyGAWqtKNzqY4FMxa3axTu7", "instructions": [{ "accounts": [], "data": "3b1H8Rq1T3d1", "innerInstructions": [], "programId": "ComputeBudget111111111111111111111111111111" }, { "accounts": [], "data": "LKoyXd", "innerInstructions": [], "programId": "ComputeBudget111111111111111111111111111111" }, { "accounts": ["J8UCWrtBS9jBRV9TdSTizuyGAWqtKNzqY4FMxa3axTu7", "9aSZyVasS8zccDBHyTuJKwDvLe4hszcm7mnoGPVyXFB5"], "data": "3Bxs3zzLZLuLQEYX", "innerInstructions": [], "programId": "11111111111111111111111111111111" }], "nativeTransfers": [{ "amount": 1000000000, "fromUserAccount": "J8UCWrtBS9jBRV9TdSTizuyGAWqtKNzqY4FMxa3axTu7", "toUserAccount": "9aSZyVasS8zccDBHyTuJKwDvLe4hszcm7mnoGPVyXFB5" }], "signature": "m6nUxpy5E9JKGBSKFm6NCJrrfRUKYo92vCk3NyyN29Lxaw42w4dKAeaDQzLJBHrdAjtMuFhLnBMtmAhrA74aWKD", "slot": 389167586, "source": "SYSTEM_PROGRAM", "timestamp": 1750510730, "tokenTransfers": [], "transactionError": null, "type": "TRANSFER" };
// notice `nativeTransfers` field
const VAULT = "9aSZyVasS8zccDBHyTuJKwDvLe4hszcm7mnoGPVyXFB5"; // solana devnet account 
app.post('/helius', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const incomingTx = HELIUS_RESPONSE.nativeTransfers.find(x => x.toUserAccount == VAULT);
    if (!incomingTx) {
        res.json({
            message: "No incoming native transfers detected"
        });
        // e make sure you dont return a status code of 403 or 500 or anything else, if you do then Helius will think something is wrong on their side
        return;
    }
    const fromAddress = incomingTx.fromUserAccount;
    const amount = incomingTx.amount;
    yield (0, mintTokens_1.mintTokens)(fromAddress, amount);
    // const fromAddress = req.body.fromAddress;
    // const toAddress = req.body.toAddress;
    // const amount = req.body.amount;
    // const type = "received_native_sol";
    // if (type === "received_native_sol") {
    //     await mintTokens(fromAddress, amount);
    // } else {
    //     // What could go wrong here?
    //     await burnTokens(fromAddress, toAddress, amount);
    //     await sendNativeTokens(fromAddress, toAddress, amount);
    // }
    res.send('Transaction successful');
}));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
