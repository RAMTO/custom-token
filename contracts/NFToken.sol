// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract NFToken is ERC721URIStorage {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIds;

  enum Status {
    Idle,
    ForSale
  }

  struct MarketItemData {
    Status status;
    uint256 price;
    uint256 collectionId;
  }

  mapping(uint256 => MarketItemData) public marketItemsData;

  uint256[] marketItemsIds;

  constructor() ERC721('NFToken', 'NFT') {}

  function mintItem(
    address _player,
    string memory _tokenURI,
    uint256 _collectionId
  ) public returns (uint256) {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(_player, newItemId);
    _setTokenURI(newItemId, _tokenURI);

    marketItemsIds.push(newItemId);
    marketItemsData[newItemId] = MarketItemData(Status.Idle, 0, _collectionId);

    return newItemId;
  }

  function setPrice(uint256 _price, uint256 _itemId) external {
    marketItemsData[_itemId].price = _price;
    marketItemsData[_itemId].status = Status.ForSale;
  }
}
