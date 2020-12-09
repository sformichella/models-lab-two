const request = require('supertest');
const fileSystem = require('fs').promises;
const pool = require('../../postgres-models-lab/lib/utils/pool');
const app = require('../lib/app');


describe('Theorem routes', () => {

  beforeAll(async () => {
    const setupSQL = await fileSystem.readFile('./sql/setup.sql', 'utf-8');

    await pool.query(setupSQL);
  })



  it('should create a theorem and return it', async () => {
    const theorem = {
      title: "Fundamental Theorem of Calculus",
      description: "Describes a fundamental relationship betweem derivatives and anti-derivatives",
      url: "https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus"
    }

    const response = await request(app)
      .post('/make/theorem')
      .send(theorem);

    expect(response.body).toEqual({
      id: "1",
      title: "Fundamental Theorem of Calculus",
      description: "Describes a fundamental relationship betweem derivatives and anti-derivatives",
      url: "https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus"
    })
  })
})
