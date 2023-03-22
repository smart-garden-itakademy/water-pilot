const express = require('express');

const database = require('./cores/database');
const router = require('./router/route')

const app = express();

app.use(express.json());
app.use('/', router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`API principale sur le port ${port}`);
});