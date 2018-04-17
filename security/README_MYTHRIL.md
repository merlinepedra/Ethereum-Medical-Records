# Security Analysis
Security analysis performed using [Mythril](https://github.com/NFhbar/mythril)

## To run Mythril Analysis Tool
Install Mythril
```
$ pip3 install mythril
```
Compile contracts:
```
$ truffle compile
```
Analyze contracts:
```
$ myth --truffle
```

## Results for current build - version: 0.0.3

```
Analysis result for SpringToken:
==== Exception state ====
Type: Informational
Contract: SpringToken
Function name: _function_0xd73dd623
PC address: 2397
A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. This is acceptable in most situations. Note however that assert() should only be used to check invariants. Use require() for regular input checking.
--------------------


Analysis result for SafeMath: No issues found.
Analysis result for Ownable: No issues found.
Analysis result for StandardToken:
==== Exception state ====
Type: Informational
Contract: StandardToken
Function name: _function_0xd73dd623
PC address: 1735
A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. This is acceptable in most situations. Note however that assert() should only be used to check invariants. Use require() for regular input checking.
--------------------
In file: StandardToken.json:32

der].sub(_valu

--------------------


Analysis result for PatientRecords:
==== Integer Underflow ====
Type: Warning
Contract: PatientRecords
Function name: _function_0x82d8185c
PC address: 3686
A possible integer underflow exists in the function _function_0x82d8185c.
The subtraction may result in a value < 0.
--------------------
In file: PatientRecords.json:287

_name = records[_recordID][_patientAddress].name

--------------------

==== Message call to external contract ====
Type: Informational
Contract: PatientRecords
Function name: _function_0x50000712
PC address: 2664
This contract executes a message call to to another contract. Make sure that the called contract is trusted and does not execute user-supplied code.
--------------------
In file: PatientRecords.json:347

springToken.balanceOf(_patientAddress)

--------------------

==== Integer Underflow ====
Type: Warning
Contract: PatientRecords
Function name: _function_0x337e9f4a
PC address: 2337
A possible integer underflow exists in the function _function_0x337e9f4a.
The subtraction may result in a value < 0.
--------------------
In file: PatientRecords.json:6

atient provides name.
/// Pati

--------------------

==== Message call to external contract ====
Type: Warning
Contract: PatientRecords
Function name: _function_0xc6786e5a
PC address: 4402
This contract executes a message call to an address provided as a function argument. Generally, it is not recommended to call user-supplied adresses using Solidity's call() construct. Note that attackers might leverage reentrancy attacks to exploit race conditions or manipulate this contract's state.
--------------------
In file: PatientRecords.json:26

  event NameAddedToRe

--------------------


Analysis result for BasicToken:
==== Exception state ====
Type: Informational
Contract: BasicToken
Function name: _function_0xa9059cbb
PC address: 695
A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. This is acceptable in most situations. Note however that assert() should only be used to check invariants. Use require() for regular input checking.
--------------------
In file: BasicToken.json:44

f.
  * @return

--------------------


Analysis result for TokenDestructible:
==== Message call to external contract ====
Type: Warning
Contract: TokenDestructible
Function name: _function_0xc6786e5a
PC address: 518
This contract executes a message call to an address provided as a function argument. Generally, it is not recommended to call user-supplied adresses using Solidity's call() construct. Note that attackers might leverage reentrancy attacks to exploit race conditions or manipulate this contract's state.
--------------------
In file: TokenDestructible.json:29

oken.balanceOf(this);

--------------------
```

Integer underflow warnings can be safely ignored since modifiers prevent this behavior.
