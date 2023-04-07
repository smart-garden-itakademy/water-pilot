const express = require('express');
const dotenv = require('dotenv');
const userRoute = require ('./routers/UserRoute');
const electrovalveRoute = require ('./routers/ElectrovalveRoute')
const statsRoute = require ('./routers/StatsRoute');
const valveSettingRoute = require ('./routers/valveSettingRoute');
const bodyParser = require('body-parser');
require('./controllers/AutoController');
const wateringRoute = require('./routers/WateringRoute');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/watering', wateringRoute)
app.use('/user', userRoute);
app.use('/electrovalve', electrovalveRoute);
app.use('/stats', statsRoute);
app.use('/valveSetting', valveSettingRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`API principale sur le port ${port}`);
});
