import {ethers} from 'ethers';
import {providers} from 'ethers';
import {useState} from 'react';
import Lottery from './artifacts/contracts/Lottery.sol/Lottery.json'
import logo from './logo.svg';
import './App.css';
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

// Create a connector
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
  qrcodeModal: QRCodeModal,
});

// Check if connection is already established
if (!connector.connected) {
  // create new session
  connector.createSession();
}

// Subscribe to connection events
connector.on("connect", (error, payload) => {
  if (error) {
    throw error;
  }

  // Get provided accounts and chainId
  const { accounts, chainId } = payload.params[0];
});

//




function App() {

  
  const [contractAccount, setContractAccount] = useState('')
  const [value, setAmount] = useState(0)
  
  
   async function enterLottery() {
    if(typeof window.ethereum !== 'undefined') {
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(0xe8002F99B5488A20ADD947F07b880709BAe65f32, Lottery.abi, signer);
      const transaction = await signer.sendTransaction({
        contractAccount: "0xe8002F99B5488A20ADD947F07b880709BAe65f32",
        setAmount: 1
      
    
    
      });
      

    }
  }




  return (
    <div className="App">L
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        
  
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
