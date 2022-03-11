// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Counters.sol';

import 'hardhat/console.sol';

contract Marketplace {
  using Counters for Counters.Counter;

  Counters.Counter private _collectionId;
  Counters.Counter private _listingId;

  uint256 private constant MARKETPLACE_FEE = 0.025 ether;
  address payable marketplaceOwner;

  struct Collection {
    // uint256 id; Is this needed?
    string name;
    string description;
    address owner;
  }

  struct Listing {
    string name;
    string description;
    uint256 price;
    uint256 collectionId; // Maybe mapping here?
    uint256 status; // Maybe mapping here?
    uint256 bid;
    address payable owner; // Maybe mapping here?
    address nftAddress;
  }

  uint256[] public collectionsIds;
  uint256[] public listingsIds;

  mapping(uint256 => Collection) public Collections;
  mapping(uint256 => Listing) public Listings;
  mapping(uint256 => string) public Status;

  // Events?

  // Modifiers
  // - Check for ownerships
  // - Check for prices
  // - Check for duplications

  constructor() {
    marketplaceOwner = payable(msg.sender);

    Status[0] = 'Not for sale';
    Status[1] = 'For sale';
    Status[2] = 'For bid';
  }

  function createCollection(string calldata name, string calldata description) public payable {
    _collectionId.increment(); //Why increment here?

    uint256 collectionId = _collectionId.current();

    collectionsIds.push(collectionId);

    Collections[collectionId] = Collection(name, description, msg.sender);
  }

  function getCollectionLength() external view returns (uint256) {
    return collectionsIds.length;
  }

  function createListing(
    string calldata name,
    string calldata description,
    uint256 price,
    uint256 collectionId,
    address nftAddress
  ) public payable {
    // Check for price

    // Mint NFT

    _listingId.increment();

    uint256 listingId = _listingId.current();

    listingsIds.push(listingId);

    Listings[listingId] = Listing(
      name,
      description,
      price,
      collectionId,
      1,
      0,
      payable(msg.sender),
      nftAddress
    );
  }

  function getListingLength() external view returns (uint256) {
    return listingsIds.length;
  }

  function setListingStatus(
    uint256 listingId,
    uint256 newStatus,
    uint256 price
  ) external {
    // Check for only ownership

    Listings[listingId].status = newStatus;
    Listings[listingId].price = price;
  }

  function buyListing(uint256 listingId) public payable {
    // nonReentrant

    // Check for ownership

    // Check for price

    // Transfer NFT

    payable(msg.sender).transfer(msg.value);

    // Pay fee

    Listings[listingId].owner = payable(msg.sender); //Why payable here?
    Listings[listingId].status = 0;
  }
}
