const hre = require('hardhat');

async function deploy() {
  // We get the contract to deploy
  const CustomToken = await hre.ethers.getContractFactory('CustomToken');
  const token = await CustomToken.deploy();

  await token.deployed();

  console.log('Token deployed to:', token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
