const request = require('supertest');
const axios = require('axios');

const server = require('../server/server.js');
const { fullResponse, missingWeather } = require('./apidummydata.js');

jest.mock('axios');

describe('API response correctness', () => {
  axios.get.mockResolvedValue({
    data: fullResponse,
  })

  test('Response contains all expected keys', async () => {
    const response = await request(server).get('/local/80113');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('city');
    expect(response.body).toHaveProperty('conditions');
    expect(response.body).toHaveProperty('high_temp');
    expect(response.body).toHaveProperty('low_temp');
  });
});

describe.skip('Upstream API error handling', () => {
  test('Error response when upstream API fails', (done) => {

  });
});

describe.skip('User input error handling', () => {
  test('Error response when invalid zipcode/invalid format is entered', (done) => {

  });
});
