import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal, { setLocal } from 'web3modal';
const md5 = require('md5');

function Header() {
  const [provider, setProvider] = useState(null);
  const [userData, setUserData] = useState({});
  const [fetchingData, setFetchingData] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  function truncate(str, n) {
    return str.length > n
      ? str.substr(0, n - 1) + '...' + str.substr(str.length - 4, str.length - 1)
      : str;
  }

  useEffect(() => {
    const web3ModalInit = async () => {
      setFetchingData(true);

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

      setFetchingData(false);
      setDataFetched(true);
    };

    web3ModalInit();
  }, []);

  console.log('userData', userData);

  const renderUserData = () => (
    <div>
      <p className="d-flex align-items-center justify-content-end">
        <img
          className="img-profile me-2"
          src={`https://www.gravatar.com/avatar/${md5(userData.userAdress)}/?d=identicon`}
          alt=""
        />

        <span>{truncate(userData.userAdress, 6)}</span>
      </p>
      <p>
        <span>{Number(userData.userBalance).toFixed(3)} ETH</span>
      </p>
    </div>
  );

  return (
    <div className="container-header d-flex justify-content-between">
      <div></div>
      <div>{dataFetched && !fetchingData ? renderUserData() : 'Connecting wallet...'}</div>
    </div>
  );
}

export default Header;
