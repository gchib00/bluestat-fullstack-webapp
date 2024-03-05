import express from 'express';
import cors from 'cors';
import popRouter from './routes/population.js';
import gdpRouter from './routes/gdp.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000' // Client-side URL when running react app locally
}));
app.use(express.static('build'));
app.use('/population', popRouter);
app.use('/gdp', gdpRouter);

app.listen(3001);