import { Router } from 'express';
import Dog from '../models/Dog';

export default Router()
  .post('/api/v1/dogs', async (req, res) => {
    try {
      const dog = await Dog.insert(req.body);
      res.send(dog);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/dogs/:id', async (req, res) => {
    try {
      const dog = await Dog.findById(req.params.id);
      res.send(dog);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

