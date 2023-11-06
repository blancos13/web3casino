import {
  WagmiConfig,
  createConfig,
  configureChains,
  mainnet,
  Chain,
  PublicClient,
} from "wagmi";
import { bsc } from "@wagmi/core/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
//import { createEffect } from 'effector';
import * as Api from "@/shared/api";
import { createEvent, createStore, sample } from "effector";
import { settingsModel } from "../settings";

const RPCS = {
  bsc: ["https://bsc-dataseed1.binance.org/"],
};

// variables
export const $Chains = createStore<any | null>(null);
export const $WagmiConfig = createStore<any | null>(null);

// events
export const queryChains = createEvent();
export const setWagmiConfig = createEvent<any>();

// handlers
$WagmiConfig.on(setWagmiConfig, (_, config) => config);
$Chains.on(Api.getNetworksFx.doneData, (_, payload) => {
  const networks = payload.body as Api.T_Networks;
  console.log("Networks11", JSON.stringify(networks));
  var chains = [];
  var publicClient = [];
  var explorers = new Map<number, string>();

  for (var network of networks.networks.concat([
    {
      basic_info: {
        network_id: 97,
        network_name: "BNB Smart Chain Testnet",
        short_name: "BSC",
        currency_name: "tBNB",
        currency_symbol: "tBNB",
        decimals: 18,
      },
      rpcs: [
        {
          id: 3,
          network_id: 97,
          url: "https://bsc-testnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3",
        },
      ],
      explorers: [
        { id: 3, network_id: 97, url: "https://testnet.bscscan.com/" },
      ],
    },
  ])) {
    if (network.explorers.length == 0) {
      continue;
    }

    const rpcs =
      network.basic_info.network_id == 56
        ? { http: RPCS.bsc }
        : { http: network.rpcs.map((value, _, __) => value.url) };
    chains.push({
      id: network.basic_info.network_id,
      name: network.basic_info.short_name,
      network: network.basic_info.short_name,
      nativeCurrency: {
        decimals: network.basic_info.decimals,
        name: network.basic_info.currency_name,
        symbol: network.basic_info.currency_symbol,
      },
      rpcUrls: {
        public: rpcs,
        default: rpcs,
      },
      blockExplorers: {
        etherscan: { name: "block explorer", url: network.explorers[0].url },
        default: { name: "block explorer", url: network.explorers[0].url },
      },
    } as const satisfies Chain);
    publicClient.push(publicProvider());
    explorers.set(network.basic_info.network_id, network.explorers[0].url);
  }

  settingsModel.setAvailableExplorers(explorers);

  const configuredChains = configureChains(chains, publicClient);

  const config = createConfig({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: "Bicas Casino",
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId: "01e7a60839e8572c2da88e40b1db4893",
          qrModalOptions: {
            themeVariables: {
              "--wcm-z-index": "9999999",
            },
          },
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          name: "Injected",
          shimDisconnect: true,
        },
      }),
    ],
    publicClient: configuredChains.publicClient,
  });

  setWagmiConfig(config);

  return configureChains(chains, publicClient);
});

// logic
sample({
  clock: queryChains,
  target: Api.getNetworksFx,
});
