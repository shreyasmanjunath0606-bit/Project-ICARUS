// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title IcarusVault
 * @dev Escrow contract for Project Icarus. Donors stake funds, VerifierAgent releases them.
 */
contract IcarusVault {
    address public verifierAgent;
    address public owner;

    struct Escrow {
        uint256 amount;
        address donor;
        bool released;
    }

    mapping(uint256 => Escrow) public escrows;
    uint256 public nextEscrowId;

    event FundsStaked(uint256 id, address donor, uint256 amount);
    event FundsReleased(uint256 id, address to, uint256 amount);

    modifier onlyVerifier() {
        require(msg.sender == verifierAgent, "Only VerifierAgent can release");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor(address _verifierAgent) {
        verifierAgent = _verifierAgent;
        owner = msg.sender;
    }

    function stakeFunds() external payable {
        require(msg.value > 0, "Amount must be > 0");
        escrows[nextEscrowId] = Escrow({
            amount: msg.value,
            donor: msg.sender,
            released: false
        });
        emit FundsStaked(nextEscrowId, msg.sender, msg.value);
        nextEscrowId++;
    }

    function releaseFunds(uint256 id, address payable orphanageTreasury) external onlyVerifier {
        Escrow storage escrow = escrows[id];
        require(!escrow.released, "Already released");
        require(escrow.amount > 0, "No funds in escrow");

        escrow.released = true;
        orphanageTreasury.transfer(escrow.amount);

        emit FundsReleased(id, orphanageTreasury, escrow.amount);
    }

    function setVerifierAgent(address _newAgent) external onlyOwner {
        verifierAgent = _newAgent;
    }
}
