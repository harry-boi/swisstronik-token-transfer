const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

/**
 * Send a shielded transaction to the Swisstronik blockchain.
 *
 * @param {object} signer - The signer object for sending the transaction.
 * @param {string} destination - The address of the contract to interact with.
 * @param {string} data - Encoded data for the transaction.
 * @param {number} value - Amount of value to send with the transaction.
 *
 * @returns {Promise} - The transaction object.
 */
const sendShieldedTransaction = async (signer, destination, data, value) => {
  // Get the RPC link from the network configuration
  const rpclink = hre.network.config.url;

  // Encrypt transaction data
  const [encryptedData] = await encryptDataField(rpclink, data);

  // Construct and sign transaction with encrypted data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0x16b7075F1bF8A0674d557E58cE0cEF1aABd09945";

  const [signer] = await hre.ethers.getSigners();
  const recipientAddreess = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1";

  const contractFactory = await hre.ethers.getContractFactory("Soldawg");
  const contract = contractFactory.attach(contractAddress);

  const amount = hre.ethers.parseUnits("1", 18);

  const setMessageTx = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData("transfer", [
      recipientAddreess,
      amount,
    ]),
    0
  );
  await setMessageTx.wait();

  //It should return a TransactionResponse object
  console.log("Transaction Receipt: ", setMessageTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
