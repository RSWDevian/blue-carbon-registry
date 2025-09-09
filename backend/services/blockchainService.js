const { ethers } = require('ethers');
const { provider, wallet } = require('../utils/web3');
const MRVCommitArtifact = require('../artifacts/contracts/MRVCommit.sol/MRVCommit.json');
require('dotenv').config();

class BlockchainService {
    constructor() {
        this.contractAddress = process.env.MRV_COMMIT_CONTRACT_ADDRESS; // Set this after deployment
        this.contract = null;

        if (this.contractAddress) {
            this.contract = new ethers.Contract(
                this.contractAddress,
                MRVCommitArtifact.abi,
                wallet // Use the wallet from web3.js
            );
        }
    }

    // Deploy the contract (run once)
    async deployContract() {
        const factory = new ethers.ContractFactory(
            MRVCommitArtifact.abi,
            MRVCommitArtifact.bytecode,
            wallet // Use the wallet from web3.js
        );
        const contract = await factory.deploy();
        await contract.waitForDeployment();
        const address = await contract.getAddress();
        console.log('MRVCommit contract deployed at:', address);

        this.contractAddress = address;
        this.contract = contract;
        return address;
    }

    // Submit a commit to the blockchain
    async submitMRVCommit(commitData) {
        if (!this.contract) throw new Error('MRVCommit contract not deployed or loaded.');

        // commitData should have: commitId (bytes32), projectId, jobId, merkleRoot, ipfsCid, verifierSignature, text
        const tx = await this.contract.createCommit(
            commitData.commitId,
            commitData.projectId,
            commitData.jobId,
            commitData.merkleRoot,
            commitData.ipfsCid,
            commitData.verifierSignature,
            commitData.text
        );
        const receipt = await tx.wait();
        console.log('Commit submitted! Tx hash:', receipt.hash);
        return receipt;
    }
}

module.exports = new BlockchainService();