import supertest from 'supertest';
import axios from 'axios';

import { server } from '../server/server';

const request = supertest('http://localhost:3000');


describe('API response correctness', () => {
  jest.mock('axios', () => {
    const { fullResponse } = jest.requireActual('./apidummydata.js');

    return {
      data: fullResponse
    };
  });

  test('Response contains all expected keys', async (done) => {

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
