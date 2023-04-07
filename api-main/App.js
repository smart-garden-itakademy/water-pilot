const express = require('express');
const dotenv = require('dotenv');

require('./controllers/AutoController');

const wateringRoute = require('./routers/WateringRoute');
const userRoute = require ('./routers/UserRoute');
const statsRoute = require ('./routers/StatsRoute');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/watering', wateringRoute)
app.use('/user', userRoute);
app.use('/stats', statsRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`API principale sur le port ${port}`);
});
