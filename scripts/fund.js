require('dotenv').config();
const { ethers } = require("ethers");

// Get LINK token ABI
const { abi } = require('/Users/tomterrific/Chainshot/RussianRoulette/src/artifacts/@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol/LinkTokenInterface.json')

// Set up wallet.
const privateKey = process.env.PRIVATE_KEY;
const infuraEndpoint = process.env.RINKEBY_URL;

const provider = new ethers.providers.JsonRpcProvider(infuraEndpoint, 'rinkeby');
const wallet = new ethers.Wallet(privateKey, provider)

// Get LINK contract
const linkTokenAddress = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709'
const linkContract = new ethers.Contract(linkTokenAddress, abi, wallet);

const to = '0x79169d513cA8E9EfDd8C343C1660f41f49F28ef9'; // this is contract address
const value = ethers.utils.parseEther('10');

async function main() {
  const transferTx = await linkContract.transfer(to, value);
  await transferTx.wait();

  console.log('Transfer tx hash', transferTx.hash);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });