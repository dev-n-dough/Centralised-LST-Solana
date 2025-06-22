import { TOKEN_2022_PROGRAM_ID, getOrCreateAssociatedTokenAccount,mintTo } from "@solana/spl-token";
import { Connection,clusterApiUrl,PublicKey, Keypair } from "@solana/web3.js";
import { PRIVATE_KEY, TOKEN_MINT_ADDRESS } from "./address";
import bs58 from "bs58";

const devnet = clusterApiUrl('devnet');
const connection = new Connection(devnet);

const payer = Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY!));
const mint = new PublicKey(TOKEN_MINT_ADDRESS!);

export const mintTokens = async (fromAddress: string, amount: number) => {
    console.log("Minting tokens");

    const sender = new PublicKey(fromAddress!);
    // create ATA for `fromAddress`
    const ata = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        sender,
        false,
        undefined,
        undefined,
        TOKEN_2022_PROGRAM_ID
    );
    console.log("ATA created for user at : " + ata.address.toBase58());

    await mintTo(
        connection,
        payer,
        mint,
        ata.address,
        payer,
        amount,
        undefined,
        undefined,
        TOKEN_2022_PROGRAM_ID
    );
}

export const burnTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    console.log("Burning tokens");
}

export const sendNativeTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    console.log("Sending native tokens");
}