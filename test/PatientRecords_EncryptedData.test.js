const PatientRecords = artifacts.require('PatientRecords')
require('dotenv').config()
import assertRevert from 'zeppelin-solidity/test/helpers/assertRevert'
import expectThrow from './helpers/expectThrow'
import utils from './helpers/utils'
import { encryptor } from './helpers/encryption'
import EthCrypto  from 'eth-crypto'
import { publicKeyOfPrivateKey } from 'eth-crypto'
import records from './fixtures/records'


contract('PatientRecords - Encrypted Records', accounts => {
    let patientRecords
    let eventEmitted
    let confirm
    let currentRecordCount
    let name
    const owner = accounts[0]
    const hospitals = [accounts[0], accounts[1]]
    const patients = [accounts[2], accounts[3]]

    describe('Correctly encrypts and decrypts records', async () => {

        beforeEach(async () => {
          patientRecords = await PatientRecords.new(hospitals, patients)
          assert.ok(patientRecords)
          assert.equal(await patientRecords.owner.call({from: accounts[1]}), accounts[0])
        })


        it('Correctly retrives encrypted records', async () => {
          //Encoding for hospital[1]
          const admissionDate = records[1].admissionDate
          const dischargeDate = records[1].dischargeDate
          const hospital1PrivateKey = new Buffer(process.env["HOSPITAL1_PRIVATE_KEY"], "hex")
          const ownerPrivateKey = process.env["OWNER_PRIVATE_KEY"]

          const encryptedAdmission = await encryptor(ownerPrivateKey, hospital1PrivateKey, admissionDate)
          const encryptedDischarge = await encryptor(ownerPrivateKey, hospital1PrivateKey, dischargeDate)

          const encryptedAdmissionArray = Object.values(encryptedAdmission)
          const encryptedDischargeArray = Object.values(encryptedDischarge)

          //Allows for owner to add a patient record
          confirm = await patientRecords.addRecord(
            records[1].patient,
            records[1].hospital,
            encryptedAdmissionArray,
            encryptedDischargeArray,
            records[1].visitReason, { from: owner })

          eventEmitted = utils.getParamFromTxEvent(confirm, 'patientAddress', null, 'PatientRecordAdded')
          assert.equal(eventEmitted, records[1].patient)

          eventEmitted = utils.getParamFromTxEvent(confirm, 'recordID', null, 'PatientRecordAdded')
          currentRecordCount = await patientRecords.recordCount.call({from: owner})
          assert.equal(eventEmitted.toNumber(), currentRecordCount.toNumber()-1)

          //The patient has not yet submitted their name, so record cannot be retrived
          await expectThrow(patientRecords.getRecord(currentRecordCount.toNumber()-1,records[1].patient, { from: owner }))

          // Patient Submits their name
          // Non patient cannot submit name
          name = "Nicolas Frega"
          await assertRevert(patientRecords.addName(currentRecordCount.toNumber()-1, name, { from: owner }))
          //Patient can submit their name
          assert.equal(await patientRecords.isPatient(records[1].patient), true)
          confirm = await patientRecords.addName(currentRecordCount.toNumber()-1, name, { from: patients[1] })
          eventEmitted = utils.getParamFromTxEvent(confirm, 'patientAddress', null, 'NameAddedToRecords')
          assert.equal(eventEmitted, patients[1])

          //Incorrect hospital cannot retrieve
          await expectThrow(patientRecords.getRecord(currentRecordCount.toNumber()-1,records[1].patient, { from: owner }))

          //Record can now be retrieved by Hospital
          confirm = await patientRecords.getRecord(currentRecordCount.toNumber()-1,records[1].patient, { from: hospitals[1] })


          console.log(encryptedAdmission)
          console.log(confirm)

          // const signature = EthCrypto.sign(
          //   ownerPrivateKey,
          //   EthCrypto.hash.keccak256(admissionDate)
          // )
          //
          // const payload = {
          //   message: admissionDate,
          //   signature
          // }
          //
          // const encrypted = await EthCrypto.encryptWithPublicKey (
          //   records[0].hospital,
          //   JSON.stringify(payload)
          // )

        })













  })
})
