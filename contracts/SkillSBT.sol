// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SkillSBT (ERC-5484)
 * @dev Consensual Soulbound Token for Skill Fragments.
 */
interface IERC5484 {
    enum BurnAuth { IssuerOnly, OwnerOnly, Both, Neither }
    event Issued(address indexed from, address indexed to, uint256 indexed tokenId, BurnAuth burnAuth);
}

contract SkillSBT is ERC721, Ownable, IERC5484 {
    uint256 private _nextTokenId;

    constructor() ERC721("Icarus Skill Fragment", "SKL") Ownable(msg.sender) {}

    function mintSkill(address to, string memory skillName) external onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        // Consensual issuance logic (simplified)
        emit Issued(msg.sender, to, tokenId, BurnAuth.Neither);
    }

    // Soulbound logic: Prevent transfers
    function _update(address to, uint256 tokenId, address auth) internal virtual override returns (address) {
        address from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0)) {
            revert("Soulbound: Transfer not allowed");
        }
        return super._update(to, tokenId, auth);
    }
}
