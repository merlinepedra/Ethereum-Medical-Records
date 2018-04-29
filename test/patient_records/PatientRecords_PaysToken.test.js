const PatientRecords = artifacts.require('PatientRecords')
const token = artifacts.require('SpringToken')
import assertRevert from '../helpers/assertRevert'
import records from '../fixtures/records'
import utils from '../helpers/utils'

contract('PatientRecords - Token Management', accounts => {
    let patientRecords
    let eventEmitted
    let confirm
    const value = web3.toWei('50', 'ether')
    const reward = 1000
    const owner = accounts[0]
    const hospitals = [accounts[0], accounts[1]]
    const patients = [accounts[2], accounts[3]]

    describe('Pays tokens after name is provided', async () => {

        beforeEach(async () => {
            patientRecords = await PatientRecords.new(hospitals, patients)
            assert.ok(patientRecords)
            assert.equal(await patientRecords.owner.call({from: accounts[1]}), accounts[0])
        })

        it('Correctly pays patients for providing their name', async () => {
            //Send some ETH to contract
            await web3.eth.sendTransaction({
                from: accounts[4],
                to: patientRecords.address,
                value: value
            })
            assert(web3.eth.getBalance(patientRecords.address),value)
            //Allows for owner to add a patient record
            confirm = await patientRecords.addRecord(
                records[0].patient,
                records[0].hospital,
                records[0].admissionDate,
                records[0].dischargeDate,
                records[0].visitReason, { from: owner })
            assert.ok(confirm)

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


            // Patients now provide their names and their records become available.
            const name1 = 'Nicolas Frega'
            const name2 = 'Rob Krzyzanowski'

            confirm = await patientRecords.addName(0, name1, { from: patients[0] })
            eventEmitted = utils.getParamFromTxEvent(confirm, 'patientAddress', null, 'PatientPaid')
            assert.equal(eventEmitted, patients[0])

            confirm = await patientRecords.addName(1, name2, { from: patients[1] })
            eventEmitted = utils.getParamFromTxEvent(confirm, 'patientAddress', null, 'PatientPaid')
            assert.equal(eventEmitted, patients[1])

            confirm = await patientRecords.addName(2, name2, { from: patients[1] })
            eventEmitted = utils.getParamFromTxEvent(confirm, 'patientAddress', null, 'PatientPaid')
            assert.equal(eventEmitted, patients[1])

            //check balances
            assert.equal(await patientRecords.getPatientBalance(patients[0]),reward)
            assert.equal(await patientRecords.getPatientBalance(patients[1]),reward*2)

            //Patient cannot add their name again to receive more tokens for same record
            await assertRevert(patientRecords.addName(2, name2, { from: patients[1] }))
        })

        it('Correctly changes the token reward amount', async () => {
            //Send some ETH to contract
            await web3.eth.sendTransaction({
                from: accounts[6],
                to: patientRecords.address,
                value: value,
                gas: 1000000
            })
            assert(web3.eth.getBalance(patientRecords.address),value)
            let tokenRewardAmount = await patientRecords.tokenRewardAmount.call({from: owner})
            assert.equal(tokenRewardAmount, reward)

            //set reward correctly
            confirm = await patientRecords.setSpringTokenReward(reward*2, { from: owner })
            eventEmitted = utils.getParamFromTxEvent(confirm, 'tokenReward', null, 'TokenRewardSet')
            assert.equal(eventEmitted, reward*2)

            tokenRewardAmount = await patientRecords.tokenRewardAmount.call({from: owner})
            assert.equal(tokenRewardAmount, reward*2)

            //Allows for owner to add a patient record
            confirm = await patientRecords.addRecord(
                records[0].patient,
                records[0].hospital,
                records[0].admissionDate,
                records[0].dischargeDate,
                records[0].visitReason, { from: owner })

            const name1 = 'Nicolas Frega'

            confirm = await patientRecords.addName(0, name1, { from: patients[0] })
            eventEmitted = utils.getParamFromTxEvent(confirm, 'patientAddress', null, 'PatientPaid')
            assert.equal(eventEmitted, patients[0])

            assert.equal(await patientRecords.getPatientBalance(patients[0]),reward*2)

            //cannot transfer tokens directly from contract
            confirm = await patientRecords.springToken.call()
            const tokenInstance = token.at(confirm)
            await assertRevert(tokenInstance.transfer(patients[0], reward, { from: owner }))

        })
    })
})
