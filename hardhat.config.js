require("@nomicfoundation/hardhat-toolbox");

const fs = require("fs");
const path = require("path");

/** @type import('hardhat/config').HardhatUserConfig */

// Load the private key from `vars.json`

const varsPath = path.join(
  process.env.APPDATA,
  "hardhat-nodejs",
  "Config",
  "vars.json"
);

const vars = JSON.parse(fs.readFileSync(varsPath, "utf8"));
const PRIVATE_KEY = vars.vars.PRIVATE_KEY.value;

console.log("Private Key:", PRIVATE_KEY);

module.exports = {
  solidity: "0.8.27",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/",
      accounts: [`0x` + `${PRIVATE_KEY}`],
    },
  },
};
