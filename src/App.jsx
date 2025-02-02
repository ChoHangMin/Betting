// App.jsx
import React, { useState, useEffect, useCallback   } from 'react';
import Web3 from 'web3';
import Contracts from './truffle_abis/Vote.json';
import Navbar from './navbar/Navbar.jsx';
import Main from './user/Main.jsx';
import Owner from './owner/Owner.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

function App() {
  const [ownerAddress, setOwnerAddress] = useState('');
  const [account, setAccount] = useState('0x0');
  const [contract, setContract] = useState({});
  const [tokenBalance, setTokenBalance] = useState('0');

  const loadContracts = useCallback(async () => {
    try {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const networkId = await web3.eth.net.getId();
      const contractData = Contracts.networks[networkId];

      if (contractData) {
        const contract = new web3.eth.Contract(Contracts.abi, contractData.address);
        const ownerAddress = await contract.methods.showOwner(account).call();
        const tokenBalance = await contract.methods.balanceOf(account).call();

        setOwnerAddress(ownerAddress);
        setContract(contract);
        setTokenBalance(tokenBalance);
      } else {
        window.alert(
          'Vote contract not deployed to detect network! Please check your metamask network'
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [account]);

  useEffect(() => {
    loadWeb3();
    loadContracts();
  }, [loadContracts, account]);

  async function loadWeb3() {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert('No ethereum browser detected!');
      }
    } catch (error) {
      window.alert(error);
    }
  }
  return (
    <Router>
      <Navbar account={account} tokenBalance={tokenBalance} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                contract={contract}
                account={account}
                tokenBalance={tokenBalance}
              />
            }
          />

          <Route
            path="/owner"
            element={
              <Owner
                ownerAddress={ownerAddress}
                contract={contract}
                account={account}
              />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
