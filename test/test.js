
const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery", function () {
  it("Should deploy contract", async function () {
    const Lottery = await ethers.getContractFactory("Lottery");
    const test = await Lottery.deploy();
    await test.deployed();  
  });

  describe("Owner", function () {
    
    it("Should set the right owner", async function () {
      const [owner] = await ethers.getSigners(); 
    });

    await Lottery.vrfRequest();

  
    
});
});