const hre = require('hardhat');
const { ethers } = hre;

async function deployToken() {
  await hre.run('compile');

  const initialSupply = ethers.utils.parseEther('21000000000');

  // We get the contract to deploy
  const CustomToken = await hre.ethers.getContractFactory('CustomToken');
  const token = await CustomToken.deploy(initialSupply);

  await token.deployed();

  console.log('Token deployed to:', token.address);
}

module.exports = deployToken;
