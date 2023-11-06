import { BigNumberish } from "ethers";
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const address = deployer.address;
  console.log("获取部署合约账户地址：", address);

    
  const addr = "0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf"
  const LINK = "0x514910771AF9Ca656af840dff83E8264EcF986CA"
  const USD = "0x0000000000000000000000000000000000000348"

  const contractFactory = await ethers.getContractFactory("FeedRegistryPriceConsumer");
  const deployContract = await contractFactory.deploy(addr);

  await deployContract.waitForDeployment();

  const PRICE_FEED_CONTRACT = await deployContract.getAddress();
  console.log("合约部署地址：", PRICE_FEED_CONTRACT);

  deployContract.getPrice(LINK, USD).then((roundData: BigNumberish) => {
    // Do something with roundData
    // 使用 Feed 注册表中的价格数据
    console.log("Latest Round Data", roundData)
  })
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
