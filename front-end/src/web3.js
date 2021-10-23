import Web3 from 'web3';

// connect to ethereum account from metamask to web app.
// will get a popup to connect to localhost:3000
window.ethereum.request({ method: "eth_requestAccounts" });
const web3 = new Web3(window.ethereum);

export default web3;