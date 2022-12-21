const { ethers } = require("hardhat");
// For Hardhat
const contract = require("../artifacts/contracts/mapping.sol/Mapping.json");
const contract1 = require("../artifacts/contracts/clientfactory.sol/PolicySmartContract.json");
const contract2 = require("../artifacts/contracts/firebase.sol/FirebaseSystem.json");

// Provider
const provider = new ethers.providers.WebSocketProvider("ws://localhost:9545");
// Signer
const signer = new ethers.Wallet("06b91f40bafe25bb97844ca576675d475ad4c197a4acab0f00a7dabf8326d480", provider);
// Contract
const payment = new ethers.Contract("0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0", contract.abi, signer);
const firebase = new ethers.Contract("0x30753E4A8aad7F8597332E813735Def5dD395028", contract2.abi, signer);


async function paymentrpa() {
      // View Data
      const prompt = require('prompt-sync')();
      const policy = prompt("Input your Policy ID: ");
      const viewId = await payment.getIdview(policy);
      const newClient = new ethers.Contract(viewId, contract1.abi, signer);
      const price = await newClient.getPrice();;
      const premiumPayment = prompt("Please make payment for your Premium costing "+price+" per annum:$")
      const eventId = await payment.getId(policy);
      const receipt = await eventId.wait();
      console.log("Smart Contract Address for Policy Id", policy,"is", viewId );    
      console.log(receipt.events);

      //implement date into payment section so 
      // change status from 0 to 1

      // const date = await newClient.getDate_of_policy();
      // const paymentStatus = await firebase.removeAddressToChangeAddress(0,date, viewId);
      // await paymentStatus.wait();
      // const retrieveResult = await firebase.storeAddressByPaymentStatus(1, date, viewId);
      // await retrieveResult.wait();
      // console.log(retrieveResult, "'s payment status has been updated from 0 to 1.");
    }
  

  module.exports = {
    paymentrpa //inputValues
  }