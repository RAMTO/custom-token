const hre = require('hardhat');

async function deployWallet() {
  const Contract = await hre.ethers.getContractFactory('EtherWallet');
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log('Contract deployed to:', contract.address);
}

deployWallet()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
