
const hre = require("hardhat");

async function main() {
  
  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy("Hello, Hardhat!");

  await lottery.deployed();

  console.log("Lottery deployed to:", lottery.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
