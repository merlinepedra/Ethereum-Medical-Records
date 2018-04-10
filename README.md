# Hospital Network

<div>

[![Build Status](https://travis-ci.org/NFhbar/Ethereum-Medical-Records.png?branch=master)](https://travis-ci.org/NFhbar/Ethereum-Medical-Records)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

</div>

A hospital/patient medical record smart contract on Ethereum.
Built with [Truffle](http://truffleframework.com/) and [zeppelin-solidity](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/ownership/Ownable.sol).

## Requirements
A Medical Record System (contract deployer) keeps records of patient stays, including admission date, discharge date, and visit reason code:

```javascript
struct Records {
    bool providedName;
    string name;
    address patient;
    address hospital;
    uint256 admissionDate;
    uint256 dischargeDate;
    uint256 visitReason;
}
```
Hospitals within the network:

```javascript
mapping (address => bool) public isHospital;
```
Can access these records if and only if a patient provides their name:

```javascript
/// @dev Allows a patient to add their name to the record in the network.
/// @param _recordID ID of the patient specific record.
/// @param _name Name for the patient
function addName(uint256 _recordID, string _name)
    public
    patientExist(msg.sender)
    onlyPatient(_recordID)
    recordExists(_recordID, msg.sender)
    notEmpty(_name)
{
    records[_recordID][msg.sender].providedName = true;
    records[_recordID][msg.sender].name = _name;
    address hostpitalInRecord = records[_recordID][msg.sender].hospital;
    mappingByName[hostpitalInRecord][_name] += 1;

    emit NameAddedToRecords(_recordID, msg.sender);
}
```
After a patient provides their name, Hospitals can access their matching records:

```javascript
function getRecord(uint _recordID, address _patientAddress)
  public
  recordExists(_recordID, _patientAddress)
  patientProvidedName(_recordID, _patientAddress)
  onlyHospital(_recordID, _patientAddress)
  view
```
Hospital can also search by patient name to see how many records they currently have:


## Install
Clone repo:
```
git clone git@github.com:NFhbar/Ethereum-Medical-Records.git
```
then:
```
npm install
```
To enter Truffle:
```
truffle develop
```
To compile:
```
truffle(develop)> compile
```
To migrate:
```
truffle(develop)> migrate
```
To test:
```
truffle(develop)> test
```

## Security Analysis
Security analysis performed using [Mythril](https://github.com/NFhbar/mythril).
Results [here](https://github.com/NFhbar/Ethereum-Medical-Records/blob/master/security/README_MYTHRIL.md).

## Remix

### Constructor Parameters

["0xca35b7d915458ef540ade6068dfe2f44e8fa733c", "0x14723a09acff6d2a60dcdf7aa4aff308fddc160c"],["0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db", "0x583031d1113ad414f02576bd6afabfb302140225", "0xdd870fa1b7c4700f2bd7f44238821c26f7392148"]

### Add Record
1,"0xdd870fa1b7c4700f2bd7f44238821c26f7392148" ,"0xca35b7d915458ef540ade6068dfe2f44e8fa733c",1,2,3

### Check Record
1, "0xdd870fa1b7c4700f2bd7f44238821c26f7392148"
