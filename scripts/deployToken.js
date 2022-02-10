const hre = require('hardhat');

async function deployToken() {
  await hre.run('compile');

  // We get the contract to deploy
  const CustomToken = await hre.ethers.getContractFactory('CustomToken');
  const token = await CustomToken.deploy();

  await token.deployed();

  console.log('Token deployed to:', token.address);
}

module.exports = deployToken;
