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

  it('finds all people via GET', async () => {
    const marlene = await People.insert({
      name: 'Marlene Dietrich',
      born: '27 Dec 1901',
      died: '06 May 1992'
    });
    const josephine = await People.insert({
      name: 'Josephine Baker',
      born: '03 June 1906',
      died: '12 April 1975'
    });
    const edith = await People.insert({
      name: 'Edith Piaf',
      born: '19 Dec 1915',
      died: '10 Oct 1963'
    });

    const res = await request(app).get('/api/v1/people');
    expect(res.body).toEqual([marlene, josephine, edith]);
  });

  it('UPDATES a person via PUT', async () => {
    const marlene = await People.insert({
      name: 'Marlene Dietrich',
      born: '27 Dec 1901',
      died: '06 May 1992'
    });
    const updatedMarlene = ({
      id: '1',
      name: 'Lily Marlene',
      born: '27 Dec 1901',
      died: '06 May 1992'
    });

    const res = await request(app).put(`/api/v1/people/${marlene.id}`).send(updatedMarlene);
    expect(res.body).toEqual(updatedMarlene);
  });
});
