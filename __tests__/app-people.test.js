import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import People from '../lib/models/People.js';

// CRUD
// C - create POST   INSERT
// R - read   GET    SELECT
// U - update PUT    UPDATE
// D - delete DELETE DELETE

describe('people routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creats a person via POST', async () => {
    const res = await request(app)
      .post('/api/v1/people')
      .send({ name: 'Marlene Dietrich', born: '27 Dec 1901', died: '06 May 1992' });

    expect(res.body).toEqual({
      id: '1',
      name: 'Marlene Dietrich',
      born: '27 Dec 1901',
      died: '06 May 1992'
    });
  });

  it('finds a person by id via GET', async () => {
    const people = await People.insert({
      name: 'Marlene Dietrich',
      born: '27 Dec 1901',
      died: '06 May 1992'
    });
    const res = await request(app).get(`/api/v1/people/${people.id}`);
    expect(res.body).toEqual(people);
  });
});
