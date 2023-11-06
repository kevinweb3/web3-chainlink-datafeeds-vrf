import { ethers } from "hardhat";
import fs from "fs";
require('dotenv').config();

async function main() {
  const [deployer] = await ethers.getSigners();
  const address = deployer.address;
  console.log("获取部署合约账户地址：", address);

  const contractFactory = await ethers.getContractFactory("Counter");
  const deployContract = await contractFactory.deploy(10);

  await deployContract.waitForDeployment();

  const contractAddress = await deployContract.getAddress();
  console.log("合约部署地址：", contractAddress);

  const contractAddressFile = __dirname + "/CounterContractaddress.json";
  fs.writeFileSync(
    contractAddressFile,
    JSON.stringify({ address: contractAddress }, undefined, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
