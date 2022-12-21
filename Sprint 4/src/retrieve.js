const { ethers } = require("hardhat");
// For Hardhat
const contract = require("../artifacts/contracts/mapping.sol/Mapping.json");
const contract1 = require("../artifacts/contracts/clientFactory.sol/SmartContractFactory.json");
// Provider
const provider = new ethers.providers.WebSocketProvider("ws://localhost:9545");
// Signer
const signer = new ethers.Wallet("06b91f40bafe25bb97844ca576675d475ad4c197a4acab0f00a7dabf8326d480", provider);
// Contract
const payment = new ethers.Contract("0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0", contract.abi, signer);
const Client = new ethers.Contract("0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da", contract1.abi, signer);
  const prompt = require('prompt-sync')();


async function retrieve() {

    const Web3 = require('web3');

    // Initialize Web3 and connect to a local Ethereum node
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

    // The address of the deployed smart contract
    const prompt = require('prompt-sync')();
    const contractAddress = prompt("Enter policy ID first: ");
    const viewId = await payment.getIdview(contractAddress);
    console.log(viewId);
    // abi = ["event Policy(PolicySmartContract a, string newMessage, string policy, string duration, string date_of_policy, string phone, string name, string price);"];

    //
    // Client.on('Policy', async (smartContractAddr, email, policyId, duration, date_of_policy, phone, name, price) => {
    //     console.log(smartContractAddr, "---------------------------------------");
    //     console.log(policyId, "-------------------------------------------");
    // })

    // The ABI of the smart contract
    const abi = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "newMessage",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_policy",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_duration",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_date_of_policy",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_phone",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_price",
                    "type": "string"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "newMessage",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "policy",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "duration",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "date_of_policy",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "phone",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "price",
                    "type": "string"
                }
            ],
            "name": "_updatedMessages",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "date_of_policy",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "duration",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getDate_of_policy",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getDuration",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getEmailAddress",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getName",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getPhone",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getPolicy",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getPrice",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "message",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "phone",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "policy",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "price",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    // Create an instance of the contract using the ABI and contract address
    const contract = new web3.eth.Contract(abi, viewId);

    contract.methods.date_of_policy().call((error, result) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Date of policy: ${result}`);
        }
    });

    // Call the "policy" function of the contract to retrieve the policy
    contract.methods.policy().call((error, result) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Policy: ${result}`);
        }
    });

    // Call the "duration" function of the contract to retrieve the duration
    contract.methods.duration().call((error, result) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Duration: ${result}`);
        }
    });

    // Call the "getEmailAddress" function of the contract to retrieve the email address
    contract.methods.getEmailAddress().call((error, result) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Email address: ${result}`);
        }
    });

    // Call the "getName" function of the contract to retrieve the name
    contract.methods.getName().call((error, result) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Name: ${result}`);
        }
    });

    // Call the "getPhone" function of the contract to retrieve the phone number
    contract.methods.getPhone().call((error, result) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Phone: ${result}`);
        }
    });

    // Call the "getPrice" function of the contract to retrieve the price
    contract.methods.getPrice().call((error, result) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Price: ${result}`);
        }
    });

    
}

module.exports = {
    retrieve //inputValues
  }