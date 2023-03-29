const express = require('express');
const dotenv = require('dotenv');
const router = require('./routers/automaticRoute')

dotenv.config();
const app = express();

app.use(express.json());
app.use('/', router); 

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`API principale sur le port ${port}`);
});
