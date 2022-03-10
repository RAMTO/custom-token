const hre = require('hardhat');

async function deployNFT() {
  await hre.run('compile');

  // We get the contract to deploy
  const NFToken = await hre.ethers.getContractFactory('NFToken');
  const token = await NFToken.deploy();

  const addressToMint = '';
  const URILink = '';

  await token.deployed();

  // const tx = await token.mintItem(addressToMint, URILink);

  // await tx.wait();

  console.log('Token deployed to:', token.address);
}

module.exports = deployNFT;
