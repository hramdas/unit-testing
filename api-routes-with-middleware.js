
require('module-alias/register');
const assert = require('assert');
const request = require('supertest');
const { server } = require('../../index')

const header = { apikey: '6f0c2458-bb37-440f-9c07-2e4f9be5ceea' }
const wrongHeader = { apikey: '6f0' }

describe('fetchStemiCases', () => {
  const spokeIds = `71,68`

  it('Should throw error when api key is empty', async () => {
    await request(server).get('/stemi/cases').expect(401).then((response) => {
      assert.equal(response.body.message, 'Please provide a valid key');
    })
  })
  it('Should throw error when api key null', async () => {
    await request(server).get('/stemi/cases').set({ apikey: null }).expect(401).then((response) => {
      assert(response.body.message === 'Please provide a valid key');
    })
  })
  it('Should throw error when api key 0', async () => {
    await request(server).get('/stemi/cases').set({ apikey: 0 }).expect(401).then((response) => {
      assert(response.body.message === 'Please provide a valid key');
    })
  })
  it('Should throw error when value api key is object', async () => {
    await request(server).get('/stemi/cases').set({ apikey: { a: 'a' } }).expect(401).then((response) => {
      assert(response.body.message === 'Please provide a valid key');
    })
  })

  it('Should throw error when api key is incorrect', async () => {
    await request(server).get('/stemi/cases').set(wrongHeader).send().expect(401).then((response) => {
      assert(response.body.message === 'Please provide a valid key');
    })
  })

  it('Should throw error when api key is correct and spokeids are missing', async () => {
    await request(server).get('/stemi/cases').query().set(header).send().expect(400).then((response) => {
      assert(response.body.message === 'Center ids are empty');
    })
  })

  it('Should not throw error when case list is empty for a spoke ids', async () => {
    await request(server).get('/stemi/cases').query({ spokeIds: '0,12' }).set(header).send().expect(200).then((response) => {
      assert.deepEqual(response.body, []);
    })
  })

  //
  it('Should throw error when value of spokeIds is object', async () => {
    await request(server).get('/stemi/cases').query({ spokeIds: { a: '1', b: '2' } }).set(header).send().expect(500).then((response) => {
      // assert.deepEqual(response.body, []);
    })
  })

  it('Should return 10 cases', async () => {
    await request(server).get('/stemi/cases').query({ spokeIds }).set(header).send().expect(200).then((response) => {
      assert(response.body.length === 10)
    })
  })

  it('Should not throw error when value of page is string', async () => {
    await request(server).get('/stemi/cases').query({ spokeIds, page: 'test' }).set(header).send().expect(200)
      .then((response) => {
        assert(response.body.length === 10)
      })
  })
  it('Should not throw error when value page is null', async () => {
    await request(server).get('/stemi/cases').query({ spokeIds, page: null }).set(header).send().expect(200)
      .then((response) => {
        assert(response.body.length === 10)
      })
  })

  it('Should not throw error when value page is undefined', async () => {
    await request(server).get('/stemi/cases').query({ spokeIds, page: undefined }).set(header).send().expect(200)
      .then((response) => {
        assert(response.body.length === 10)
      })
  })
  it('Should not throw error when value page is 2', async () => {
    await request(server).get('/stemi/cases').query({ spokeIds, page: 2 }).set(header).send().expect(200)
      .then((response) => {
        assert(response.body.length === 10)
      })
  })
  it('Should not throw error when value page is 9999999999999999999', async () => {
    await request(server).get('/stemi/cases').query({ spokeIds, page: 9999999999999999999 }).set(header).send().expect(200)
      .then((response) => {
        assert(response.body.length === 0)
      })
  })

  it('Should not throw error when value limit is string', async () => {
    await request(server).get('/stemi/cases').query({ spokeIds, limit: 'test' }).set(header).send().expect(200)
      .then((response) => {
        assert(response.body.length === 10)
      })
  })
  it('Should not throw error when value limit is null', async () => {
    await request(server).get('/stemi/cases').query({ spokeIds, limit: null }).set(header).send().expect(200)
      .then((response) => {
        assert(response.body.length === 10)
      })
  })

  it('Should not throw error when value limit is undefined', async () => {
    await request(server).get('/stemi/cases').query({ spokeIds, limit: undefined }).set(header).send().expect(200)
      .then((response) => {
        assert(response.body.length === 10)
      })
  })
  it('Should not throw error when value limit is 0', async () => {
    await request(server).get('/stemi/cases').query({ spokeIds, limit: 0 }).set(header).send().expect(200)
      .then((response) => {

        assert(response.body.length === 10)
      })
  })
  it('Should not throw error when spokeIds contains multiple ids', async () => {
    await request(server).get('/stemi/cases').query({ spokeIds: '0,71,68/242,52/34/53,54,55,56,57,58' }).set(header).send().expect(200).then((response) => {
      assert.equal(response.body.length, 10);
    })
  })
})


describe('fetchSpokesDetailsByHub', () => {
  const hubId = 70

  it('Should throw error when key is empty', async () => {
    await request(server).get('/stemi/spokes').expect(401).then((response) => {
      assert(response.body.message === 'Please provide a valid key');
    })
  })

  it('Should throw error when key is incorrect', async () => {
    await request(server).get('/stemi/spokes').set(wrongHeader).send().expect(401).then((response) => {
      assert(response.body.message === 'Please provide a valid key');
    })
  })

  it('Should throw error when key is correct and Hub id is missing', async () => {
    await request(server).get('/stemi/spokes').query().set(header).send().expect(400).then((response) => {
      assert(response.body.message === 'Hub ID missing');
    })
  })

  it('Should not throw error when Hub id is correct', async () => {
    await request(server).get('/stemi/spokes').query({ hubId }).set(header).expect(200).then((response) => {
      // console.log("response", response.body)

    })
  })
})