pragma solidity ^0.8.0;

contract MRVCommit{
    struct Commit{
        string commitId;
        bytes32 projectId;
        string jobId;
        bytes32 merkleRoot;
        string ipfsCid;
        bytes verifierSignature;
        address committer;
        uint256 committedAt;
    }

    mapping(string => Commit) public commits;

    event CommitCreated(
        string commitId,
        bytes32 indexed projectId,
        string jobId,
        bytes32 merkleRoot,
        string ipfsCid,
        bytes verifierSignature,
        address committer,
        uint256 committedAt
    );

    function createCommit(
        string calldata commitId,
        bytes32 projectId,
        string calldata jobId,
        bytes32 merkleRoot,
        string calldata ipfsCid,
        bytes calldata verifierSignature
    ) external {
        require(bytes(commits[commitId].commitId).length == 0, "Commit already exists");
        commits[commitId] = Commit({
            commitId: commitId,
            projectId: projectId,
            jobId: jobId,
            merkleRoot: merkleRoot,
            ipfsCid: ipfsCid,
            verifierSignature: verifierSignature,
            committer: msg.sender,
            committedAt: block.timestamp
        });
        emit CommitCreated(commitId, projectId, jobId, merkleRoot, ipfsCid, verifierSignature, msg.sender, block.timestamp);
    }

    function getCommit(string calldata commitId) external view returns (Commit memory) {
        require(bytes(commits[commitId].commitId).length != 0, "Commit does not exist");
        return commits[commitId];
    }
}