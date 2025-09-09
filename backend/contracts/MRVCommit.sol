    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract MRVCommit {
        struct Commit {
            string projectId;
            string jobId;
            string merkleRoot;
            string ipfsCid;
            string verifierSignature;
            string text;
            uint256 timestamp;
            address committer;
        }

        // Mapping from commitId (hash) to Commit struct
        mapping(bytes32 => Commit) public commits;

        // Event emitted when a new commit is stored
        event CommitStored(
            bytes32 indexed commitId,
            string projectId,
            string jobId,
            string merkleRoot,
            string ipfsCid,
            string verifierSignature,
            string text,
            uint256 timestamp,
            address indexed committer
        );

        // Store a new commit
        function storeCommit(
            string memory projectId,
            string memory jobId,
            string memory merkleRoot,
            string memory ipfsCid,
            string memory verifierSignature,
            string memory text
        ) public returns (bytes32) {
            // Generate a unique commitId using keccak256 hash
            bytes32 commitId = keccak256(
                abi.encodePacked(projectId, jobId, merkleRoot, ipfsCid, verifierSignature, block.timestamp, msg.sender)
            );

            // Store the commit
            commits[commitId] = Commit({
                projectId: projectId,
                jobId: jobId,
                merkleRoot: merkleRoot,
                ipfsCid: ipfsCid,
                verifierSignature: verifierSignature,
                text: text,
                timestamp: block.timestamp,
                committer: msg.sender
            });

            emit CommitStored(
                commitId,
                projectId,
                jobId,
                merkleRoot,
                ipfsCid,
                verifierSignature,
                text,
                block.timestamp,
                msg.sender
            );

            return commitId;
        }

        // Retrieve a commit by its commitId
        function getCommit(bytes32 commitId) public view returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            address
        ) {
            Commit memory c = commits[commitId];
            return (
                c.projectId,
                c.jobId,
                c.merkleRoot,
                c.ipfsCid,
                c.verifierSignature,
                c.text,
                c.timestamp,
                c.committer
            );
        }
    }