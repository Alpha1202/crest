import '@babel/polyfill';
import express from 'express';
import bodyparser from 'body-parser';
import { config } from 'dotenv';
import debug from 'debug';
import router from './routes';

config();

const debugLog = debug('check');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to crest finance APIs' });
});

app.use('/api/v1', router);


const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  debugLog('server is running');
});

export default app;
