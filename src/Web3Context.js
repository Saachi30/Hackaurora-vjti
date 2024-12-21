import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';
import contractABI from './contractABI.json'; // Your contract ABI

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const CONTRACT_ADDRESS = "0x4b152Cd78faA86470838e760DB15Fc68c96Eb83C"; // Replace with your deployed contract address

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        // Get provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        
        // Get signer
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        // Create contract instance
        const contractInstance = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractABI,
          signer
        );

        setProvider(provider);
        setSigner(signer);
        setContract(contractInstance);
        setAccount(address);
        setError(null);
        
        return true;
      } else {
        setError("Please install MetaMask!");
        return false;
      }
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Handle account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
          setSigner(null);
          setContract(null);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  const value = {
    provider,
    signer,
    contract,
    account,
    loading,
    error,
    connectWallet
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};