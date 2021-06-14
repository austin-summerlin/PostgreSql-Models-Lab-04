import { Router } from 'express';
import People from '../models/People.js';

export default Router()
  .post('/api/v1/people', async (req, res) => {
    try {
      const people = await People.insert(req.body);
      res.send(people);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/people/:id', async (req, res) => {
    try {
      const people = await People.findById(req.params.id);
      res.send(people);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/people', async (req, res) => {
    try {
      const people = await People.findAll();
      res.send(people);
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  })

  .put('/api/v1/people/:id', async (req, res) => {
    try {
      const people = await People.update(req.body, req.params.id);
      res.send(people);
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  });




