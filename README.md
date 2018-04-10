# Hospital Network

<div>

[![Build Status](https://travis-ci.org/NFhbar/Ethereum-Medical-Records.png?branch=master)](https://travis-ci.org/NFhbar/Ethereum-Medical-Records)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

</div>

A hospital/patient medical record smart contract on Ethereum.
Built with [Truffle](http://truffleframework.com/) and [zeppelin-solidity](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/ownership/Ownable.sol).

## Scope
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
After a patient provides their name, hospitals can access their matching records:

```javascript
function getRecord(uint _recordID, address _patientAddress)
  public
  recordExists(_recordID, _patientAddress)
  patientProvidedName(_recordID, _patientAddress)
  onlyHospital(_recordID, _patientAddress)
  view {...}
```
Hospitals can also search by patient name to see how many records they currently have:

```javascript
/// @dev Allows a Hospital to view the number of records for a patient.
/// @param _name Name for the patient
function getRecordByName(string _name)
  public
  hospitalExist(msg.sender)
  view
  returns (uint256 numberOfRecords)
  {
    if (mappingByName[msg.sender][_name] != 0) {
      numberOfRecords = mappingByName[msg.sender][_name];
      return numberOfRecords;
    }
    else
      return 0;
  }
```

Hospitals can also see the number of patients currently staying within a given time range:
```javascript
/// @dev Allows a Hospital to view the number of patients on a given date range.
/// @param from Starting date
/// @param to Ending date
function getCurrentPatients(uint from, uint to)
  public
  hospitalExist(msg.sender)
  view
  returns (uint _numberOfPatients)
{
  uint i;
  _numberOfPatients = 0;
  for(i=0; i<recordCount; i++) {
    if(dateRanges[i].admissionDate >= from && dateRanges[i].dischargeDate <= to)
      _numberOfPatients += 1;
    }
}
```

Since records cannot be accessed until a patient provides their name, and dates are
associated with ethereum addresses, the time range is essentially private since patients
cannot be mapped to their current stay until they provide their name.

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

To test in [Remix](http://remix.ethereum.org/) simply load this [gist](https://gist.github.com/NFhbar/edc04f61aa61af4fd35ea178dd24b4b2).

## Issues/Bugs
### Wrong Contract Address
When migrating
```
Error: Attempting to run transaction which calls a contract function, but recipient address 0x8cdaf0cd259887258bc13a92c0a6da92698644c0 is not a contract address
```
Solution: delete contents of /build/contracts and recompile.

## License
[MIT](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/LICENSE)
