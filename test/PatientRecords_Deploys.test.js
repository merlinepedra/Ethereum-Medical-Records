// const PatientRecords = artifacts.require('PatientRecords')
// import assertRevert from 'zeppelin-solidity/test/helpers/assertRevert'
// import expectThrow from './helpers/expectThrow'
//
// contract('PatientRecords - Contract Deployment', accounts => {
//     let patientRecords
//     const hospitals = [accounts[0], accounts[1]]
//     const patients = [accounts[2], accounts[3]]
//
//     describe('Deploys Correctly', async () => {
//         beforeEach(async () => {
//             patientRecords = await PatientRecords.new(hospitals, patients)
//             assert.ok(patientRecords)
//             assert.equal(await patientRecords.owner.call({from: accounts[1]}), accounts[0])
//         })
//
//         it('Correctly sets hospitals map', async () => {
//             assert.equal(await patientRecords.isHospital(accounts[0]), true)
//             assert.equal(await patientRecords.isHospital(accounts[1]), true)
//
//         })
//
//         it('Correctly sets patients map', async () => {
//             assert.equal(await patientRecords.isPatient(accounts[2]), true)
//             assert.equal(await patientRecords.isPatient(accounts[3]), true)
//
//         })
//
//     context('Fails to deploy with no contstructor arguments', async () => {
//         it('fails to deploy if no arguments are provided', async () => {
//             await expectThrow(PatientRecords.new())
//         })
//     })
//   })
// })
