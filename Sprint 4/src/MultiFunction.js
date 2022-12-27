const { ethers } = require("hardhat");
const { LoaderOptionsPlugin } = require("webpack");
// For Hardhat
const contract = require("../artifacts/contracts/mapping.sol/Mapping.json");
const contract4 = require("../artifacts/contracts/firebase.sol/FirebaseSystem.json");

// Provider
const provider = new ethers.providers.WebSocketProvider("ws://localhost:9545");
// Signer
const signer = new ethers.Wallet("06b91f40bafe25bb97844ca576675d475ad4c197a4acab0f00a7dabf8326d480", provider);
// Contract
const payment = new ethers.Contract("0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0", contract.abi, signer);
const firebase = new ethers.Contract("0xf204a4Ef082f5c04bB89F7D5E6568B796096735a", contract4.abi, signer);
const rpadaily2 = require('./rpadaily2');









async function multiFunction() {
    const clientInfo = require('./clientInformation.js');
    const payment1 = require('./payment.js');
    const retrieve = require('./retrieve.js');
    const prompt = require('prompt-sync')();

    console.log("1. Create client policy");
    console.log("2. Payment");
    console.log("3. Retrieve Policy Information");
    console.log("4. Retrieve Payment Status with Policy ID")
    const promptFunction = prompt("Enter the function (1-4) you wish to run: ");

    if (promptFunction == 1) {
        clientInfo.storebesu();
                console.log(`The updated time is: ${rpadaily2.updatedtime}`);

    }
    else if (promptFunction == 2) {
        payment1.paymentrpa();
    }

    else if (promptFunction == 3) {
        retrieve.retrieve();
    }
    else if (promptFunction ==4){
        const policyDate = "2311";
        const paymentStatus = 1;
        const prompt = require('prompt-sync')();
        const smartContractAddr = prompt("Enter Policy ID: ");
        const viewId = await payment.getIdview(smartContractAddr);
        const addresscheck = await firebase.checkForSpecificAddress(paymentStatus, policyDate, viewId);
        console.log(smartContractAddr," payment status is: " ,paymentStatus);
        console.log(`The updated time is: ${rpadaily2.updatedtime}`);


            // console.log(smartContractAddr, " date of policy: ", date);
    }
    else {
        console.log("invalid option, try again.");
    }

}

multiFunction();
