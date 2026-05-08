// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title OrphanageRegistry
 * @dev Whitelist mapping for authorized orphanage treasuries.
 */
contract OrphanageRegistry {
    mapping(string => address) public registries;
    mapping(address => bool) public isVerified;

    event OrphanageRegistered(string id, address treasury);

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function registerOrphanage(string memory id, address treasury) external {
        require(msg.sender == owner, "Only owner");
        registries[id] = treasury;
        isVerified[treasury] = true;
        emit OrphanageRegistered(id, treasury);
    }
}
