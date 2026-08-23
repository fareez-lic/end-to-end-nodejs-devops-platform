const request = require('supertest');
const app = require('./app');

describe('DevOps App Tests', () => {

  test('GET / returns 200 and message', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('🚀 DevOps Node App is Live!');
  });

  test('GET /health returns healthy', async () => {
    const res = await request(app).get('/health');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  test('GET /about returns project info', async () => {
    const res = await request(app).get('/about');

    expect(res.statusCode).toBe(200);
    expect(res.body.project).toBeDefined();
  });

});