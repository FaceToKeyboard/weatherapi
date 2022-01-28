import supertest from 'supertest';

const request = supertest('http://localhost:3000');

describe('API response correctness', () => {
  test('Response contains all expected keys', async (done) => {
    // make an api call to the API, then see if the return object/response
    // has all of the expected keys.

    const response = await request.get('/local/80113');

    expect(response.status).toBe(200);
    expect(response.status).toHaveProperty('city');
    expect(response.status).toHaveProperty('conditions');
    expect(response.status).toHaveProperty('high_temp');
    expect(response.status).toHaveProperty('low_temp');
  });

});

describe('Upstream API error handling', () => {
  test('Error response when upstream API fails', (done) => {

  });
});
