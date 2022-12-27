const { ethers } = require("hardhat");
const sgMail = require('@sendgrid/mail');
const API_KEY =
  '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';
sgMail.setApiKey(API_KEY)
const date = require('date-and-time');
const fs = require('fs');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where, querySnapshot, setDoc } = require('firebase/firestore');

// For Hardhat
const contract = require("../artifacts/contracts/Alarm.sol/Alarm.json");
console.log(JSON.stringify(contract.abi));
// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network = "goerli", "jJopiviW6VYA5ngL2Z5gX45xhXwVTnRI");
// Signer
const signer = new ethers.Wallet("06b91f40bafe25bb97844ca576675d475ad4c197a4acab0f00a7dabf8326d480", alchemyProvider);
// Contract
const AlarmContract = new ethers.Contract("0xb8FA8b35c479120Aa90692092E728bBdAe98EcC0", contract.abi, signer);
// For Hardhat
const contract1 = require("../artifacts/contracts/clientFactory.sol/SmartContractFactory.json");
const contract2 = require("../artifacts/contracts/mapping.sol/Mapping.json");
const contract3 = require("../artifacts/contracts/clientfactory.sol/PolicySmartContract.json");
const contract4 = require("../artifacts/contracts/firebase.sol/FirebaseSystem.json");
// Provider
const provider = new ethers.providers.WebSocketProvider("ws://localhost:9545");
// Signer
const signer1 = new ethers.Wallet("06b91f40bafe25bb97844ca576675d475ad4c197a4acab0f00a7dabf8326d480", provider);
// Contract
const Client = new ethers.Contract("0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da", contract1.abi, signer1);
const payment = new ethers.Contract("0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0", contract2.abi, signer1);
const firebase = new ethers.Contract("0xf204a4Ef082f5c04bB89F7D5E6568B796096735a", contract4.abi, signer1);

const firebaseConfig = {
  apiKey: "AIzaSyC27lb2SY6jUjohtqRVfzLfdA_cSLyf5ZQ",
  authDomain: "insurance-company-6a7dc.firebaseapp.com",
  projectId: "insurance-company-6a7dc",
  storageBucket: "insurance-company-6a7dc.appspot.com",
  messagingSenderId: "109545137854",
  appId: "1:109545137854:web:aac2d17a343b8ee5f760ef",
  measurementId: "G-58RGKC5X19"
};

// init firebase app
initializeApp(firebaseConfig)

// init services 
const db = getFirestore()

async function incrementPlus() {
  // Call the "Add" function on the AlarmContract and pass in the value you want to increment by
  const transaction = await AlarmContract.Add(1);

  // Wait for the transaction to be mined
  await transaction.wait();

  // Get the updated value of "plus"
  const plus = await AlarmContract.getInput();

  console.log(`plus is now ${plus}`);
}


async function testrpa() {
  abi = ["event Plus(uint plus)"];
  abi = ["event Policy(PolicySmartContract a, string newMessage, string policy, string duration, string date_of_policy, string phone, string name, string price);"];
  abi = ["event Map(address contractAddress"];

  console.log("Waiting for event");

  Client.on('Policy', async (smartContractAddr, email, policyId, duration, date_of_policy, phone, name, price) => {
    console.log("Policy Id:", policyId);
    console.log("Smart Contract Address:", smartContractAddr);
    const txc = await payment.setId(policyId, smartContractAddr);
    await txc.wait();
    const viewId = await payment.getIdview(policyId);
    console.log(viewId, " has successfully been paired with", policyId);
    //Test 1
    const day = date_of_policy.slice(-2);
        const month = date_of_policy.slice(5, 7);
        const formatteddop = day + month;
    const updateStatus = await firebase.storeAddressByPaymentStatus(1, formatteddop, smartContractAddr);
      await updateStatus.wait();
      const result = await firebase.checkForSpecificAddress(1, formatteddop, smartContractAddr);
      console.log(formatteddop, smartContractAddr);
      console.log(result, "'s payment status has been stored as Paid (1).");

    console.log("................");
    const policyDate = new Date(date_of_policy);
    const policyDate1 = date.format(policyDate, 'DDMM');
    const policyDate2 = date.format(policyDate, 'DD/MM/YYYY');
    console.log("Date of Policy:", policyDate2);
    console.log("DDMM =>", policyDate1);
    console.log("................");
    await setDoc(doc(db, '0', 'unpaid', policyDate1, smartContractAddr), {}) // Set to Unpaid
  })
  payment.on('Map', async (smartContractAddr) => {
    const newClient = new ethers.Contract(smartContractAddr, contract3.abi, signer1);
    const getPolicyDate = await newClient.getDate_of_policy();
    const policyDate = new Date(getPolicyDate);
    const policyDate1 = date.format(policyDate, 'DDMM');
    const policyDate2 = date.format(policyDate, 'DD/MM/YYYY');
    console.log("Date of Policy:", policyDate2);
    console.log("DDMM =>", policyDate1);
    console.log("Your payment has successfully been made!");
    console.log("................");
    await setDoc(doc(db, '1', 'paid', policyDate1, smartContractAddr), {}) // Add to Paid
    await deleteDoc(doc(db, '0', 'unpaid', policyDate1, smartContractAddr), {}) // Remove from Unpaid

    //Test 4
    const addresscheck = await firebase.checkForSpecificAddress(0, policyDate1, smartContractAddr);
    if (addresscheck == smartContractAddr) {
      const paymentStatus = await firebase.removeAddressToChangeAddress(0, policyDate1, smartContractAddr);
      await paymentStatus.wait();
      const updateStatus = await firebase.storeAddressByPaymentStatus(1, policyDate1, smartContractAddr);
      await updateStatus.wait();
      const result = await firebase.checkForSpecificAddress(1, policyDate1, smartContractAddr);
      console.log(result, "'s payment status has been updated from Unpaid(0) to Paid(1).");
    }
   
  })


  let now = new Date('2022,10,10');
  const currenttime = date.format(now, 'DD/MM/YYYY');
  console.log("Current Time =", currenttime);
  console.log("..................");
  
  setInterval(incrementPlus, 40000);

  AlarmContract.on('Plus', async (plus) => {
    if (plus != 25) {

      

      const updatedtime = date.addDays(now, 1);
      const then = new Date(updatedtime);
      now = then
      const updatedformattedtime = date.format(now, 'DDMM'); // Updated Time
      console.log("Updated Date =", updatedformattedtime);
      const updatedTimeObject = {
        updatedtime: updatedformattedtime
      };
      module.exports = updatedTimeObject;
      console.log(updatedTimeObject, "hiiiiiiiiiiiiiiiiiiiiiiiiii")

      const newtime = updatedtime;
      // newtime.setDate(updatedtime.getDate() - 1);
      const updatedformattedtime2 = date.format(newtime, 'DDMM'); // Updated Time
      console.log("test 1", updatedformattedtime);
      console.log("test 2", updatedformattedtime2);
      

      //Test 3
      const lengthOfRetrieval2 = await firebase.retrieveAddress(0, updatedformattedtime2.toString());
      console.log(lengthOfRetrieval2);
      for (let i = 0; i < lengthOfRetrieval2.length; i++) {
        const tempAddr2 = lengthOfRetrieval2[i];
        if (tempAddr2 != 0x0000000000000000000000000000000000000000) {
          const status0to2delete = await firebase.removeAddressToChangeAddress(0, updatedformattedtime2.toString(), tempAddr2);
          await status0to2delete.wait();
          const status0to2store = await firebase.storeAddressByPaymentStatus(2, updatedformattedtime2.toString(), tempAddr2);
          await status0to2store.wait();
          const addrUpdateMsg = await firebase.checkForSpecificAddress(2, updatedformattedtime2.toString(), tempAddr2);
          console.log(addrUpdateMsg, "'s payment status has been updated from Unpaid(0) to Overdue(2).");
        }

      }

      //Test 2
      const lengthOfRetrieval = await firebase.retrieveAddress(1, updatedformattedtime2.toString());
      for (let i = 0; i < lengthOfRetrieval.length; i++) {
        const tempAddr = lengthOfRetrieval[i];
        if (tempAddr != 0x0000000000000000000000000000000000000000) {
          const status1to0delete = await firebase.removeAddressToChangeAddress(1, updatedformattedtime2.toString(), tempAddr);
          await status1to0delete.wait();
          const status1to0store = await firebase.storeAddressByPaymentStatus(0, updatedformattedtime2.toString(), tempAddr);
          await status1to0store.wait();
          const addrUpdateMsg = await firebase.checkForSpecificAddress(0, updatedformattedtime2.toString(), tempAddr);
          console.log(addrUpdateMsg, "'s payment status has been updated from Paid(1) to Unpaid(0).");
        }
      }

      //now.setDate(now.getDate() - 1); // Minus 1 Day to the Date 

      const oneMonthLater = date.addMonths(now, 1);
      const notification1 = date.format(oneMonthLater, 'DDMM'); // Buliding Notification 1
      console.log("1st Notification Time =", notification1); // 1 month later

      // Continue Building Notifications 2 - 4

      const twoWeeksLater = date.addDays(now, 14);
      const notification2 = date.format(twoWeeksLater, 'DDMM'); // Building Notification 2
      console.log("2nd Notification Time =", notification2); // 2 weeks later 

      const threeDaysLater = date.addDays(now, 3);
      const notification3 = date.format(threeDaysLater, 'DDMM'); // Building Notification 3
      console.log("3rd Notification Time =", notification3); // 3 days later 

      const sevenDaysBefore = new Date(now.setDate(now.getDate() - 3)); // Building the Overdue Notification
      const overdue = date.format(sevenDaysBefore, 'DDMM'); // 3 days before
      console.log("Overdue Notification Time =", overdue);
      console.log("......................");

      // Add back 3 days to the Updated Time
      now.setDate(now.getDate() + 3);

      const colRef = collection(db, '1', 'paid', updatedformattedtime); // Final Check = Updated Time

      const subscribe = onSnapshot(colRef, async (querySnapshot) => {
        const contractAddress = [];
        querySnapshot.forEach((doc) => {
          contractAddress.push(doc.id);
          console.log(contractAddress);
        });
        for (index = 0; index < contractAddress.length; index++) {
          //await setDoc(doc(db, '0', 'unpaid', updatedformattedtime, contractAddress[index]), {}); // Final Check 
          //await deleteDoc(doc(db, '1', "paid", updatedformattedtime, contractAddress[index]), {}); // Update Paid to Unpaid
          //console.log(contractAddress[index], "has been successfully reset from paid to unpaid");
          console.log("rpaDaily.js payment status has already been set to 0 by default for demo purposes");
        }
      });

      const colRefNoti1 = collection(db, '0', 'unpaid', notification1);
      const colRefNoti2 = collection(db, '0', 'unpaid', notification2);
      const colRefNoti3 = collection(db, '0', 'unpaid', notification3);
      const colRefOverdue = collection(db, '0', 'unpaid', overdue);

      const subscribe1 = onSnapshot(colRefNoti1, async (querySnapshot) => {
        const address1 = [];
        querySnapshot.forEach((doc) => {
          address1.push(doc.id);
        });
        for (index = 0; index < address1.length; index++) {
          console.log(address1[index]);
          const emailClient = new ethers.Contract(address1[index], contract3.abi, signer1);
          const name = await emailClient.getName();
          const price = await emailClient.getPrice();
          const message = {
            to: '112233eeeeeeeeee112233@gmail.com',
            // from: 'ishangill2003@gmail.com',
            from: {
              name: 'Enterprise Insurance Agency',
              email: 'ishangill2003@gmail.com'
            },
            subject: 'Insurance Premium Payment Reminder',
            body: 'Insurance Premium Payment Reminder',
            html: '<h4>Dear ' + name + '<h4/> <br><br> <p>This is your 1st Notification Reminder to inform you that you have yet to pay your insurance premium costing ' + price + ' per annum<p/>'
          };

          sgMail
            .send(message)
            .then((response) => console.log('Email sent...'))
            .catch((error) => console.log(error.message));
        }
      });


      const subscribe2 = onSnapshot(colRefNoti2, async (querySnapshot) => {
        const address2 = [];
        querySnapshot.forEach((doc) => {
          address2.push(doc.id);
        });
        for (index = 0; index < address2.length; index++) {
          console.log(address2[index]);
          const emailClient = new ethers.Contract(address2[index], contract3.abi, signer1);
          const name = await emailClient.getName();
          const price = await emailClient.getPrice();
          const message = {
            to: '112233eeeeeeeeee112233@gmail.com',
            // from: 'ishangill2003@gmail.com',
            from: {
              name: 'Enterprise Insurance Agency',
              email: 'ishangill2003@gmail.com'
            },
            subject: 'Insurance Premium Payment Reminder',
            body: 'Insurance Premium Payment Reminder',
            html: '<h4>Dear ' + name + '<h4/> <br><br> <p>This is your 2nd Notification Reminder to inform you that you have yet to pay your insurance premium costing ' + price + ' per annum<p/>'
          };

          sgMail
            .send(message)
            .then((response) => console.log('Email sent...'))
            .catch((error) => console.log(error.message));
        }
      });

      const subscribe3 = onSnapshot(colRefNoti3, async (querySnapshot) => {
        const address3 = [];
        querySnapshot.forEach((doc) => {
          address3.push(doc.id);
        });
        for (index = 0; index < address3.length; index++) {
          console.log(address3[index]);
          const emailClient = new ethers.Contract(address3[index], contract3.abi, signer1);
          const name = await emailClient.getName();
          const price = await emailClient.getPrice();
          const message = {
            to: '112233eeeeeeeeee112233@gmail.com',
            // from: 'ishangill2003@gmail.com',
            from: {
              name: 'Enterprise Insurance Agency',
              email: 'ishangill2003@gmail.com'
            },
            subject: 'Insurance Premium Payment Reminder',
            body: 'Insurance Premium Payment Reminder',
            html: '<h4>Dear ' + name + '<h4/> <br><br> <p>This is your Final Notification Reminder to inform you that you have yet to pay your insurance premium costing ' + price + ' per annum<p/>'
          };

          sgMail
            .send(message)
            .then((response) => console.log('Email sent...'))
            .catch((error) => console.log(error.message));
        }
      });

      const subscribe4 = onSnapshot(colRefOverdue, async (querySnapshot) => {
        const address4 = [];
        querySnapshot.forEach((doc) => {
          address4.push(doc.id);
        });
        for (index = 0; index < address4.length; index++) {
          console.log(address4[index]);
          const emailClient = new ethers.Contract(address4[index], contract3.abi, signer1);
          const name = await emailClient.getName();
          const price = await emailClient.getPrice();
          const message = {
            to: '112233eeeeeeeeee112233@gmail.com',
            // from: 'ishangill2003@gmail.com',
            from: {
              name: 'Enterprise Insurance Agency',
              email: 'ishangill2003@gmail.com'
            },
            subject: 'Insurance Premium Payment Reminder',
            body: 'Insurance Premium Payment Reminder',
            html: '<h4>Dear ' + name + '<h4/> <br><br> <p> Your Insurance premium costing ' + price + ' per annum has been terminated since payment has not been made! Do Contact our Staff if you are keen on renewing your Insurance Premium.<p/>'
          };

          sgMail
            .send(message)
            .then((response) => console.log('Email sent...'))
            .catch((error) => console.log(error.message));
          await setDoc(doc(db, '-1', 'overdue', overdue, address4[index]), {}); // Overdue Check 
          await deleteDoc(doc(db, '0', "unpaid", overdue, address4[index]), {}); // Update Unpaid to Overdue
          console.log(address4[index], "has been successfully reset from unpaid to overdue");
        }
      });


    };

  });

}

testrpa();





