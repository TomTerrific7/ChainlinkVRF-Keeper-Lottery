const hre = require("hardhat");
require('dotenv').config();
const { ethers } = require("ethers");




async function main() {

  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const contract = await Lottery.deploy();
  await contract.deployed();



  console.log("Lottery deployed to:", contract.address);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });