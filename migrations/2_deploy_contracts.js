const PatientRecords = artifacts.require('PatientRecords.sol')

// Accounts from Truffle Develop for development purposes
const hospital1 = '0x627306090abab3a6e1400e9345bc60c78a8bef57'
const hospital2 = '0xf17f52151ebef6c7334fad080c5704d77216b732'
const patient1 = '0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef'
const patient2 = '0x821aea9a577a9b44299b9c15c88cf3087f3b5544'

module.exports = function(deployer) {
    deployer.deploy(PatientRecords,[hospital1,hospital2],[patient1,patient2])
}
