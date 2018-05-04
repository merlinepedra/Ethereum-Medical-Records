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
PC address: 2389
A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. This is acceptable in most situations. Note however that assert() should only be used to check invariants. Use require() for regular input checking.
--------------------


Analysis result for SafeMath: No issues found.
Analysis result for Ownable: No issues found.
Analysis result for StandardToken:
==== Exception state ====
Type: Informational
Contract: StandardToken
Function name: _function_0xd73dd623
PC address: 1719
A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. This is acceptable in most situations. Note however that assert() should only be used to check invariants. Use require() for regular input checking.
--------------------
In file: StandardToken.json:33

 _value);


--------------------


Analysis result for BasicTokenMock:
==== Exception state ====
Type: Informational
Contract: BasicTokenMock
Function name: _function_0xa9059cbb
PC address: 635
A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. This is acceptable in most situations. Note however that assert() should only be used to check invariants. Use require() for regular input checking.
--------------------
In file: BasicTokenMock.json:14

Analysis result for PatientRecords:
==== Message call to external contract ====
Type: Informational
Contract: PatientRecords
Function name: _function_0x50000712
PC address: 2716
This contract executes a message call to to another contract. Make sure that the called contract is trusted and does not execute user-supplied code.
--------------------
In file: PatientRecords.json:349

springToken.balanceOf(_patientAddress)

--------------------

==== Integer Underflow ====
Type: Warning
Contract: PatientRecords
Function name: _function_0x82d8185c
PC address: 982
A possible integer underflow exists in the function _function_0x82d8185c.
The subtraction may result in a value < 0.
--------------------
In file: PatientRecords.json:275

function getRecord(uint _recordID, address _patientAddress)
        public
        recordExists(_recordID, _patientAddress)
        patientProvidedName(_recordID, _patientAddress)
        onlyHospital(_recordID, _patientAddress)
        view
        returns (
            string _name,
            address _hospital,
            uint256 _admissionDate,
            uint256 _dischargeDate,
            uint256 _visitReason
        )
    {
        _name = records[_recordID][_patientAddress].name;
        _hospital = records[_recordID][_patientAddress].hospital;
        _admissionDate = records[_recordID][_patientAddress].admissionDate;
        _dischargeDate = records[_recordID][_patientAddress].dischargeDate;
        _visitReason = records[_recordID][_patientAddress].visitReason;
    }

--------------------

==== Integer Underflow ====
Type: Warning
Contract: PatientRecords
Function name: _function_0x82d8185c
PC address: 987
A possible integer underflow exists in the function _function_0x82d8185c.
The subtraction may result in a value < 0.
--------------------
In file: PatientRecords.json:275

function getRecord(uint _recordID, address _patientAddress)
        public
        recordExists(_recordID, _patientAddress)
        patientProvidedName(_recordID, _patientAddress)
        onlyHospital(_recordID, _patientAddress)
        view
        returns (
            string _name,
            address _hospital,
            uint256 _admissionDate,
            uint256 _dischargeDate,
            uint256 _visitReason
        )
    {
        _name = records[_recordID][_patientAddress].name;
        _hospital = records[_recordID][_patientAddress].hospital;
        _admissionDate = records[_recordID][_patientAddress].admissionDate;
        _dischargeDate = records[_recordID][_patientAddress].dischargeDate;
        _visitReason = records[_recordID][_patientAddress].visitReason;
    }

--------------------

==== Integer Underflow ====
Type: Warning
Contract: PatientRecords
Function name: _function_0x337e9f4a
PC address: 2386
A possible integer underflow exists in the function _function_0x337e9f4a.
The subtraction may result in a value < 0.
--------------------
In file: PatientRecords.json:6

es name.
///

--------------------

==== Integer Underflow ====
Type: Warning
Contract: PatientRecords
Function name: _function_0x82d8185c
PC address: 3733
A possible integer underflow exists in the function _function_0x82d8185c.
The subtraction may result in a value < 0.
--------------------
In file: PatientRecords.json:289

_name = records[_recordID][_patientAddress].name

--------------------

==== Message call to external contract ====
Type: Warning
Contract: PatientRecords
Function name: _function_0xc6786e5a
PC address: 4455
This contract executes a message call to an address provided as a function argument. Generally, it is not recommended to call user-supplied adresses using Solidity's call() construct. Note that attackers might leverage reentrancy attacks to exploit race conditions or manipulate this contract's state.
--------------------
In file: PatientRecords.json:25

, address patientAddr

--------------------


Analysis result for SafeMathMock:
==== Exception state ====
Type: Informational
Contract: SafeMathMock
Function name: _function_0xa391c15b
PC address: 310
A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. This is acceptable in most situations. Note however that assert() should only be used to check invariants. Use require() for regular input checking.
--------------------
In file: SafeMathMock.json:23
==== Exception state ====
Type: Informational
Contract: SafeMathMock
Function name: _function_0xb67d77c5
PC address: 330
A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. This is acceptable in most situations. Note however that assert() should only be used to check invariants. Use require() for regular input checking.
--------------------
In file: SafeMathMock.json:23
==== Exception state ====
Type: Informational
Contract: SafeMathMock
Function name: fallback
PC address: 297
A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. This is acceptable in most situations. Note however that assert() should only be used to check invariants. Use require() for regular input checking.
--------------------
In file: SafeMathMock.json:23

Analysis result for BasicToken:
==== Exception state ====
Type: Informational
Contract: BasicToken
Function name: _function_0xa9059cbb
PC address: 635
A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. This is acceptable in most situations. Note however that assert() should only be used to check invariants. Use require() for regular input checking.
--------------------
In file: BasicToken.json:44

tion balanceOf

--------------------


Analysis result for StandardTokenMock:
==== Exception state ====
Type: Informational
Contract: StandardTokenMock
Function name: _function_0xd73dd623
PC address: 1719
A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. This is acceptable in most situations. Note however that assert() should only be used to check invariants. Use require() for regular input checking.
--------------------
In file: StandardTokenMock.json:14

Analysis result for TokenDestructible:
==== Message call to external contract ====
Type: Warning
Contract: TokenDestructible
Function name: _function_0xc6786e5a
PC address: 557
This contract executes a message call to an address provided as a function argument. Generally, it is not recommended to call user-supplied adresses using Solidity's call() construct. Note that attackers might leverage reentrancy attacks to exploit race conditions or manipulate this contract's state.
--------------------
In file: TokenDestructible.json:28

oken.balanceOf(this);

--------------------

--------------------
```

Integer underflow warnings can be safely ignored since modifiers prevent this behavior.
