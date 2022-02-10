# 🚀 Create and deploy you own custom token!

Creating and deploying you own token has never been easier! With this small and easy to use project you create a custom token, deploy and interact with it!

## 📋 Instructions

Clone this repo in your local machine.

Install the depenedencies:

```
yarn

or

npm install
```

Open `contracts/CustomToken.sol` and change the name and the symbol `("CustomToken", "CTN")` to your preferences.

Compile the contract:

```
npx hardhat compile
```

Create `.env` file or edit `.env.example` and fill the following variables:

```
INFURA_URL=""
WALLET_PRIVATE_KEY=""
ETHERSCAN_API_KEY=""
```

### ❓ How to get `INFURA_URL`?

Go to https://infura.io/ and make a free account.

### ❓ How to get `WALLET_PRIVATE_KEY`?

_Comming soon_

### ❓ How to get `ETHERSCAN_API_KEY`?

Go to https://etherscan.io/ and make a free account.

Deploy the contract (Rinkeby):

```
npx hardhat deployToken --network rinkeby
```

Verify the token:

```
npx hardhat verify --contract "contracts/CustomToken.sol:CustomToken"  --network rinkeby "<DEPLOYED_TOKEN_ADDRESS>"
```

## 🤞 More instructions comming soon...
