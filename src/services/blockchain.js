import {ethers} from 'ethers';
import KenkToken from '../artifacts/contracts/Kenk.sol/KenkToken.json';

/*
 * PRODUCTION: Change tokenAddress to TestNet or MainNet contract address
 * DEVELOPMENT: Change tokenAddress to your localhost net contract address 
 */
const tokenAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
const tokenContract = KenkToken;

const getTokenBalance = async () => {
  const [account] = await window.ethereum.request({method: 'eth_requestAccounts'});
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(tokenAddress, tokenContract.abi, provider);
  return await contract.balanceOf(account);
};

const giveTokenToUser = async () => {
  const [account] = await window.ethereum.request({method: 'eth_requestAccounts'});
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(tokenAddress, tokenContract.abi, signer);
  contract.giveTokenToUser(account[0]);
};
