import express from 'express';
import bodyparser from 'body-parser';
import expressValidator from 'express-validator';
import router from './api/routes';


const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(expressValidator());



app.get('/', (req, res) => {
  res.status(200).send({ message: 'server is running' });
});

app.use('/api/v1', router);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('server is running');
});

export default app;
