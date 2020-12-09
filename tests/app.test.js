const request = require('supertest');
const fileSystem = require('fs').promises;
const pool = require('../../postgres-models-lab/lib/utils/pool');
const app = require('../lib/app');

const calculusTheoremBody = {
  title: "Fundamental Theorem of Calculus",
  description: "Describes a fundamental relationship betweem derivatives and anti-derivatives",
  url: "https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus"
}

const calculusTheorem = {
  id: "1",
  title: "Fundamental Theorem of Calculus",
  description: "Describes a fundamental relationship betweem derivatives and anti-derivatives",
  url: "https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus"
}

const algebraTheoremBody = {
  title: "Fundamental Theorem of Algebra",
  description: "Every polynomial with complex coefficients has a root in the complex numbers",
  url: "https://en.wikipedia.org/wiki/Fundamental_theorem_of_algebra"
}

const algebraTheorem = {
  id: "2",
  title: "Fundamental Theorem of Algebra",
  description: "Every polynomial with complex coefficients has a root in the complex numbers",
  url: "https://en.wikipedia.org/wiki/Fundamental_theorem_of_algebra"
}


describe('Theorem routes', () => {

  beforeAll(async () => {
    const setupSQL = await fileSystem.readFile('./sql/setup.sql', 'utf-8');

    await pool.query(setupSQL);
  })

  it('should create a theorem and return it', async () => {
    const response = await request(app)
      .post('/theorems')
      .send(calculusTheoremBody);

    expect(response.body).toEqual(calculusTheorem)
  })

  it('should return a theorem', async () => {
    const response = await request(app)
      .get('/theorems/1')

    expect(response.body).toEqual(calculusTheorem)
  })

  it('should return some theorems', async () => {
    await request(app)
      .post('/theorems')
      .send(algebraTheoremBody)

    const response = await request(app)
      .get('/theorems')

    expect(response.body).toEqual([calculusTheorem, algebraTheorem])
  })

  it('should update a theorem', async () => {
    const response = await request(app)
      .put('/theorems/1')
      .send({
        title: "Fundamental Theorem of Calculus Two",
        description: "Describes a fundamental relationship betweem derivatives and anti-derivatives",
        url: "https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus"
      })
    
    expect(response.body).toEqual({
      id: "1",
      title: "Fundamental Theorem of Calculus Two",
      description: "Describes a fundamental relationship betweem derivatives and anti-derivatives",
      url: "https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus"
    })
  })

  it('should delete a theorem', async () => {
    const response = await request(app)
      .delete('/theorems/2')

    expect(response.body).toEqual(algebraTheorem)
    
  })
})
