const request = require('supertest');
const app = require('../server/controllers');
// const { pool } = require('../server');

describe('GET questions', () => {
  describe('given a product ID', () => {
    test('should return a 200 status code', async () => {
      const response = await request(app).get('/qa/1');
      expect(response.statusCode).toBe(200);
    });
    test('should return an array of questions', async () => {
      const response = await request(app).get('/qa/1');
      expect(Array.isArray(response.body.results)).toBe(true);
    });
  });
});

describe('GET answers', () => {
  describe('given an answer ID', () => {
    test('should return a 200 status code', async () => {
      const response = await request(app).get('/qa/1/answers');
      expect(response.statusCode).toBe(200);
    });
    test('should return an array of answerss', async () => {
      const response = await request(app).get('/qa/1/answers');
      expect(Array.isArray(response.body.results)).toBe(true);
    });
  });
});
