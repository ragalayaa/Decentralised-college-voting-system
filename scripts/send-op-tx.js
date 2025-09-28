const { ethers, network } = require("hardhat");

async function main() {
  console.log("🌐 Network:", network.name);

  // Get first signer
  const [sender] = await ethers.getSigners();
  console.log("👤 Sender account:", sender.address);

  // Send 1 wei to itself
  console.log("💸 Sending 1 wei to self...");
  const tx = await sender.sendTransaction({
    to: sender.address,
    value: 1n, // 1 wei
  });

  await tx.wait();
  console.log("✅ Transaction sent successfully. Hash:", tx.hash);
}

main().catch((err) => {
  console.error("❌ Script failed:", err);
  process.exitCode = 1;
});
