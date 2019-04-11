import express from 'express';
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
import router from './api/routes';

dotenv.config();

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to crest finance APIs' });
});

app.use('/api/v1', router);


const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log('server is running');
});

export default app;
