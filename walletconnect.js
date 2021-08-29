import WalletConnect from "walletconnect";

//  Create WalletConnect SDK instance
const wc = new WalletConnect();

//  Connect session (triggers QR Code modal)
const connector = await wc.connect();

//  Get your desired provider

const web3Provider = await wc.getWeb3Provider({
  infuraId: "310c4c6ad23941cba0388859c3d2411f",
});

const channelProvider = await wc.getChannelProvider();

const starkwareProvider = await wc.getStarkwareProvider({
  contractAddress: "0x0213A7ceB22C51D53cB60318fE81Eb35F0aD7c02",
});

const threeIdProvider = await wc.getThreeIdProvider();