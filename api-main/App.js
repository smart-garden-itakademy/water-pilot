const express = require('express');
const dotenv = require('dotenv');
const automaticRoute = require('./routers/automaticRoute');
const userRoute = require ('./routers/UserRoute')
const bodyParser = require('body-parser');

dotenv.config();
const app = express();

app.use(express.json());

//parse pour le type mime application/x-www-urlencoded (formulaire)
app.use(bodyParser.urlencoded({extended: false}));

app.use('/automatic', automaticRoute);
app.use('/user', userRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`API principale sur le port ${port}`);
});
