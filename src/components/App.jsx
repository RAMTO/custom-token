import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal, { setLocal } from 'web3modal';
import '../styles/styles.scss';

/*eslint no-unused-vars: "off"*/
import Counter from './examples/Counter';
import Input from './examples/Input';
import SingleObject from './examples/SingleObject';
import TodoList from './examples/TodoList';
import MultipleObjects from './examples/MultipleObjects';

const marketplaceABI = require('../artifacts/contracts/Marketplace.sol/Marketplace.json');

const App = () => {
  const [provider, setProvider] = useState(null);
  const [userData, setUserData] = useState({});
  const [contract, setContract] = useState(null);
  const [contractData, setContractData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const web3ModalInit = async () => {
      const providerOptions = {};
      const web3Modal = new Web3Modal({
        network: 'rinkeby', // optional
        cacheProvider: true, // optional
        providerOptions, // required
      });

      const instance = await web3Modal.connect();

      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const userAdress = await signer.getAddress();
      const userBalanceBN = await signer.getBalance();
      const userBalance = ethers.utils.formatEther(userBalanceBN.toString());
      const chainId = await signer.getChainId();

      setProvider(provider);
      setUserData({
        userAdress,
        userBalance,
        chainId,
        signer,
      });
    };

    web3ModalInit();
  }, []);

  useEffect(() => {
    const initContract = async () => {
      console.log('userData.signer', userData.signer);
      const marketplace = new ethers.Contract(
        '0x370441703cd617ec3F812170d78bd050F447B583',
        marketplaceABI.abi,
        userData.signer,
      );

      setContract(marketplace);

      const collectionLengthBN = await marketplace.getCollectionLength();
      const collectionLength = Number(collectionLengthBN.toString());

      const collectionsToRender = [];

      for (let i = 1; i <= collectionLength; i++) {
        const collection = await marketplace.Collections(i);
        const { name, description, owner } = collection;

        collectionsToRender.push({
          name,
          description,
          owner,
        });
      }

      setContractData(collectionsToRender);
    };

    provider && userData && initContract();
  }, [provider, userData]);

  const renderUserData = () => (
    <div>
      <p>
        <span className="fw-bold">Address: </span> <span>{userData.userAdress}</span>
      </p>
      <p>
        <span className="fw-bold">Ballance: </span> <span>{userData.userBalance} ETH</span>
      </p>
    </div>
  );

  const renderContractData = () => {
    console.log('contractData', contractData);
  };

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const tx = await contract.createCollection('Test', 'test');
      console.log('tx', tx);
      await tx.wait();
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log('e', e);
    }
  };

  const renderContractForm = () => (
    <button disabled={isLoading} className="btn btn-primary" onClick={() => handleClick()}>
      {isLoading ? 'Loading...' : 'Create collection'}
    </button>
  );

  return (
    <div>
      <h1>React Basics Course 🔥</h1>
      <p>by Martin Dobrev</p>

      <hr />

      <div className="p-3">{provider ? renderUserData() : 'Connecting wallet...'}</div>
      <div className="p-3">{contract ? renderContractData() : 'Fetching contract data...'}</div>
      <div className="p-3">{contract ? renderContractForm() : 'Fetching contract data...'}</div>
    </div>
  );
};

export default App;
