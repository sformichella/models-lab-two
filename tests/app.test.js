const request = require('supertest');
const app = require('../lib/app');

describe('Theorem routes', () => {
  it('should return a theorem', async () => {
    return request(app)
      .get('/')
      .then(res => expect(res.body.message).toEqual('Hi'))
  })
})
