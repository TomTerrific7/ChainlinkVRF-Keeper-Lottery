const { assert } = require("chai");
const { ethers } = require("hardhat");



describe("Lottery", function () {
  it("Should deploy contract", async function () {
    const Lottery = await ethers.getContractFactory("Lottery");
    const test = await Lottery.deploy();
    await test.deployed();  
  });


});

describe('entering lottery', function () {
  const oneEther = ethers.utils.parseEther("1");
  beforeEach(async () => {
      await ethers.provider.getSigner(0).sendTransaction({ to: contract.address, value: oneEther });
  });
  });
