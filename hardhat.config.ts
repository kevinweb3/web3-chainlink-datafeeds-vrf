import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const PRIVATE_KEY: string = String(process.env.PRIVATE_KEY);

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: 'sepolia',
  networks: {
    hardhat: {
      // forking: {
      //   url: "https://goerli.infura.io/v3/" + process.env.INFURA_API_KEY,
      // }
    },
    localhost: {
      url: 'http://127.0.0.1:7545'
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/" + process.env.ALCHEMY_Sepolia_API_KEY,
      accounts: [PRIVATE_KEY],
    },
    goerli: {
      url: "https://goerli.infura.io/v3/" + process.env.INFURA_API_KEY,
      accounts: [PRIVATE_KEY],
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
      accounts: [PRIVATE_KEY],
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API
  },
  mocha: {
    timeout: 40000
  },
};

export default config;