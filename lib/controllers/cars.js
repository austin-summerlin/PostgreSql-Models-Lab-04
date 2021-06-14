import { Router } from 'express';
import Car from '../models/Car.js';

export default Router()
  .post('/api/v1/cars', async (req, res) => {
    try {
      const car = await Car.insert(req.body);
      res.send(car);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

