import { ethers } from "hardhat";
require('dotenv').config();

const subscriptionId = String(process.env.SubscriptionId);

async function main() {
  const [deployer] = await ethers.getSigners();
  const address = deployer.address;
  console.log("获取部署合约账户地址：", address);

  const contractFactory = await ethers.getContractFactory("VRFv2Consumer");
  const deployContract = await contractFactory.deploy(subscriptionId);

  await deployContract.waitForDeployment();

  const contractAddress = await deployContract.getAddress();
  console.log("合约部署地址：", contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
