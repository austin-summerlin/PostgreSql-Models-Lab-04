import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Car from '../lib/models/Car.js';

// CRUD
// C - create POST   INSERT
// R - read   GET    SELECT
// U - update PUT    UPDATE
// D - delete DELETE DELETE

describe('car routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a car via POST', async () => {
    const res = await request(app)
      .post('/api/v1/cars')
      .send({ car: 'Ford Mustang', color: 'Forest Green', year: 1968 });

    expect(res.body).toEqual({
      id: '1',
      car: 'Ford Mustang',
      color: 'Forest Green',
      year: 1968
    });
  });


});
