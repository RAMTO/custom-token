// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Counters.sol';

import 'hardhat/console.sol';

contract Marketplace {
  using Counters for Counters.Counter;

  Counters.Counter private _collectionId;

  struct Collection {
    // uint256 id; Is this needed?
    string name;
    string description;
    address payable owner; // Why payable here?
  }

  uint256[] public collectionsIds;

  mapping(uint256 => Collection) public Collections;

  function createCollection(string calldata name, string calldata description) public payable {
    _collectionId.increment(); //Why increment here?

    uint256 collectionId = _collectionId.current();

    collectionsIds.push(collectionId);

    Collections[collectionId] = Collection(name, description, payable(msg.sender));
  }
}
