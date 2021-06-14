import { Router } from 'express';
import Singer from '../models/Singer.js';

export default Router()
  .post('/api/v1/singers', async (req, res) => {
    try {
      const singer = await Singer.insert(req.body);
      res.send(singer);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/singers/:id', async (req, res) => {
    try {
      const singer = await Singer.findById(req.params.id);
      res.send(singer);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/singers', async (req, res) => {
    try {
      const singer = await Singer.findAll();
      res.send(singer);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .put('/api/v1/singers/:id', async (req, res) => {
    try {
      const singer = await Singer.update(req.body, req.params.id);
      res.send(singer);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .delete('/api/v1/singers/:id', async (req, res) => {
    try {
      const singer = await Singer.delete(req.params.id);
      res.send(singer);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });




