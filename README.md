# Hospital Network

<div>

[![Build Status](https://travis-ci.org/NFhbar/Ethereum-Medical-Records.png?branch=master)](https://travis-ci.org/NFhbar/Ethereum-Medical-Records)
[![Coverage Status](https://coveralls.io/repos/github/NFhbar/Ethereum-Medical-Records/badge.svg?branch=master)](https://coveralls.io/github/NFhbar/Ethereum-Medical-Records?branch=master)
[![NSP Status](https://nodesecurity.io/orgs/nicolas-frega/projects/55baa4ae-3179-40b3-841d-a0388baf15b2/badge)](https://nodesecurity.io/orgs/nicolas-frega/projects/55baa4ae-3179-40b3-841d-a0388baf15b2)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/NFhbar/Ethereum-Medical-Records/issues)

</div>

A hospital/patient medical record smart contract on Ethereum.
Built with [Truffle](http://truffleframework.com/) and [zeppelin-solidity](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/ownership/Ownable.sol).

## Install
### ethpm
As [ethpm](https://www.ethpm.com/registry/packages/45):
```
$ truffle install hospital-network@0.0.5
```

### Clone
Clone repo:
```
git clone git@github.com:NFhbar/Ethereum-Medical-Records.git
```

Create a new ```.env``` file in root directory and add your private key:
```
RINKEBY_PRIVATE_KEY="MyPrivateKeyHere..."
```
If you don't have a private key, you can use one provided by Ganache (for development only!):
```
RINKEBY_PRIVATE_KEY="c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3"
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
or
```
npm run test
```

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
    patientNotProvidedName(_recordID, msg.sender)
{
    records[_recordID][msg.sender].providedName = true;
    records[_recordID][msg.sender].name = _name;
    address hostpitalInRecord = records[_recordID][msg.sender].hospital;
    mappingByName[hostpitalInRecord][_name] += 1;

    payPatient(msg.sender);

    emit NameAddedToRecords(_recordID, msg.sender);
}

```

As an incentive to share their name, patients get paid in [tokens](./contracts/SpringToken.sol) when they share their name:
```javascript
/// @dev pays a patient for providing their name.
/// @param _patientAddress to receive tokens.
function payPatient(address _patientAddress)
  private
  notNull(_patientAddress)
{
  patientToken.transfer(_patientAddress, tokenRewardAmount);
  emit PatientPaid(_patientAddress);
}
```

After patients share their name, hospitals can access their matching records:
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

The contract can be [destroyed](./contracts/TokenDestructible.sol) and the remaining token balance is returned to the owner of the contract.

## Docker
Docker image [here](https://hub.docker.com/r/nfhbar/ethereum-medical-records/tags/). Dockerfile [here](https://github.com/NFhbar/Docker-Ethereum-Medical-Records).

## Security Analysis
### Mythril
Security analysis performed using [Mythril](https://github.com/NFhbar/mythril).

Results [here](./security/README_MYTHRIL.md).

### Solidity Coverage
To run [Solidity Coverage reports](https://github.com/sc-forks/solidity-coverage):
```
$ npm run coverage
```
Keep in mind solidity-coverage now expects a globally installed Truffle.

Coverage report available [here](./coverage).

## Remix

To test in [Remix](http://remix.ethereum.org/) simply load this [gist](https://gist.github.com/NFhbar/5394dcb4ee4147abeb25f4fe503549f9).

Parameters for constructor in Remix:
```
["0xca35b7d915458ef540ade6068dfe2f44e8fa733c", "0x14723a09acff6d2a60dcdf7aa4aff308fddc160c"],["0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db", "0x583031d1113ad414f02576bd6afabfb302140225", "0xdd870fa1b7c4700f2bd7f44238821c26f7392148"]
```

## Lint
To fix warnings:
```
$ npm run fix . --ext .js
```
For solium linter:
```
$ solium -d contracts
```

## Issues/Bugs
### Wrong Contract Address
When migrating
```
Error: Attempting to run transaction which calls a contract function, but recipient address 0x8cdaf0cd259887258bc13a92c0a6da92698644c0 is not a contract address
```
Solution: delete contents of /build/contracts and recompile.

### Not Enough Funds during test
When testing in truffle develop
```
Error: sender doesn't have enough funds to send tx.
```
Solution: restart truffle develop.
Notes: truffle does not reset accounts balance on multiple runs.

### Solidity Coverage testrpc ghost process
After running solidity-coverage, testrpc remains a ghost process.
Solution: kill it with:
```
$ npm run stop
```
and run coverage again:
```
$ npm run coverage
```

## License
[MIT](./LICENSE.md)
