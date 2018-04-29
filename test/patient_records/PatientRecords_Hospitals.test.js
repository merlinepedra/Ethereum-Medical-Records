const PatientRecords = artifacts.require('PatientRecords')
import assertRevert from '../helpers/assertRevert'
import utils from '../helpers/utils'

contract('PatientRecords - Hospital and Patient Management', accounts => {
    let patientRecords
    let eventEmitted
    let confirm
    const owner = accounts[0]
    const invalid = '0x0'
    const hospitals = [accounts[0], accounts[1]]
    const patients = [accounts[2], accounts[3]]

    describe('Adding and Removing Hospitals and Patients', async () => {

        beforeEach(async () => {
            patientRecords = await PatientRecords.new(hospitals, patients)
            assert.ok(patientRecords)
            assert.equal(await patientRecords.owner.call({from: accounts[1]}), accounts[0])
        })

        it('Correctly adds a hospital', async () => {
            confirm = await patientRecords.addHospital(accounts[4], { from: owner })
            eventEmitted = utils.getParamFromTxEvent(confirm, 'hospital', null, 'HospitalAddition')
            assert.equal(eventEmitted, accounts[4])
            assert.equal(await patientRecords.isHospital(accounts[4]), true)
        })

        it('Correctly removes a hospital', async () => {
            confirm = await patientRecords.removeHospital(accounts[1], { from: owner })
            eventEmitted = utils.getParamFromTxEvent(confirm, 'hospital', null, 'HospitalRemoval')
            assert.equal(eventEmitted, accounts[1])
            assert.equal(await patientRecords.isHospital(accounts[1]), false)
        })

        it('Correctly adds a patient', async () => {
            confirm = await patientRecords.addPatient(accounts[4], { from: owner })
            eventEmitted = utils.getParamFromTxEvent(confirm, 'patient', null, 'PatientAddition')
            assert.equal(eventEmitted, accounts[4])
            assert.equal(await patientRecords.isPatient(accounts[4]), true)
        })

        it('Correctly removes a patient', async () => {
            confirm = await patientRecords.removePatient(accounts[2], { from: owner })
            eventEmitted = utils.getParamFromTxEvent(confirm, 'patient', null, 'PatientRemoval')
            assert.equal(eventEmitted, accounts[2])
            assert.equal(await patientRecords.isPatient(accounts[2]), false)
        })

        it('Fails to add hospital/patient if already in network', async () => {
            await assertRevert(patientRecords.addHospital(accounts[0], { from: owner }))
            await assertRevert(patientRecords.addPatient(accounts[2], { from: owner }))
        })

        it('Fails to add/remove hospital/patient if not owner', async () => {
            await assertRevert(patientRecords.addHospital(accounts[4], { from: accounts[2] }))
            await assertRevert(patientRecords.addPatient(accounts[6], { from: accounts[2] }))
            await assertRevert(patientRecords.removeHospital(accounts[1], { from: accounts[2] }))
            await assertRevert(patientRecords.removePatient(accounts[2], { from: accounts[2] }))
        })

        it('Fails to add hospital if already patient and viceversa', async () => {
            await assertRevert(patientRecords.addHospital(accounts[2], { from: owner }))
            await assertRevert(patientRecords.addPatient(accounts[1], { from:owner }))
        })

        it('Fails to add hospital if address invalid', async () => {
            await assertRevert(patientRecords.addHospital(invalid, { from: owner }))
        })

    })
})
