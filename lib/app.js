import express from 'express';
import dogController from './controllers/dogs.js';
import peopleController from './controllers/people.js';
import singerController from './controllers/singers.js';
import carController from './controllers/cars.js';
import birthstoneController from './controllers/birthstones.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

const app = express();

app.use(express.json());

app.use(dogController);
app.use(peopleController);
app.use(singerController);
app.use(carController);
app.use(birthstoneController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
