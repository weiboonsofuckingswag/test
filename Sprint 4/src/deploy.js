const { ethers } = require("hardhat");

async function main() {
    const Firebase = await ethers.getContractFactory("PolicySmartContract");

    const firebase = await Firebase.deploy();
    console.log("Contract deployed to address:", firebase.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });