const { ethers } = require('ethers');
require('dotenv').config();

const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.BLOCKCHAIN_PRIVATE_KEY;

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

module.exports = {
    provider,
    wallet
}