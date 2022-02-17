const hre = require('hardhat');

async function deploy() {
  // We get the contract to deploy
  const LMCFactory = await hre.ethers.getContractFactory('LiquidityMiningCampaignFactory');
  const PercentageCalculator = await hre.ethers.getContractFactory('PercentageCalculator');

  const percentageCalculator = await PercentageCalculator.deploy();
  await percentageCalculator.deployed();
  console.log('percentageCalculator deployed to:', percentageCalculator.address);

  const LMCFactoryContract = await LMCFactory.deploy();
  await LMCFactoryContract.deployed();
  console.log('LMCFactoryContract deployed to:', LMCFactoryContract.address);
}

deploy()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
