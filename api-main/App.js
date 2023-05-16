const express = require('express');
const dotenv = require('dotenv');
const userRoute = require ('./routers/UserRoute');
const electrovalveRoute = require ('./routers/ElectrovalveRoute')
const statsRoute = require ('./routers/StatsRoute');
const bodyParser = require('body-parser');
const wateringRoute = require('./routers/WateringRoute');
require ('./controllers/AutoController');
const valveSettingsRoute = require ('./routers/ValveSettingsRoute');
const scheduleRoute = require ('./routers/ScheduleRoute');

const {errorLogger, errorResponder} = require('./middlewares/ErrorHandler');
const helmet = require('helmet');


dotenv.config();
const app = express();
//use helmet for security header
app.use(helmet());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/watering', wateringRoute)
app.use('/user', userRoute);
app.use('/electrovalve/:idValve/valveSettings/:idSetting/schedule',(req,res,next)=>{
    req.idValve = parseInt(req.params.idValve);
    req.idSetting = parseInt(req.params.idSetting);
    next()
}, scheduleRoute);
app.use('/electrovalve/:idValve/valveSettings',(req,res,next)=> {
    req.idValve = parseInt(req.params.idValve);
    next()
},valveSettingsRoute );
app.use('/electrovalve', electrovalveRoute);
app.use('/stats', statsRoute);

//middleware pour gérer les erreurs
app.use(errorLogger)
app.use(errorResponder)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`API principale sur le port ${port}`);
});
