import '@/styles/globals.css'

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { goerli  } from "wagmi/chains";




const chains = [goerli];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "3b8f4b46b2b098f8e54b504a5690cbd9" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: "3b8f4b46b2b098f8e54b504a5690cbd9",
    version: "1", // or "2"
    appName: "lottery dapp",
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

export default function App({ Component, pageProps }) {
  return (
    <>
    <WagmiConfig client={wagmiClient}>
       <Component {...pageProps} />
       <Web3Modal
        projectId='3b8f4b46b2b098f8e54b504a5690cbd9'
        ethereumClient={ethereumClient}
      />
    </WagmiConfig>   

    </>
  ); 
}
