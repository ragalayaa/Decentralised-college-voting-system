const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners(); 
  if (!deployer) {
    throw new Error("No signer found! Check Hardhat network accounts.");
  }
  console.log("Deploying from account:", deployer.address);

  // Get contract factory
  const Voting = await ethers.getContractFactory("Voting", deployer);

  // Deploy contract
  const voting = await Voting.deploy();

  // Wait for deployment
  await voting.waitForDeployment();

  // Log deployed address
  console.log("Voting contract deployed at:", await voting.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
