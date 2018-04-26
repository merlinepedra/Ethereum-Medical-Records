export default async promise => {
    try {
        await promise
    } catch (error) {
    // TODO: Check jump destination to destinguish between a throw
    //       and an actual invalid jump.
        const invalidOpcode = error.message.search('invalid opcode') >= 0
        // TODO: When we contract A calls contract B, and B throws, instead
        //       of an 'invalid jump', we get an 'out of gas' error. How do
        //       we distinguish this from an actual out of gas event? (The
        //       testrpc log actually show an 'invalid jump' event.)
        const outOfGas = error.message.search('out of gas') >= 0
        const revert = error.message.search('revert') >= 0
        const zeroArguments = error.message.search('PatientRecords contract constructor expected 2 arguments, received 0') >= 0
        const exception = error.message.search('VM Exception while processing transaction: revert') >= 0
        assert(
            invalidOpcode|| exception|| outOfGas || revert || zeroArguments,
            'Expected throw, got \'' + error + '\' instead',
        )
        return
    }
    assert.fail('Expected throw not received')
}
