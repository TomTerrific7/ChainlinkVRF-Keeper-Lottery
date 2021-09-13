const hre = require("hardhat");
require('dotenv').config();
const { ethers } = require("ethers");

// Get LINK token ABI
const { abi } = require('/Users/tomterrific/Chainshot/RussianRoulette/src/artifacts/@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol/LinkTokenInterface.json')
// Set up wallet.
const privateKey = process.env.PRIVATE_KEY;
const alchemyEndpoint = process.env.RINKEBY_URL;

const provider = new ethers.providers.JsonRpcProvider(alchemyEndpoint, 'rinkeby');
const wallet = new ethers.Wallet(privateKey, provider)

// Get LINK contract
const linkTokenAddress = '0x01be23585060835e02b77ef475b0cc51aa1e0709'
const linkContract = new ethers.Contract(linkTokenAddress, abi, wallet);



async function main() {

  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const contract = await Lottery.deploy();
  await contract.deployed();



  console.log("Lottery deployed to:", contract.address);
  const to = await contract.address;
  const value = ethers.utils.parseEther('10');
  const transferTx = await linkContract.transfer(to, value,);
  await transferTx.wait();

  console.log('Transfer tx hash', transferTx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });