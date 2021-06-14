import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Singer from '../lib/models/Singer.js';

// CRUD
// C - create POST   INSERT
// R - read   GET    SELECT
// U - update PUT    UPDATE
// D - delete DELETE DELETE

describe('singers routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a singer via POST', async () => {
    const res = await request(app)
      .post('/api/v1/singers')
      .send({ name: 'David Bowie', realname: 'David Jones' });

    expect(res.body).toEqual({
      name: 'David Bowie',
      realname: 'David Jones',
      id: '1'
    });
  });

  it('finds a singer by id via GET', async () => {
    const singer = await Singer.insert({
      name: 'Patti Smith',
      realname: 'Patricia Lee Smith'
    });

    const res = await request(app).get(`/api/v1/singers/${singer.id}`);
    expect(res.body).toEqual(singer);
  });

  it('finds all singers via GET', async () => {
    const bowie = await Singer.insert({
      name: 'David Bowie',
      realname: 'David Jones'
    });
    const patti = await Singer.insert({
      name: 'Patti Smith',
      realname: 'Patricia Lee Smith'
    });
    const gaga = await Singer.insert({
      name: 'Lady Gaga',
      realname: 'Stefani Germanotta'
    });

    const res = await request(app).get('/api/v1/singers');
    expect(res.body).toEqual([bowie, patti, gaga]);
  });
});

