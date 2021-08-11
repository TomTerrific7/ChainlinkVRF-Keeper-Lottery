//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

//imports
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract Lottery is VRFConsumerBase {

  
   mapping(address => uint) paymentRecieved;
   address payable winner;
   address public owner;
   bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
  
   //events
  event PaidWinner(address from, address _winner);
  
  
  constructor () VRFConsumerBase(
            0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B, // VRF Coordinator rinkeby
            0x01BE23585060835E02B77ef475b0Cc51aA1e0709  // LINK Token rinkeby
        ) 
    {
        keyHash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311; //rinkeby
        fee = 0.1 * 10 ** 18; // 0.1 LINK (Varies by network)
    }
  
 function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
    randomResult = (randomness % 100) + 1;
}

   function enterLottery() public payable {
     require (msg.value == 1); 
     revert();
    
       }

    function provideTicket() public {

    }

       function chooseWinner() public  {
         
       }

       function payWinner(address payable _winner) public {
           winner = _winner;
         winner.transfer(address(this).balance);
         emit PaidWinner(msg.sender, _winner);
         
       }
       
       function getBalance() public view returns (uint) {
        return address(this).balance;
        
}

        receive() external payable {
    
}

}
