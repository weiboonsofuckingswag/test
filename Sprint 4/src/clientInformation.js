const clientDataInput = require('./clientDataInput.js');

const { ethers } = require("hardhat");
// For Hardhat
const contract = require("../artifacts/contracts/ClientFactory.sol/SmartContractFactory.json");
// Provider
const provider = new ethers.providers.WebSocketProvider("ws://localhost:9545");
// Signer
const signer = new ethers.Wallet("06b91f40bafe25bb97844ca576675d475ad4c197a4acab0f00a7dabf8326d480", provider);

// Contract

const client = new ethers.Contract("0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da", contract.abi, signer);
const contract2 = require("../artifacts/contracts/mapping.sol/Mapping.json");
const { cli } = require('webpack');

const payment = new ethers.Contract("0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0", contract2.abi, signer);

async function storebesu() {
  
  const data = clientDataInput.input();

  // Wait for all of the Client Information to be stored
  const txc = await client.update(data.emailAddress, data.policy, data.duration, data.date_of_policy, data.phone, data.name, data.price);
  const receipt = await txc.wait()
  console.log(receipt.events);
  

  
}


module.exports = {
  storebesu //inputValues
}