// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.25 <0.9.0;

contract FirebaseSystem{
    // payment status key => value ( date key => address value)
    // payment status 0 = unpaid, 1 = paid, 2 = overdue
    mapping (uint => mapping (string => address[])) addressLookUpByPaymentStatus;

    //function to store address
    function storeAddressByPaymentStatus(uint _paymentStatus, string memory _date, address _addr) public{
        addressLookUpByPaymentStatus[_paymentStatus][_date].push(_addr);
    }

    //retrieve all address with the same payment status and date of policy
    function retrieveAddress(uint _paymentStatus, string calldata _date) external view returns(address[] memory){
        address[] memory tempList = new address[](addressLookUpByPaymentStatus[_paymentStatus][_date].length);
        for (uint i = 0; i < addressLookUpByPaymentStatus[_paymentStatus][_date].length; i++){
            tempList[i] = addressLookUpByPaymentStatus[_paymentStatus][_date][i];
        }
        return tempList;
    }

    //retrieve specific address, have to provide address. Used for testing whether address has been stored
    function checkForSpecificAddress(uint _paymentStatus, string calldata _date, address _addr) external view returns(address){
        address tempAddr;
        for (uint i = 0; i < addressLookUpByPaymentStatus[_paymentStatus][_date].length; i++){
            if (_addr == addressLookUpByPaymentStatus[_paymentStatus][_date][i]){
                tempAddr = addressLookUpByPaymentStatus[_paymentStatus][_date][i];
            }
        }
        return tempAddr;
    }

    //remove address in the mapping. Used for updating of payment status.
    function removeAddressToChangeAddress(uint _oldStatus, string memory _date, address _addr) public{
        for (uint i = 0; i < addressLookUpByPaymentStatus[_oldStatus][_date].length; i++){
            if (_addr == addressLookUpByPaymentStatus[_oldStatus][_date][i]){
                delete addressLookUpByPaymentStatus[_oldStatus][_date][i];
            }
        }
    }


    constructor(){
        storeAddressByPaymentStatus(0, "0712", 0x70Eda919278179BA6E546F7EDeaf2383cE41cC4e);
        storeAddressByPaymentStatus(0, "0712", 0xF093C5A67aa483923Ff5AA96D16fCa851F16392D);
        storeAddressByPaymentStatus(0, "0812", 0xF093C5A67aa483923Ff5AA96D16fCa851F16392D);
        storeAddressByPaymentStatus(0, "0812", 0xF093C5A67aa483923Ff5AA96D16fCa851F16392D);
    }
}