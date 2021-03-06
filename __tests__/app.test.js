import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Dog from '../lib/models/Dog.js';

// CRUD
// C - create POST   INSERT
// R - read   GET    SELECT
// U - update PUT    UPDATE
// D - delete DELETE DELETE

describe('dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a dog via POST', async () => {
    const res = await request(app)
      .post('/api/v1/dogs')
      .send({ name: 'spot', age: 5, type: 'pitbull' });

    expect(res.body).toEqual({
      id: '1',
      name: 'spot',
      age: 5,
      type: 'pitbull'
    });
  });

  it('finds a dog by id via GET', async () => {
    const dog = await Dog.insert({
      name: 'sunny',
      age: 11,
      type: 'chihuhua'
    });

    const res = await request(app).get(`/api/v1/dogs/${dog.id}`);
    expect(res.body).toEqual(dog);
  });

  it('finds all dogs via GET', async () => {
    const spot = await Dog.insert({
      name: 'spot',
      age: 5,
      type: 'pitbull'
    });
    const sunny = await Dog.insert({
      name: 'sunny',
      age: 11,
      type: 'chihuhua'
    });
    const kota = await Dog.insert({
      name: 'kota',
      age: 7,
      type: 'collie'
    });

    const res = await request(app).get('/api/v1/dogs');
    expect(res.body).toEqual([spot, sunny, kota]);
  });

  it('updates a dog by id via PUT', async () => {
    const spot = await Dog.insert({
      name: 'spot',
      age: 5,
      type: 'pitbull'
    });
    const updatedSpot = ({
      id: '1',
      name: 'spot',
      age: 6,
      type: 'pitbull'
    });

    const res = await request(app).put(`/api/v1/dogs/${spot.id}`).send(updatedSpot);
    expect(res.body).toEqual(updatedSpot);
  });

  it('deletes a dog by id via DELETE', async () => {
    const spot = await Dog.insert({
      name: 'spot',
      age: 5,
      type: 'pitbull'
    });
    const res = await request(app).delete(`/api/v1/dogs/${spot.id}`).send(spot);
    expect(res.body).toEqual(spot);
  });
});


