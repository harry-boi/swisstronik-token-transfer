const hre = require("hardhat");

async function main() {
  /**
   * @dev make sure the first argument has the same name as your contract in the Token.sol file
   * @dev the second argument must be the message we want to set in the contract during the deployment process
   */
  const [deployer] = await hre.ethers.getSigners();
  const contract = await hre.ethers.deployContract("Soldawg", [
    deployer.address,
  ]);

  await contract.waitForDeployment();

  console.log(`ERC token contract deployed to ${contract.target}`);
}

//DEFAULT BY HARDHAT:
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
