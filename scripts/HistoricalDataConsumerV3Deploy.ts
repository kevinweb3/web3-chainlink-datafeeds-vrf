import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const address = deployer.address;
  console.log("获取部署合约账户地址：", address);

     /**
     * Network: Sepolia
     * Aggregator: ETH/USD
     * Address:	0x694AA1769357215DE4FAC081bf1f309aDC325306
     */
  const addr="0x694AA1769357215DE4FAC081bf1f309aDC325306";

  const contractFactory = await ethers.getContractFactory("HistoricalDataConsumerV3");
  const deployContract = await contractFactory.deploy(addr);

  await deployContract.waitForDeployment();

  const PRICE_FEED_CONTRACT = await deployContract.getAddress();
  console.log("合约部署地址：", PRICE_FEED_CONTRACT);

  const validId = BigInt("18446744073709554177")
  deployContract.getHistoricalData(validId).then((historicalRoundData) => {
    // Do something with roundData
    // 返回的ETH/USD 历史数据价格
    console.log("Latest Round Data", ethers.formatUnits(historicalRoundData, 8))
  })
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
