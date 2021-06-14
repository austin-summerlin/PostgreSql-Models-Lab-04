import { Router } from 'express';
import Birthstone from '../models/Birthstone.js';

export default Router()
  .post('/api/v1/birthstones', async (req, res) => {
    try {
      const birthstone = await Birthstone.insert(req.body);
      res.send(birthstone);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/birthstones/:id', async (req, res) => {
    try {
      const birthstone = await Birthstone.findById(req.params.id);
      res.send(birthstone);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/birthstones', async (req, res) => {
    try {
      const birthstone = await Birthstone.findAll();
      res.send(birthstone);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .put('/api/v1/birthstones/:id', async (req, res) => {
    try {
      const birthstone = await Birthstone.update(req.body, req.params.id);
      res.send(birthstone);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/birthstones/:id', async (req, res) => {
    try {
      const birthstone = await Birthstone.delete(req.params.id);
      res.send(birthstone);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

