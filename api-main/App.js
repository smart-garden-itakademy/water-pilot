const express = require('express');
const dotenv = require('dotenv');

const autoRoute = require('./routers/AutoRoute');
const manualRoute = require('./routers/ManualRoute');
const userRoute = require ('./routers/UserRoute');
const statsRoute = require ('./routers/StatsRoute');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/manual', manualRoute)
app.use('/auto', autoRoute);
app.use('/user', userRoute);
app.use('/stats', statsRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`API principale sur le port ${port}`);
});
