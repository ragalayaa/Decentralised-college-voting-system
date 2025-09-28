require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // loads .env from root by default

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: process.env.LOCALHOST_RPC_URL || "http://127.0.0.1:8545",
      accounts: process.env.LOCALHOST_PRIVATE_KEY
        ? [process.env.LOCALHOST_PRIVATE_KEY]
        : [], // now will read correctly from root .env
    },
  },
};
