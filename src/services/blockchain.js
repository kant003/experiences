import {ethers} from 'ethers';
import KenkToken from '../artifacts/contracts/Kenk.sol/KenkToken.json';

/*
 * PRODUCTION: Change tokenAddress to TestNet or MainNet contract address
 * DEVELOPMENT: Change tokenAddress to your localhost net contract address
 */
const tokenAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const tokenContract = KenkToken;

export const parseTokens = number => {
  return ethers.utils.formatEther(number);
};

export const getTokenBalance = async () => {
  const [account] = await window.ethereum.request({method: 'eth_requestAccounts'});
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(tokenAddress, tokenContract.abi, provider);
  return await contract.balanceOf(account);
};

export const giveTokenToUser = async () => {
  const [account] = await window.ethereum.request({method: 'eth_requestAccounts'});
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(tokenAddress, tokenContract.abi, signer);
  contract.giveTokenToUser(account[0]);
};
