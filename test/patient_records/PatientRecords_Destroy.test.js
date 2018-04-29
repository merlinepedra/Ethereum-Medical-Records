const PatientRecords = artifacts.require('PatientRecords')
const token = artifacts.require('SpringToken')

contract('PatientRecords - Destroys Contract', accounts => {
    let patientRecords
    const value = 10000000
    const balance = 10000 * (10 ** 18)
    const hospitals = [accounts[0], accounts[1]]
    const patients = [accounts[2], accounts[3]]

    describe('Destroys Contract Correctly', async () => {
        beforeEach(async () => {
            patientRecords = await PatientRecords.new(hospitals, patients)
            assert.ok(patientRecords)
            assert.equal(await patientRecords.owner.call({from: accounts[1]}), accounts[0])
        })

        it('Destroys the contract and sends remaining balance to owner', async () => {
            //Send some ETH to contract
            await web3.eth.sendTransaction({
                from: accounts[0],
                to: patientRecords.address,
                value: value,
                gas: 1000000
            })
            assert(web3.eth.getBalance(patientRecords.address),value)
            const tokenAddress = await patientRecords.tokenAddress.call({ from: accounts[0] })
            const tokenInstance = token.at(tokenAddress)
            assert.equal(await tokenInstance.balanceOf(patientRecords.address), balance)
            //check contract works
            await patientRecords.addHospital(accounts[4], { from: accounts[0] })
            //destroy the contract
            await patientRecords.destroy([tokenInstance.address])
            //Check owner has total balance
            assert.equal(await tokenInstance.balanceOf(accounts[0]), balance)
            assert.equal(await tokenInstance.balanceOf(patientRecords.address), 0)

            //check contract is not usable anymore
            try {
                await patientRecords.owner.call({from: accounts[1]})
                assert.fail('should have thrown before')
            } catch (error) {
                assert(error)
            }
        })
    })
})
