const PatientRecords = artifacts.require('PatientRecords')
import expectThrow from '../helpers/expectThrow'

contract('PatientRecords - Contract Deployment', accounts => {
    let patientRecords
    const emptyHospitals = ['0x0']
    const emptyPatients = ['0x0']
    const hospitals = [accounts[0], accounts[1]]
    const patients = [accounts[2], accounts[3]]

    describe('Deploys Correctly', async () => {
        beforeEach(async () => {
            patientRecords = await PatientRecords.new(hospitals, patients)
            assert.ok(patientRecords)
            assert.equal(await patientRecords.owner.call({from: accounts[1]}), accounts[0])
        })

        it('Correctly sets hospitals map', async () => {
            assert.equal(await patientRecords.isHospital(accounts[0]), true)
            assert.equal(await patientRecords.isHospital(accounts[1]), true)
        })

        it('Correctly sets patients map', async () => {
            assert.equal(await patientRecords.isPatient(accounts[2]), true)
            assert.equal(await patientRecords.isPatient(accounts[3]), true)
        })

        context('Fails to deploy with incorrect arguments', async () => {
            it('fails to deploy if no arguments are provided', async () => {
                await expectThrow(PatientRecords.new())
            })
            it('fails to deploy if addresses are invalid', async () => {
                await expectThrow(PatientRecords.new(emptyHospitals,emptyPatients))
            })
            it('fails to deploy if addresses are the same', async () => {
                await expectThrow(PatientRecords.new([accounts[0]],[accounts[0]]))
            })
            it('fails to deploy if patient address is empty', async () => {
                await expectThrow(PatientRecords.new([accounts[0]],emptyPatients))
            })
        })
    })
})
