//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

//imports
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";


contract Lottery is VRFConsumerBase, KeeperCompatibleInterface {

  enum LotteryState {Closed, Open, Calculating}
   
   LotteryState public state;
   address public owner;
   bytes32 internal keyHash;
   uint internal fee;
   uint public randomResult;
   uint  public lotteryID;
   address [] public players;
   uint public winner;
   uint public previousID;
   uint public lastLottery;
   uint startTime;

   //events
  event PaidWinner(address from, address winner);
  event newPlayer(address _player);
  event RequestNumber(bytes32 indexed requestId);
  event newLotteryStarted(uint lotteryID);
 

  modifier isState(LotteryState _state) {
		require(state == _state, "Wrong state");
		_;
  } 


  constructor () VRFConsumerBase(
    0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator rinkeby
    0xa36085F69e2889c224210F603D836748e7dC0088  // LINK Token rinkeby
        ) 
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4; //rinkeby
        fee = 0.1 * 10 ** 18; // 0.1 LINK (Varies by network)
        owner = msg.sender;
        lotteryID = 1;
        previousID = 0;
        
    }
  
  function checkUpkeep(bytes calldata checkData) external override returns (bool upkeepNeeded, bytes memory performData)  {
      
      upkeepNeeded = (lotteryID - 1) == previousID || (block.timestamp >= startTime + 240 seconds && state == LotteryState.Open);
      performData = checkData;
  }

  function performUpkeep(bytes calldata /* performData */) external override {
      if(state == LotteryState.Closed) {
          startNewLottery();
      } else if(state == LotteryState.Open) {
          getRandomNumber();
      }    
              
  }  

  function getRandomNumber() public returns (bytes32 requestId){
    require(state == LotteryState.Open);
    require(LINK.balanceOf(owner) >= fee,"Need more LINK");
    state = LotteryState.Calculating;
    emit RequestNumber(requestId);
    return requestRandomness(keyHash, fee);
    
    }
  
 function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {  
    state = LotteryState.Calculating;
    randomResult = (randomness % players.length);
    winner = randomResult;
    payable(players[winner]).transfer(address(this).balance);
    emit PaidWinner(address(this), players[winner]);
    delete players;
    state= LotteryState.Closed;
    previousID +=1;
    
    }
    
  function startNewLottery() public  {
    require(state == LotteryState.Closed);
     state = LotteryState.Open;
     startTime = block.timestamp;
     lotteryID += 1;
     emit newLotteryStarted(lotteryID);
      
    }
  
    function enterLottery() external payable isState(LotteryState.Open) {
      require (msg.value == .01 ether); 
      players.push(msg.sender);
      emit newPlayer(msg.sender);
 
    }

    function lotteryInfo() public view returns (uint numOfPlayers, uint totalPot, uint currentGameId) {
      numOfPlayers = players.length;
      totalPot = address(this).balance;
      currentGameId = lotteryID;

    }
   

   function getBalance() public view returns (uint) {
     state == LotteryState.Open;
     return address(this).balance;

    }
        receive() external payable {

        }
      }