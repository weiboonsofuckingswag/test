module.exports = {
  networks: {
      development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
     },
  },

  mocha: {},
  compilers: {
    solc: {
      version: "0.8.17"
    }
  }
};
const PrivateKeyProvider = require("@truffle/hdwallet-provider");
const privateKey = "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";
const privateKeyProvider = new PrivateKeyProvider(privateKey, "https://localhost:8545");

