// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract BlueCarbonAccessControl is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    bytes32 public constant FIELD_WORKER_ROLE = keccak256("FIELD_WORKER_ROLE");
    bytes32 public constant BUYER_ROLE = keccak256("BUYER_ROLE");

    constructor(address admin) {
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _setupRole(ADMIN_ROLE, admin);
    }

    function addVerifier(address account) public onlyRole(ADMIN_ROLE) {
        grantRole(VERIFIER_ROLE, account);
    }

    function addFieldWorker(address account) public onlyRole(ADMIN_ROLE) {
        grantRole(FIELD_WORKER_ROLE, account);
    }

    function addBuyer(address account) public onlyRole(ADMIN_ROLE) {
        grantRole(BUYER_ROLE, account);
    }

    function removeVerifier(address account) public onlyRole(ADMIN_ROLE) {
        revokeRole(VERIFIER_ROLE, account);
    }

    function removeFieldWorker(address account) public onlyRole(ADMIN_ROLE) {
        revokeRole(FIELD_WORKER_ROLE, account);
    }

    function removeBuyer(address account) public onlyRole(ADMIN_ROLE) {
        revokeRole(BUYER_ROLE, account);
    }
}