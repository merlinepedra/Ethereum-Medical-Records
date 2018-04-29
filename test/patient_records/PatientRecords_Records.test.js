const PatientRecords = artifacts.require('PatientRecords')
import assertRevert from '../helpers/assertRevert'
import expectThrow from '../helpers/expectThrow'
import utils from '../helpers/utils'
import records from '../fixtures/records'

contract('PatientRecords - Records Management', accounts => {
    let patientRecords
    let eventEmitted
    let confirm
    let currentRecordCount
    let name
    const emptyName = ''
    const value = web3.toWei('50', 'ether')
    const owner = accounts[0]
    const hospitals = [accounts[0], accounts[1]]
    const patients = [accounts[2], accounts[3]]

    describe('Adds and gets Records', async () => {

        beforeEach(async () => {
            patientRecords = await PatientRecords.new(hospitals, patients)
            assert.ok(patientRecords)
            assert.equal(await patientRecords.owner.call({from: accounts[1]}), accounts[0])
        })

        it('Correctly perform Record Logic', async () => {
            //Send some ETH to contract
            await web3.eth.sendTransaction({
                from: accounts[5],
                to: patientRecords.address,
                value: value,
                gas: 1000000
            })
            assert(web3.eth.getBalance(patientRecords.address),value)
            //Allows for owner to add a patient record
            confirm = await patientRecords.addRecord(
                records[0].patient,
                records[0].hospital,
                records[0].admissionDate,
                records[0].dischargeDate,
                records[0].visitReason, { from: owner })

            eventEmitted = utils.getParamFromTxEvent(confirm, 'patientAddress', null, 'PatientRecordAdded')
            assert.equal(eventEmitted, records[0].patient)

            eventEmitted = utils.getParamFromTxEvent(confirm, 'recordID', null, 'PatientRecordAdded')
            currentRecordCount = await patientRecords.recordCount.call({from: owner})
            assert.equal(eventEmitted.toNumber(), currentRecordCount.toNumber()-1)

            //The patient has not yet submitted their name, so record cannot be retrived
            await expectThrow(patientRecords.getRecord(currentRecordCount.toNumber()-1,records[0].patient, { from: owner }))

            // Patient Submits their name
            // Non patient cannot submit name
            name = 'Nicolas Frega'
            await assertRevert(patientRecords.addName(currentRecordCount.toNumber()-1, name, { from: owner }))
            //Patient can submit their name
            assert.equal(await patientRecords.isPatient(records[0].patient), true)
            confirm = await patientRecords.addName(currentRecordCount.toNumber()-1, name, { from: patients[0] })
            eventEmitted = utils.getParamFromTxEvent(confirm, 'patientAddress', null, 'NameAddedToRecords')
            assert.equal(eventEmitted, patients[0])

            //cannot get record for incorrect record
            await assertRevert(patientRecords.getRecord(currentRecordCount.toNumber(), accounts[5], { from: owner }))

            //Record can now be retrieved by Hospital
            confirm = await patientRecords.getRecord(currentRecordCount.toNumber()-1,records[0].patient, { from: owner })

            //Incorrect hospital cannot retrieve
            await expectThrow(patientRecords.getRecord(currentRecordCount.toNumber()-1,records[0].patient, { from: hospitals[1] }))

            //Hospital can retrive number of records by patient name
            confirm = await patientRecords.getRecordByName(name, { from: owner })
            assert.equal(confirm.toNumber(), 1)
        })

        it('Correctly adds multiple records', async () => {
            //Allows for owner to add a patient record
            confirm = await patientRecords.addRecord(
                records[0].patient,
                records[0].hospital,
                records[0].admissionDate,
                records[0].dischargeDate,
                records[0].visitReason, { from: owner })

            confirm = await patientRecords.addRecord(
                records[1].patient,
                records[1].hospital,
                records[1].admissionDate,
                records[1].dischargeDate,
                records[1].visitReason, { from: owner })

            confirm = await patientRecords.addRecord(
                records[2].patient,
                records[2].hospital,
                records[2].admissionDate,
                records[2].dischargeDate,
                records[2].visitReason, { from: owner })


            // Get number of Patients within range - Should be 2
            const from = 1
            const to = 6
            confirm = await patientRecords.getCurrentPatients(from, to, {from: owner})
            assert.equal(confirm.toNumber(), 2)

            // Currently no records by name since no patient provided their name
            const name1 = 'Nicolas Frega'
            const name2 = 'Rob Krzyzanowski'
            confirm = await patientRecords.getRecordByName(name1, {from: owner})
            assert.equal(confirm, 0)

            //fails if name field is empty
            await assertRevert(patientRecords.addName(0, emptyName, { from: patients[0] }))
            //fails if wrong patient tries to add their name to incorrect recordID
            await assertRevert(patientRecords.addName(1, name1, { from: patients[0] }))
            // Patients now provide their names and their records become available
            confirm = await patientRecords.addName(0, name1, { from: patients[0] })
            confirm = await patientRecords.addName(1, name2, { from: patients[1] })
            confirm = await patientRecords.addName(2, name2, { from: patients[1] })

            //name1 stayed in hospital[0] 1 time
            confirm = await patientRecords.getRecordByName(name1, {from: owner})
            assert.equal(confirm,1)
            //name2 stayed in hospital[1] 2 times
            confirm = await patientRecords.getRecordByName(name2, {from: hospitals[1]})
            assert.equal(confirm,2)

        })

        it('Fails to add incorrect records', async () => {
            //Fails to add record if hospital is not in network
            await assertRevert(patientRecords.addRecord(
                records[0].patient,
                accounts[9],
                records[0].admissionDate,
                records[0].dischargeDate,
                records[0].visitReason, { from: owner }))
        })

    })
})
