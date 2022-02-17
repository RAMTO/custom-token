const hre = require('hardhat');
const { ethers } = hre;

async function interactToken() {
  // We get the contract to deploy
  const address = '';
  const Contract = await ethers.getContractFactory('NFToken');
  const contract = await Contract.attach(address);

  const amount = ethers.utils.parseEther('21000000');
  console.log('contract', contract);
  contract.mint('0x78Ca86e8133Ef9368b4537879Cf2F38fdDbb636B', amount);
}

module.exports = interactToken;
