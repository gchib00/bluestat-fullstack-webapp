import express from 'express';
import popRouter from './routes/population.js';

const app = express();

app.get('/', (req, res) => {
    console.log('test');
    res.send('hi')
});

app.use('/population', popRouter);


app.listen(3001);