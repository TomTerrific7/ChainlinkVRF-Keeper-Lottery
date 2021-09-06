import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
const providerOptions = {
  portis: {
    package: Portis, 
    options: {
      id: "4ae59703-f6d5-49cd-a727-5145998c55cd"
    }
  },
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "INFURA_ID" // required
    }
  },
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: "FORTMATIC_KEY" // required
    }
  }
};

export default providerOptions;