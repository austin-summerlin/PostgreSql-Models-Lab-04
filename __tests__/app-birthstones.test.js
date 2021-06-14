import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Birthstone from '../lib/models/Birthstone.js';

// CRUD
// C - create POST   INSERT
// R - read   GET    SELECT
// U - update PUT    UPDATE
// D - delete DELETE DELETE

describe('birthstone routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a birthstone via POST', async () => {
    const res = await request(app)
      .post('/api/v1/birthstones')
      .send({ name: 'emerald', zodiac: 'Gemini', color: 'Green' });

    expect(res.body).toEqual({
      id: '1',
      name: 'emerald',
      zodiac: 'Gemini',
      color: 'Green'
    });
  });

  it('finds a birthsone by id via GET', async () => {
    const birthstone = await Birthstone.insert({
      name: 'emerald',
      zodiac: 'Gemini',
      color: 'Green'
    });

    const res = await request(app).get(`/api/v1/birthstones/${birthstone.id}`);
    expect(res.body).toEqual(birthstone);
  });

  it('finds all birthstones via GET', async () => {
    const emerald = await Birthstone.insert({
      name: 'emerald',
      zodiac: 'Gemini',
      color: 'Green'
    });
    const garnet = await Birthstone.insert({
      name: 'garnet',
      zodiac: 'Aquarius',
      color: 'Red'
    });
    const amethyst = await Birthstone.insert({
      name: 'amethyst',
      zodiac: 'Pisces',
      color: 'Purple'
    });

    const res = await request(app).get('/api/v1/birthstones');
    expect(res.body).toEqual([emerald, garnet, amethyst]);
  });

  it('updates a birthstone by id via PUT', async () => {
    const emerald = await Birthstone.insert({
      name: 'emerald',
      zodiac: 'Gemini',
      color: 'Green'
    });
    const updatedEmerald = ({
      id: '1',
      name: 'emerald',
      zodiac: 'Gemini',
      color: 'Extremley Green'
    });

    const res = await request(app).put(`/api/v1/birthstones/${emerald.id}`).send(updatedEmerald);
    expect(res.body).toEqual(updatedEmerald);
  });

  it('deletes a birthstone by id via DELETE', async () => {
    const emerald = await Birthstone.insert({
      name: 'emerald',
      zodiac: 'Gemini',
      color: 'Green'
    });
    const res = await request(app).delete(`/api/v1/birthstones/${emerald.id}`).send(emerald);
    expect(res.body).toEqual(emerald);
  });
});

