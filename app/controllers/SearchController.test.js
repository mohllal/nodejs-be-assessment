const faker = require('faker');
const supertest = require('supertest');
const { app } = require('../../index');

describe('SearchController Test', () => {
  it('should return 400 status code for missing the "q" query param', (done) => {
    supertest(app)
      .get('/api/v1/search')
      .set('Accept', 'application/json')
      .expect(400, {
        code: 'BAD_REQUEST',
        response: '"q" is required',
      }, done);
  });

  it('should return 400 status code for sending invalid "page" query param', (done) => {
    supertest(app)
      .get('/api/v1/search')
      .query({ q: faker.random.word() })
      .query({ page: faker.random.number(0) })
      .set('Accept', 'application/json')
      .expect(400, {
        code: 'BAD_REQUEST',
        response: '"page" must be larger than or equal to 1',
      }, done);
  });

  it('should return 400 status code for sending invalid "field" query param', (done) => {
    supertest(app)
      .get('/api/v1/search')
      .query({ q: faker.random.word() })
      .query({ field: faker.random.word() })
      .set('Accept', 'application/json')
      .expect(400, {
        code: 'BAD_REQUEST',
        response: '"field" must be one of [title, author, all]',
      }, done);
  });

  it('should return 400 status code for sending additional query param', (done) => {
    supertest(app)
      .get('/api/v1/search')
      .query({ q: faker.random.word() })
      .query({ key: faker.random.word() })
      .set('Accept', 'application/json')
      .expect(400, {
        code: 'BAD_REQUEST',
        response: '"key" is not allowed',
      }, done);
  });

  it('should return 200 status code', (done) => {
    // this.timeout(500);
    supertest(app)
      .get('/api/v1/search')
      .query({ q: faker.random.word() })
      .query({ page: faker.random.number({ min: 1 }) })
      .query({ field: 'title' })
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
