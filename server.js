import express from 'express';
import popRouter from './routes/population.js';
import gdpRouter from './routes/gdp.js';

const app = express();

app.use('/population', popRouter);
app.use('/gdp', gdpRouter);

app.listen(3001);