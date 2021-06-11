import { Router } from 'express';
import Dog from '../models/Dog';

export default Router()
  .post('/api/vi/dogs', async (req, res) => {
    try {
      const dog = await Dog.insert(req.body);
      res.send(dog);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

