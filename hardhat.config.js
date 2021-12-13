require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
//require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");




module.exports = {
  solidity: "0.8.0",
  paths: {
    artifacts: './src/artifacts',
  },
  etherscan: {
    apiKey:process.env.ETHERSCAN_KEY
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    
    kovan: {
      url: process.env.KOVAN_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
    
  }

};