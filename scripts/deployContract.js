const hre = require('hardhat');

async function deploy() {
  // We get the contract to deploy
  const Contract = await hre.ethers.getContractFactory('Marketplace');
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log('Contract deployed to:', contract.address);
}

deploy()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
