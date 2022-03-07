// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EtherWallet {
  address payable public owner;

  event Deposit(uint256 amount, address sender);
  event Withdraw(uint256 amount);

  constructor() {
    owner = payable(msg.sender);
  }

  modifier onlyOwner() {
    require(msg.sender == owner, 'Only owner can withdraw');
    _;
  }

  receive() external payable {
    emit Deposit(msg.value, msg.sender);
  }

  function withdraw(uint256 _amount) external onlyOwner {
    payable(msg.sender).transfer(_amount);
    emit Withdraw(_amount);
  }

  function getBalance() external view returns (uint256) {
    return address(this).balance;
  }
}
