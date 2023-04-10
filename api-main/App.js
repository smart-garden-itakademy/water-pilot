const express = require('express');
const dotenv = require('dotenv');
const automaticRoute = require('./routers/AutomaticRoute');
const userRoute = require ('./routers/UserRoute');
const electrovalveRoute = require ('./routers/ElectrovalveRoute')
const statsRoute = require ('./routers/StatsRoute');
const valveSettingRoute = require ('./routers/valveSettingRoute');
const scheduleRoute = require ('./routers/scheduleRoute');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();

app.use(express.json());

//parse pour le type mime application/x-www-urlencoded (formulaire)
app.use(bodyParser.urlencoded({extended: false}));

app.use('/automatic', automaticRoute);
app.use('/user', userRoute);
app.use('/electrovalve', electrovalveRoute);
app.use('/stats', statsRoute);
app.use('/valveSetting', valveSettingRoute);
app.use('/schedule', scheduleRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`API principale sur le port ${port}`);
});
