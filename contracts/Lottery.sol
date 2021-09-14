//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

//imports
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";


contract Lottery is VRFConsumerBase {

  enum LotteryState {Open, Closed, Calculating}
   
   LotteryState public state;
   address public owner;
   bytes32 internal keyHash;
   uint internal fee;
   uint public randomResult;
   uint public lotteryID;
   address [] public players;
   uint public winner;
  
   //events
  event PaidWinner(address from, address winner);
  event newPlayer(address _player);

  modifier isState(LotteryState _state) {
		require(state == _state, "Wrong state");
		_;
  } 
  constructor () VRFConsumerBase(
            0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B, // VRF Coordinator rinkeby
            0x01BE23585060835E02B77ef475b0Cc51aA1e0709  // LINK Token rinkeby
        ) 
    {
        keyHash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311; //rinkeby
        fee = 0.1 * 10 ** 18; // 0.1 LINK (Varies by network)
        lotteryID = 1;
        owner = msg.sender;
    }


   function enterLottery() external payable isState(LotteryState.Open) {
     require (msg.value == 1 wei); 
     players.push(msg.sender);
     emit newPlayer(msg.sender);

    }

  function getRandomNumber() public returns (bytes32 requestId){
    require(LINK.balanceOf(owner) >= fee,"Need more LINK");
    return requestRandomness(keyHash, fee);
    
    }
  
 function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {  
     state = LotteryState.Calculating;
    randomResult = (randomness % players.length);
    winner = randomResult;
    }
    
function payWinner() public {
    require(state == LotteryState.Calculating);
    payable(players[winner]).transfer(address(this).balance);
    emit PaidWinner(address(this), players[winner]);
    delete players;
    state= LotteryState.Closed;
    
}

  function startNewLottery() public {
    require(state == LotteryState.Closed);
    state = LotteryState.Open;
    lotteryID += 1;

    }

   function getBalance() public view returns (uint) {
     return address(this).balance;

    }
        receive() external payable {

        }

}