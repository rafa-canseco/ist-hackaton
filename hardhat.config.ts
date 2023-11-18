import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/" || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan:{
    apiKey: {
      scrollSepolia:'C7594SGNHFCCHANUQGJQAN2FUUDZNFUXU1',
    },
    customChains:[
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls:{
          apiURL :'https://api-sepolia.scrollscan.com/api',
          browserURL:'https://sepolia-blockscout.scroll.io/',
        },
      },
    ],
  },
};

export default config;
