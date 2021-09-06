const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery", function () {
  it("Should Deploy the Lottery Contract", async function () {
    // set chainlink vrf coordinator address
const vrfCoordinator = "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B"
const linkToken = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709";
const keyHash = "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311";

const linkFee = hre.ethers.utils.parseEther("0.1");

    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    await lottery.deployed();
   
  });

  it('starts in a closed state', async () => {
    assert((await lottery.LotteryState()) == 1);
  });

  it('correctly gets the entrance fee', async () => {
    let entranceFee = await lottery.amount();
    assert.equal(entranceFee.toString());
  });


});
