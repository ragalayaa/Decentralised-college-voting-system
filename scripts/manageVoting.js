const { ethers } = require("hardhat");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

let votingContract = null; // Global reference to contract
let signer = null; // Global signer

async function deploy() {
  [signer] = await ethers.getSigners();
  console.log("Deploying from account:", signer.address);

  const VotingFactory = await ethers.getContractFactory("Voting");
  const voting = await VotingFactory.connect(signer);
  const deployed = await voting.deploy();
  await deployed.waitForDeployment?.(); // Hardhat 3.x optional

  console.log("✅ Voting contract deployed at:", deployed.target);
  votingContract = deployed;
}

async function attach() {
  const address = await ask("Enter deployed contract address: ");
  [signer] = await ethers.getSigners();

  const VotingFactory = await ethers.getContractFactory("Voting");
  votingContract = new ethers.Contract(address, VotingFactory.interface, signer);

  console.log("✅ Attached to contract at:", address);
}

async function addCandidate() {
  if (!votingContract) return console.log("❌ Attach or deploy a contract first.");
  const name = await ask("Enter candidate name: ");
  const tx = await votingContract.addCandidate(name);
  await tx.wait();
  console.log(`✅ Candidate "${name}" added successfully.`);
}

async function vote() {
  if (!votingContract) return console.log("❌ Attach or deploy a contract first.");
  const id = await ask("Enter candidate ID to vote for: ");
  const tx = await votingContract.vote(id);
  await tx.wait();
  console.log(`✅ Voted for candidate ID: ${id}`);
}

async function checkVotes() {
  if (!votingContract) return console.log("❌ Attach or deploy a contract first.");
  const id = await ask("Enter candidate ID to check votes: ");
  const count = await votingContract.getVotes(id);
  console.log(`🗳️ Candidate ID ${id} has ${count.toString()} votes.`);
}

async function main() {
  console.log("=== Voting Contract Manager ===");

  while (true) {
    const action = (await ask("Choose action: deploy / attach / add / vote / check / exit: ")).trim().toLowerCase();

    try {
      switch (action) {
        case "deploy":
          await deploy();
          break;
        case "attach":
          await attach();
          break;
        case "add":
          await addCandidate();
          break;
        case "vote":
          await vote();
          break;
        case "check":
          await checkVotes();
          break;
        case "exit":
          rl.close();
          return;
        default:
          console.log("❌ Invalid action. Try again.");
      }
    } catch (err) {
      console.error("❌ Error:", err.message || err);
    }
  }
}

main();
