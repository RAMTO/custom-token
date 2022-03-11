require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task('deployToken', 'Deploys token on a provided network').setAction(
  async (taskArguments, hre, runSuper) => {
    const deployToken = require('./scripts/deployToken');
    await deployToken(taskArguments);
  },
);

task('deployNFT', 'Deploys NFT token on a provided network').setAction(
  async (taskArguments, hre, runSuper) => {
    const deployNFT = require('./scripts/deployNFT');
    await deployNFT(taskArguments);
  },
);

task('deployContract', 'Deploys sample contract on a provided network')
  .addOptionalParam('contractName', 'Name of the contract', 'SampleContract')
  .setAction(async (taskArguments, hre, runSuper) => {
    const { contractName } = taskArguments;
    const deployContract = require('./scripts/deployContract');
    await deployContract(contractName);
  });

task('interact', 'Interact with Contract').setAction(async (taskArguments, hre, runSuper) => {
  const interactContract = require('./scripts/interactContract');
  await interactContract(taskArguments);
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    rinkeby: {
      url: process.env.PROVIDER_URL,
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
