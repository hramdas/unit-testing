const { fetchCases, fetchCasesCount, fetchSpokesDetailsByHub, fetchCasesByStemiId, updateCase } = require('../../controllers/cases.controllers')
jest.mock('../../services/cases.services')
const casesServices = require('../../services/cases.services')

let casesResponse = [
  {
    "case_id": "0083c34b-a32b-45ea-bf8b-2d3aa8bf206b",
    "center_name": "Test SPoke 1",
    "patient_id": null,
    "patient_name": null,
    "age": "45",
    "gender": "M",
    "diagnosis": null,
    "status": null,
    "time_read": null,
    "tag": null
  },
  {
    "case_id": "0698e03b-5579-4992-83fb-78287a1febb3",
    "center_name": "Test SPoke 1",
    "patient_id": null,
    "patient_name": null,
    "age": "30",
    "gender": "M",
    "diagnosis": null,
    "status": null,
    "time_read": null,
    "tag": null
  },
  {
    "case_id": "07bc8960-4abd-437e-9db4-b68cf763e5d4",
    "center_name": "Test SPoke 1",
    "patient_id": null,
    "patient_name": null,
    "age": "39",
    "gender": "M",
    "diagnosis": "Atrial Fibrillation, ST &, Abnormal T waves suggestive of Inferior Wall Ischemia, or Digitalis Effect.  ",
    "status": "Abnormal ECG",
    "time_read": "2021-05-21T13:36:45.000Z",
    "tag": null
  },
  {
    "case_id": "07e6dca0-c3c2-4431-b71d-09a531907608",
    "center_name": "Test SPoke 1",
    "patient_id": null,
    "patient_name": "Sudhakar Tummala Adinarayana",
    "age": "12",
    "gender": "M",
    "diagnosis": "",
    "status": null,
    "time_read": "2021-11-25T10:46:07.000Z",
    "tag": null
  },
  {
    "case_id": "09421661-132c-46af-9591-7730321d8a3c",
    "center_name": "Test SPoke 1",
    "patient_id": null,
    "patient_name": "GOPAL",
    "age": "65",
    "gender": "-",
    "diagnosis": null,
    "status": null,
    "time_read": null,
    "tag": null
  },
  {
    "case_id": "0cd84300-e2b6-44ae-9f13-336dc690cc49",
    "center_name": "Test SPoke 1",
    "patient_id": null,
    "patient_name": null,
    "age": "45",
    "gender": "M",
    "diagnosis": null,
    "status": null,
    "time_read": null,
    "tag": null
  },
  {
    "case_id": "105308fb-f0ca-4790-9d1b-929274e2612d",
    "center_name": "Test SPoke 1",
    "patient_id": null,
    "patient_name": "PRITI PATEL",
    "age": "40",
    "gender": "F",
    "diagnosis": "Sinus rhythm. Resting bradycardia(HR<60bpm).",
    "status": null,
    "time_read": "2021-11-30T18:11:04.000Z",
    "tag": null
  },
  {
    "case_id": "1078a3d8-3b42-4a1a-948b-971dc5c24038",
    "center_name": "Test SPoke 1",
    "patient_id": null,
    "patient_name": "ds",
    "age": "12",
    "gender": "F",
    "diagnosis": null,
    "status": null,
    "time_read": null,
    "tag": null
  },
  {
    "case_id": "11aa9d9c-cfb7-4bdb-b48f-eb8f02face94",
    "center_name": "Test SPoke 1",
    "patient_id": null,
    "patient_name": "ss",
    "age": "16",
    "gender": "M",
    "diagnosis": null,
    "status": null,
    "time_read": null,
    "tag": null
  },
  {
    "case_id": "13a13682-1b75-4124-a4a9-f5b6bd01f615",
    "center_name": "Test SPoke 1",
    "patient_id": null,
    "patient_name": null,
    "age": "58",
    "gender": "M",
    "diagnosis": "Sinus Tachycardia, Low Voltage QRS, *Acute MI*, Consider Right Ventricular Involvement in Acute Inferior Infarction.  ",
    "status": "Abnormal ECG",
    "time_read": "2021-05-20T20:06:18.000Z",
    "tag": null
  }
]


describe('fetchCases', () => {
  let request, response;
  beforeEach(function () {
    request = {
      body: {}
    }
    response = {
      send: jest.fn(function (x) {
        this.message = x
        return x
      }),
      status: jest.fn(function (s) {
        this.status = s;
        return this;
      })
    };
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('1 - When the request is empty, expected status 500', async () => {
    await fetchCases(request, response)

    expect(casesServices.fetchCases).toHaveBeenCalledTimes(0)
    expect(response.status).toBe(500)
  })

  it('2 - When the query is empty, expected status 200', async () => {
    request.query = {}

    casesServices.fetchCases.mockImplementation(() => casesResponse)
    await fetchCases(request, response)

    expect(response.status).toBe(200)
    expect(casesServices.fetchCases).toHaveBeenCalledTimes(1)
    expect(casesServices.fetchCases).toHaveBeenCalledWith(1, 10, '', undefined)
    expect(response.message.cases).toMatchObject(casesResponse)
  })

  it('3 - When query object is correct, expected status 200', async () => {
    request.query = { page: 2, limit: 2, spokeIds: [1, 71, 68], type: 'pending' }
    casesServices.fetchCases.mockImplementation(() => casesResponse)
    await fetchCases(request, response)

    expect(casesServices.fetchCases).toHaveBeenCalledWith(2, 2, [1, 71, 68], 'pending')
    expect(casesServices.fetchCases).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(200)
  })

})


describe('fetchCasesCount', () => {
  let request, response;
  const fakeCasesCount = { totalCasesCount: 10 }
  beforeEach(function () {
    request = {
      body: {}
    }
    response = {
      send: jest.fn(function (x) {
        this.message = x
        return x
      }),
      status: jest.fn(function (s) {
        this.status = s;
        return this;
      })
    };
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('1 - When request is empty, expected statsu 500', async () => {
    await fetchCasesCount(request, response)
    expect(casesServices.fetchTotalCasesCount).toHaveBeenCalledTimes(0)
    expect(response.status).toBe(500)
    // expect(response.message).toBe()
  })
  
  it('2 - When query is empty, expected statsu 500', async () => {
    request.query = {}
    await fetchCasesCount(request, response)
    expect(casesServices.fetchTotalCasesCount).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(500)
  })

  it('3 - When queries are correct, expected status 200', async () => {
    request.query = { spokeIds: [1, 71, 68], type: 'pending' }

    casesServices.fetchTotalCasesCount.mockImplementation(() => [fakeCasesCount])

    await fetchCasesCount(request, response)
    expect(casesServices.fetchTotalCasesCount).toHaveBeenCalledTimes(1)
    expect(casesServices.fetchTotalCasesCount).toHaveBeenCalledWith([1, 71, 68], 'pending')
    expect(response.status).toBe(200)
    expect(response.message).toStrictEqual(fakeCasesCount)
  })
})


describe('fetchSpokesDetailsByHub', () => {
  const fakeSpokesResponse = [
    {
      "centerid": "18",
      "centername": "Chirag diagnostic center",
      "city": "Bangalore",
      "state": "Karnataka",
      "country": null,
      "status": "ACTIVE",
      "domain": ""
    },
    {
      "centerid": "71",
      "centername": "Test SPoke 1",
      "city": "Bangalore",
      "state": "KARNATAKA",
      "country": "India",
      "status": "ACTIVE",
      "domain": null
    },
    {
      "centerid": "107",
      "centername": "Hub spoke bangalore",
      "city": "Bengaluru",
      "state": "Karnataka",
      "country": null,
      "status": "ACTIVE",
      "domain": null
    },
    {
      "centerid": "168",
      "centername": "PHP SPOKE 1",
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "status": "ACTIVE",
      "domain": null
    },
    {
      "centerid": "169",
      "centername": "PHP SPOKE 2",
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "status": "ACTIVE",
      "domain": null
    },
    {
      "centerid": "170",
      "centername": "PHP SPOKE 3",
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "status": "ACTIVE",
      "domain": null
    }
  ]
  let request, response;
  beforeEach(function () {
    request = {
      body: {}
    }
    response = {
      send: jest.fn(function (x) {
        this.message = x
        return x
      }),
      status: jest.fn(function (s) {
        this.status = s;
        return this;
      })
    };
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('1 - When hubId is not provided', async () => {
    request.query = {}
    await fetchSpokesDetailsByHub(request, response)
    expect(response.status).toBe(400)
    expect(response.message).toBe('Hub ID missing')
  })

  it('2 - When hubId is correct, expected status 200', async () => {
    request.query = { hubId: 70 }

    casesServices.fetchSpokesDetailsByHub.mockImplementation(() => fakeSpokesResponse)
    await fetchSpokesDetailsByHub(request, response)

    expect(casesServices.fetchSpokesDetailsByHub).toHaveBeenCalledTimes(1)
    expect(casesServices.fetchSpokesDetailsByHub).toHaveBeenCalledWith(70)
    expect(response.status).toBe(200)
    expect(response.message).toBe(fakeSpokesResponse)
  })
})

describe('fetchCasesByStemiId', () => {
  const fakeStemiCasesResponse = [
    {
      "id": 25445,
      "case_id": "001c88d2-03ae-412c-9525-b53ed786115f",
      "episode_of_care_id": "1",
      "encounter_id": null,
      "age": "-",
      "gender": "M",
      "device_id": "HE-D32B2F99",
      "diagnosis": null,
      "measurements": "\"{\\\"ECGSampleExponent\\\":\\\"1\\\",\\\"ECGSampleBase\\\":\\\"500\\\",\\\"AtrialRate\\\":\\\"60\\\",\\\"VentricularRate\\\":\\\"60\\\",\\\"PRInterval\\\":\\\"\\\",\\\"QRSDuration\\\":\\\"118\\\",\\\"QTInterval\\\":\\\"516\\\",\\\"QTC_F\\\":516,\\\"QTCorrected\\\":\\\"516\\\",\\\"POnset\\\":0,\\\"POffset\\\":0,\\\"QOnset\\\":398,\\\"QOffset\\\":516,\\\"TOffset\\\":914,\\\"PAxis\\\":\\\"\\\",\\\"RAxis\\\":\\\"27\\\",\\\"TAxis\\\":\\\"30\\\",\\\"QRSCount\\\":\\\"\\\"}\"",
      "status": null,
      "time_read": null,
      "center_id": "126",
      "diagnosed_by": null,
      "mac_diagnosis": "",
      "mac_diagnosis_code": "",
      "hub_diagnosis_code": null,
      "image_guid": "7d60b19a-7e02-4f45-adc7-f1d476540713_mtf",
      "is_critical": null,
      "skip": 0,
      "final_classification": null,
      "acquired_date_time": "2021-12-20T07:34:24.000Z",
      "meta": "{\"height\": \"0.0\", \"weight\": \"0.0\", \"visitId\": \"dc25d178-6cc4-4bfd-93ff-4e65eeaa27a5\", \"lastName\": \"VEERASSS\", \"ethnicity\": \"UNDEFINED\", \"firstName\": \"VEERA\", \"machineId\": \"Anand Diagnostics  234\", \"pacemaker\": \"OFF\", \"heightUnit\": \"cm\", \"weightUnit\": \"kg\", \"dateOfBirth\": \"1965-12-09\", \"recordingDate\": \"20000120\", \"recordingTime\": \"025259000\", \"recordingType\": \"RESTING_ECG\", \"originalVisitId\": \"\"}",
      "is_digital": 1,
      "type": "RESTING",
      "center_name": "vijaya Diagnostic",
      "patient_name": null,
      "patient_contact": null,
      "tag": null,
      "patient_id": null
    },
    {
      "id": 24495,
      "case_id": "0039a491-d39c-430a-a158-064a82744486",
      "episode_of_care_id": "1",
      "encounter_id": null,
      "age": "-",
      "gender": "F",
      "device_id": "H2-A87C7B7E",
      "diagnosis": null,
      "measurements": "\"{\\\"ECGSampleExponent\\\":\\\"1\\\",\\\"ECGSampleBase\\\":\\\"500\\\",\\\"AtrialRate\\\":\\\"60\\\",\\\"VentricularRate\\\":\\\"60\\\",\\\"PRInterval\\\":\\\"\\\",\\\"QRSDuration\\\":\\\"118\\\",\\\"QTInterval\\\":\\\"516\\\",\\\"QTC_F\\\":516,\\\"QTCorrected\\\":\\\"516\\\",\\\"POnset\\\":0,\\\"POffset\\\":0,\\\"QOnset\\\":398,\\\"QOffset\\\":516,\\\"TOffset\\\":914,\\\"PAxis\\\":\\\"\\\",\\\"RAxis\\\":\\\"27\\\",\\\"TAxis\\\":\\\"30\\\",\\\"QRSCount\\\":\\\"\\\"}\"",
      "status": null,
      "time_read": null,
      "center_id": "21",
      "diagnosed_by": null,
      "mac_diagnosis": "",
      "mac_diagnosis_code": "",
      "hub_diagnosis_code": null,
      "image_guid": "5a2d5e1a-a66e-4611-936c-245a083f3dad_mtf",
      "is_critical": null,
      "skip": 0,
      "final_classification": null,
      "acquired_date_time": "2021-11-30T11:53:25.000Z",
      "meta": "{\"height\": \"0.0\", \"weight\": \"0.0\", \"visitId\": \"d16ba2fc-58fd-4e96-a4da-4758ec64130f\", \"lastName\": \"Lnam2e2\", \"ethnicity\": \"UNDEFINED\", \"firstName\": \"Fname22\", \"machineId\": \"Anand Diagnostics\", \"pacemaker\": \"OFF\", \"heightUnit\": \"cm\", \"weightUnit\": \"kg\", \"dateOfBirth\": \"\", \"recordingDate\": \"20200622\", \"recordingTime\": \"161521002\", \"recordingType\": \"RESTING_ECG\", \"originalVisitId\": \"43211005\"}",
      "is_digital": 1,
      "type": "RESTING",
      "center_name": "Amruth Clinic",
      "patient_name": null,
      "patient_contact": null,
      "tag": null,
      "patient_id": null
    }
  ]

  let request, response;
  beforeEach(function () {
    request = {
      body: {}
    }
    response = {
      send: jest.fn(function (x) {
        this.message = x
        return x
      }),
      status: jest.fn(function (s) {
        this.status = s;
        return this;
      })
    };
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('1 - When stemiId not provided, expected status 400', async () => {
    request.params = {}
    await fetchCasesByStemiId(request, response)
    expect(casesServices.fetchCasesByStemiId).toHaveBeenCalledTimes(0)
    expect(response.status).toBe(400)
    expect(response.message).toBe('STEMI Id missing')
  })

  it('2 - When stemiId is correct, expected status 200', async () => {
    request.params = { stemiId: 1 }
    casesServices.fetchCasesByStemiId.mockImplementation(() => fakeStemiCasesResponse)
    await fetchCasesByStemiId(request, response)

    expect(casesServices.fetchCasesByStemiId).toHaveBeenCalledTimes(1)
    expect(casesServices.fetchCasesByStemiId).toHaveBeenCalledWith(1)
    expect(response.status).toBe(200)
    expect(response.message).toStrictEqual({ cases: fakeStemiCasesResponse })
  })
})


describe('updateCase', () => {
  let request, response;
  beforeEach(function () {
    request = {
      body: {}
    }
    response = {
      send: jest.fn(function (x) {
        this.message = x
        return x
      }),
      status: jest.fn(function (s) {
        this.status = s;
        return this;
      })
    };
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('1 - When caseId is not provided', async () => {
    await updateCase(request, response)
    expect(casesServices.updateCase).toHaveBeenCalledTimes(0)
    expect(response.status).toBe(500)
  })
  it('2 - When caseId and body is provided', async () => {
    request.query = { caseId: '001c88d2-03ae-412c-9525-b53ed786115f' }
    request.body = { tag: 1, episodeOfCareId: 1 }
    // casesServices.updateCase.mockImplementation(() => )
    await updateCase(request, response)
    expect(casesServices.updateCase).toHaveBeenCalledTimes(1)
    expect(casesServices.updateCase).toHaveBeenCalledWith('001c88d2-03ae-412c-9525-b53ed786115f', { tag: 1, episodeOfCareId: 1 })
    expect(response.status).toBe(200)
    expect(response.message).toBe('Updated case successfully')
  })
})