import { artifacts, ethers } from "hardhat";
import counterContractAddress from "./CounterContractaddress.json";

async function main() {
  const [deployer] = await ethers.getSigners();
  const address = deployer.address;
  console.log("获取部署合约的账户地址：", address);

  const artifact = artifacts.readArtifactSync("Counter");
  const provider = new ethers.AlchemyProvider("sepolia", process.env.ALCHEMY_Sepolia_API_KEY);

  const providerContract = new ethers.Contract(
    counterContractAddress.address,
    artifact.abi,
    provider
  );

  const counterVal = await providerContract.counter();
  console.log("The value of counter is :", parseInt(counterVal));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
