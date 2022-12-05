const assert = require('assert');
const { validateCustomFields, filterCustomFields } = require('../../../services/centers/center-extras-services');
require("module-alias/register");  //for logger import

describe('validateCustomFields', function () {
  it('1 - when input values is null, expected false', function () {
    const customFields = null
    let actualResult = validateCustomFields(customFields)
    assert.deepEqual(actualResult, false);
  })
  it('2 - when input values is string, expected false', function () {
    const customFields = 'sample string'
    let actualResult = validateCustomFields(customFields)
    assert.deepEqual(actualResult, false);
  })
  it('3 - when input values is number, expected false', function () {
    const customFields = 123
    let actualResult = validateCustomFields(customFields)
    assert.deepEqual(actualResult, false);
  })
  it('4 - when input values is undefined, expected false', function () {
    const customFields = undefined
    let actualResult = validateCustomFields(customFields)
    assert.deepEqual(actualResult, false);
  })
  it('5 - when input values is empty array, expected false', function () {
    const customFields = []
    let actualResult = validateCustomFields(customFields)
    assert.deepEqual(actualResult, false);
  })
  it('6 - when input values is array, expected false', function () {
    const customFields = [1, 2, 'a', 'b']
    let actualResult = validateCustomFields(customFields)
    assert.deepEqual(actualResult, false);
  })
  it('7 - when values of a suppress is null, expected false', function () {
    const customFields = { "Suppress Abnormal Classification": null }
    let actualResult = validateCustomFields(customFields)
    assert.deepEqual(actualResult, false);
  })
  it('8 - when values of a suppress is undefined, expected false', function () {
    const customFields = { "Suppress Abnormal Classification": undefined }
    let actualResult = validateCustomFields(customFields)
    assert.deepEqual(actualResult, false);
  })
  it('9 - when values of a suppress is empty string, expected false', function () {
    const customFields = { "Suppress Abnormal Classification": '' }
    let actualResult = validateCustomFields(customFields)
    assert.deepEqual(actualResult, false);
  })
  it('10 - when values of a suppress is invalid, expected false', function () {
    const customFields = { "Suppress Abnormal Classification": 'ab' }
    let actualResult = validateCustomFields(customFields)
    assert.deepEqual(actualResult, false);
  })
  it('11 - when values of a suppress is wrong, expected false', function () {
    const customFields = { "Suppress Abnormal Classification": 'Yes' }
    let actualResult = validateCustomFields(customFields)
    assert.deepEqual(actualResult, false);
  })
  it('12 - when values of a suppress is number, expected false', function () {
    const customFields = { "Suppress Abnormal Classification": 123 }
    let actualResult = validateCustomFields(customFields)
    assert.deepEqual(actualResult, false);
  })
  it('13 - when values of a suppress is correct, expected true', function () {
    const customFields = { "Suppress Abnormal Classification": 'YES' }
    let actualResult = validateCustomFields(customFields)
    assert.deepEqual(actualResult, true);
  })
  it('14 - when values of a suppress is 0, expected false', function () {
    const customFields = { "Suppress Abnormal Classification": 0 }
    let actualResult = validateCustomFields(customFields)
    assert.deepEqual(actualResult, false);
  })
  it('15 - when values of a suppress is 1, expected false', function () {
    const customFields = { "Suppress Abnormal Classification": 1 }
    let actualResult = validateCustomFields(customFields)
    assert.deepEqual(actualResult, false);
  })
  it('16 - when values of a suppress is wrong, expected false', function () {
    const customFields = {
      "Suppress Abnormal Classification": 'YES',
      "Suppress Normal Classification": null,
      "Suppress Critical Classification": null,
      "Suppress Please Correlate Clinically": "NO"
    }
    let actualResult = validateCustomFields(customFields)
    assert.deepEqual(actualResult, false);
  })
  it('17 - when input values is empty object, expected false', function () {
    const customFields = {}
    let actualResult = validateCustomFields(customFields)
    assert.deepEqual(actualResult, false);
  })
})

describe('filteredCustomFields', function () {
  it('1 - When the input value is empty object, expect empty object', function () {
    const customFields = {};
    const actualResult = filterCustomFields(customFields)
    const expectedResult = {}
    assert.deepEqual(actualResult, expectedResult)
  })
  it('2 - When the input value is null, expect empty object', function () {
    const customFields = null;
    const actualResult = filterCustomFields(customFields)
    const expectedResult = {}
    assert.deepEqual(actualResult, expectedResult)
  })
  it('3 - When the input value is undefined, expect empty object', function () {
    const customFields = undefined;
    const actualResult = filterCustomFields(customFields)
    const expectedResult = {}
    assert.deepEqual(actualResult, expectedResult)
  })
  it('4 - When the input value is number, expect empty object', function () {
    const customFields = 12;
    const actualResult = filterCustomFields(customFields)
    const expectedResult = {}
    assert.deepEqual(actualResult, expectedResult)
  })
  it('5 - When the input value is array / empty array, expect empty object', function () {
    const customFields = [];
    const actualResult = filterCustomFields(customFields)
    const expectedResult = {}
    assert.deepEqual(actualResult, expectedResult)
  })
  it('6 - When the input value is object with only one key and value of key is null, expect empty object', function () {
    const customFields = {
      "Suppress Abnormal Classification": null
    };
    const actualResult = filterCustomFields(customFields)
    const expectedResult = {}
    assert.deepEqual(actualResult, expectedResult)
  })
  it('7 - When the input value is object and value of a key is null, expect object without one key & value', function () {
    const customFields = {
      "Suppress Abnormal Classification": null,
      "Suppress Normal Classification": "Yes",
      "Suppress Please Correlate Clinically": "No"
    };
    const actualResult = filterCustomFields(customFields)
    const expectedResult = {
      "Suppress Normal Classification": "Yes",
      "Suppress Please Correlate Clinically": "No"
    }
    assert.deepEqual(actualResult, expectedResult)
  })
  it('8 - When the input value is object and value of some keys is null, expect object without key whose value is null', function () {
    const customFields = {
      "Suppress Abnormal Classification": null,
      "Suppress Normal Classification": null,
      "Suppress Critical Classification": "YES",
      "Suppress Please Correlate Clinically": "NO"
    };
    const actualResult = filterCustomFields(customFields)
    const expectedResult = {
      "Suppress Critical Classification": "YES",
      "Suppress Please Correlate Clinically": "NO"
    }
    assert.deepEqual(actualResult, expectedResult)
  })
  it('9 - When the input value is object and value of some keys is empty string, expect object without key whose value is empty', function () {
    const customFields = {
      "Suppress Abnormal Classification": "",
      "Suppress Normal Classification": null,
      "Suppress Critical Classification": "YES",
      "Suppress Please Correlate Clinically": "NO"
    };
    const actualResult = filterCustomFields(customFields)
    const expectedResult = {
      "Suppress Critical Classification": "YES",
      "Suppress Please Correlate Clinically": "NO"
    }
    assert.deepEqual(actualResult, expectedResult)
  })
  it('10 - When the input value is object and value of some keys are invalid, expect object without key whose value is empty', function () {
    const customFields = {
      "Suppress Abnormal Classification": 0,
      "Suppress Critical Classification": undefined,
      "Suppress Normal Classification": null,
      "Suppress Please Correlate Clinically": "NO"
    };
    const actualResult = filterCustomFields(customFields)
    const expectedResult = {
      "Suppress Abnormal Classification": 0,
      "Suppress Please Correlate Clinically": "NO"
    }
    assert.deepEqual(actualResult, expectedResult)
  })
  it('11 - When the input value 0, expect empty object', function () {
    const customFields = 0
    const actualResult = filterCustomFields(customFields)
    const expectedResult = {}
    assert.deepEqual(actualResult, expectedResult)
  })
  it('12 - When the input value 1, expect empty object', function () {
    const customFields = 1
    const actualResult = filterCustomFields(customFields)
    const expectedResult = {}
    assert.deepEqual(actualResult, expectedResult)
  })
  it('13 - When the input values are correct, expect the same object', function () {
    const customFields = {
      "NPA Days": "10",
      "Account Manager": "iyaz@tricog.com",
      "Sales Executive": "443",
      "Is Cardionet User": "NO",
      "Technician Number": "0",
      "Accountant Contact": 11234567890,
      "Is Bulk Download Enable": "No",
      "Suppress Normal Classification": "NO",
      "Suppress Abnormal Classification": "YES",
      "Suppress Critical Classification": "NO",
      "Suppress Please Correlate Clinically": "NO"
    }
    const actualResult = filterCustomFields(customFields)
    const expectedResult = {
      "NPA Days": "10",
      "Account Manager": "iyaz@tricog.com",
      "Sales Executive": "443",
      "Is Cardionet User": "NO",
      "Technician Number": 0,
      "Accountant Contact": 11234567890,
      "Is Bulk Download Enable": "No",
      "Suppress Normal Classification": "NO",
      "Suppress Abnormal Classification": "YES",
      "Suppress Critical Classification": "NO",
      "Suppress Please Correlate Clinically": "NO"
    }
    assert.deepEqual(actualResult, expectedResult)
  })
})