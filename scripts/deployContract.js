const hre = require('hardhat');

async function deployContract(contractName) {
  await hre.run('compile');

  const Contract = await hre.ethers.getContractFactory(contractName);
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log('Contract deployed to:', contract.address);
}

module.exports = deployContract;
