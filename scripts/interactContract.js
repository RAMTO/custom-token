const hre = require('hardhat');
const { ethers } = hre;

async function interactToken() {
  // We get the contract to deploy
  const address = '';
  const Contract = await ethers.getContractFactory('NFToken');
  const contract = await Contract.attach(address);

  console.log('contract', contract);
}

module.exports = interactToken;
