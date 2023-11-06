import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const address = deployer.address;
  console.log("获取部署合约账户地址：", address);

    /**
     * Network: Sepolia
     * Aggregator: BTC/USD
     * Address: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
     */
  const addr="0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43";

  const contractFactory = await ethers.getContractFactory("PriceConsumerV3");
  const deployContract = await contractFactory.deploy(addr);

  await deployContract.waitForDeployment();

  const PRICE_FEED_CONTRACT = await deployContract.getAddress();
  console.log("合约部署地址：", PRICE_FEED_CONTRACT);

  deployContract.getChainlinkDataFeedLatestAnswer().then((roundData: any) => {
    // Do something with roundData
    // 返回的BTC/USD 价格
    console.log("Latest Round Data", ethers.formatUnits(roundData, 8))
  })
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
