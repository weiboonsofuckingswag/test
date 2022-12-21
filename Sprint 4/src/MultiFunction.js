const { ethers } = require("hardhat");
const { LoaderOptionsPlugin } = require("webpack");
// For Hardhat
const contract = require("../artifacts/contracts/mapping.sol/Mapping.json");
// Provider
const provider = new ethers.providers.WebSocketProvider("ws://localhost:9545");
// Signer
const signer = new ethers.Wallet("06b91f40bafe25bb97844ca576675d475ad4c197a4acab0f00a7dabf8326d480", provider);
// Contract
const payment = new ethers.Contract("0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0", contract.abi, signer);









async function multiFunction() {
    const clientInfo = require('./clientInformation.js');
    const payment1 = require('./payment.js');
    const retrieve = require('./retrieve.js');
    const prompt = require('prompt-sync')();

    console.log("1. Create client policy");
    console.log("2. Payment");
    console.log("3. Retrieve Policy Information");
    const promptFunction = prompt("Enter the function (1-3) you wish to run: ");

    if (promptFunction == 1) {
        clientInfo.storebesu();
    }
    else if (promptFunction == 2) {
        payment1.paymentrpa();
    }

    else if (promptFunction == 3) {
        retrieve.retrieve();
    }
    else {
        console.log("invalid option, try again.");
    }

}

multiFunction();
