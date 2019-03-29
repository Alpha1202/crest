import express from 'express';
import bodyparser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.status(200).send({ message: 'server is running' });
});

app.listen(PORT, () => {
  console.log('server is running');
});

export default app;