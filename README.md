# Hospital Network



Built with [Truffle](http://truffleframework.com/) and [zeppelin-solidity](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/ownership/Ownable.sol), deployed to [Rinkeby Test Net](https://rinkeby.etherscan.io/).

Version 0.0.1 - Rinkeby Network
Contract can be found [here](https://rinkeby.etherscan.io/address/0xc2aa2051dc3af60e9a9f79f14d45febc61b2dbb3).
The contract is owned by [owner](https://rinkeby.etherscan.io/address/0x54e3ed065393ee5ea695c84c124dafbbc5955d73).

Add checks for non zero value for remove hoispital and patient
add cost estimates for functions in separate tests

ganache-cli -p 9545 -m 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat'


## Install
Clone repo to local machine, then:
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
Results [here](https://github.com/NFhbar/BIGSmartContract/blob/master/security/README_MYTHRIL.md).

## Remix

### Constructor Parameters

["0xca35b7d915458ef540ade6068dfe2f44e8fa733c", "0x14723a09acff6d2a60dcdf7aa4aff308fddc160c"],["0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db", "0x583031d1113ad414f02576bd6afabfb302140225", "0xdd870fa1b7c4700f2bd7f44238821c26f7392148"]

### Add Record
1,"0xdd870fa1b7c4700f2bd7f44238821c26f7392148" ,"0xca35b7d915458ef540ade6068dfe2f44e8fa733c",1,2,3

### Check Record
1, "0xdd870fa1b7c4700f2bd7f44238821c26f7392148"
