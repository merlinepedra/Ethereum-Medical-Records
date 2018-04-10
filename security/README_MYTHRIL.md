# Security Analysis
Security analysis performed using [Mythril](https://github.com/NFhbar/mythril)

## To run Mythril Analysis Tool
```
$ truffle compile
```
then:
```
$ myth --truffle
```

## Results
```
Analysis result for SafeMath: No issues found.
Analysis result for Ownable: No issues found.
Analysis result for PatientRecords:
==== Integer Underflow ====
Type: Warning
Contract: PatientRecords
Function name: _function_0x82d8185c
PC address: 3341
A possible integer underflow exists in the function _function_0x82d8185c.
The subtraction may result in a value < 0.
--------------------
In file: PatientRecords.json:265

_name = records[_recordID][_patientAddress].name

--------------------

==== Integer Underflow ====
Type: Warning
Contract: PatientRecords
Function name: _function_0x337e9f4a
PC address: 2219
A possible integer underflow exists in the function _function_0x337e9f4a.
The subtraction may result in a value < 0.
--------------------
In file: PatientRecords.json:6

 an

--------------------

==== Integer Underflow ====
Type: Warning
Contract: PatientRecords
Function name: _function_0xa9ee491f
PC address: 1185
A possible integer underflow exists in the function _function_0xa9ee491f.
The subtraction may result in a value < 0.
--------------------
In file: PatientRecords.json:35

mapping (uint256 => mapping (address => Records)) public records

--------------------
```

Integer underflow warnings can be safely ignored since modifiers prevent this behavior.
