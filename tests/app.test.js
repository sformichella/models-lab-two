const request = require('supertest');
const app = require('../lib/app');

const calculusTheorem = {
  id: "1",
  title: "Fundamental Theorem of Calculus",
  description: "Describes a fundamental relationship betweem derivatives and anti-derivatives",
  url: "https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus"
}

describe('Theorem routes', () => {
  it('should return some theorems', async () => {
    const response = await request(app)
      .get('/theorems');

    expect(response.body).toEqual(calculusTheorem);
  })
})
