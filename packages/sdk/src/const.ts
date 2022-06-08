import { ethers } from "ethers";

const privateKey: string =
  "0x5ca9a9a0c809cd42c8f7aadf81be4fadeb1c22b34704d8ace68525f288d63288";

const wallet = new ethers.Wallet(privateKey);
const address = wallet.address;

export const GlobalKey = {
  privateKey,
  address,
  wallet,
};
