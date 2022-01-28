const request = require('supertest');
const axios = require('axios');

const server = require('../server/server.js');
const {
  fullResponse,
  emptyData,
  missingWeather,
  missingMain,
  missingTemps,
  missingName,
  missingWeatherDescription,
} = require('./apidummydata.js');

jest.mock('axios');

describe('Upstream response OK, all data available', () => {

  test('when upstream contains all expected keys', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: fullResponse,
    });
    const response = await request(server).get('/local/80113');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('city');
    expect(response.body).toHaveProperty('conditions');
    expect(response.body).toHaveProperty('high_temp');
    expect(response.body).toHaveProperty('low_temp');
    expect(response.body.city).toBe('Englewood');
    expect(response.body.conditions).toBe('clear sky');
    expect(response.body.high_temp).toBe(6);
    expect(response.body.low_temp).toBe(-7);
  });
});

describe('Upstream response ok, but missing data', () => {
  test('when upstream returns empty response', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: {},
    });
    const response = await request(server).get('/local/80113');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('city');
    expect(response.body).toHaveProperty('conditions');
    expect(response.body).toHaveProperty('high_temp');
    expect(response.body).toHaveProperty('low_temp');
    expect(response.body.city).toBe('No data');
    expect(response.body.conditions).toBe('No data');
    expect(response.body.high_temp).toBe('No data');
    expect(response.body.low_temp).toBe('No data');

  });

  test('when upstream missing .main', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: missingMain,
    });
    const response = await request(server).get('/local/80113');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('city');
    expect(response.body).toHaveProperty('conditions');
    expect(response.body).toHaveProperty('high_temp');
    expect(response.body).toHaveProperty('low_temp');
    expect(response.body.city).toBe('Englewood');
    expect(response.body.conditions).toBe('clear sky');
    expect(response.body.high_temp).toBe('No data');
    expect(response.body.low_temp).toBe('No data');
  });

  test('when upstream missing .main.temp*', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: missingTemps,
    });
    const response = await request(server).get('/local/80113');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('city');
    expect(response.body).toHaveProperty('conditions');
    expect(response.body).toHaveProperty('high_temp');
    expect(response.body).toHaveProperty('low_temp');
    expect(response.body.city).toBe('Englewood');
    expect(response.body.conditions).toBe('clear sky');
    expect(response.body.high_temp).toBe('No data');
    expect(response.body.low_temp).toBe('No data');
  });

  test('when upstream missing .weather', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: missingWeather,
    });
    const response = await request(server).get('/local/80113');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('city');
    expect(response.body).toHaveProperty('conditions');
    expect(response.body).toHaveProperty('high_temp');
    expect(response.body).toHaveProperty('low_temp');
    expect(response.body.city).toBe('Englewood');
    expect(response.body.conditions).toBe('No data');
    expect(response.body.high_temp).toBe(6);
    expect(response.body.low_temp).toBe(-7);
  });

  test('when upstream missing .weather[0].description', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: missingWeatherDescription,
    });
    const response = await request(server).get('/local/80113');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('city');
    expect(response.body).toHaveProperty('conditions');
    expect(response.body).toHaveProperty('high_temp');
    expect(response.body).toHaveProperty('low_temp');
    expect(response.body.city).toBe('Englewood');
    expect(response.body.conditions).toBe('No data');
    expect(response.body.high_temp).toBe(6);
    expect(response.body.low_temp).toBe(-7);
  });


  test('when upstream missing .name', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: missingName,
    });
    const response = await request(server).get('/local/80113');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('city');
    expect(response.body).toHaveProperty('conditions');
    expect(response.body).toHaveProperty('high_temp');
    expect(response.body).toHaveProperty('low_temp');
    expect(response.body.city).toBe('No data');
    expect(response.body.conditions).toBe('clear sky');
    expect(response.body.high_temp).toBe(6);
    expect(response.body.low_temp).toBe(-7);
  });
});

describe('User input error handling', () => {
  test('when invalid zipcode format is entered', async () => {
    var response = await request(server).get('/local/abcsd');

    expect(response.status).toBe(404);
    expect(response.body).toBe('city not found');

    response = await request(server).get(`/local/&(#^1`);

    expect(response.status).toBe(404);
    expect(response.body).toBe('city not found');


  });
});

describe.skip('Upstream API connectivity issues', () => {
  test('when upstream does not respond at all');

  test('when upstream takes too long to respond');
})
