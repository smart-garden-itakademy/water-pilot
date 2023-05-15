const express = require('express');
const router = express.Router();
const {test} = require('../Controller/test');
const {readBME280} = require('../Controller/BmeController');
const {valveOn} = require('../Controller/ValveOn');


router.route('/')
    .get((req,res) => {
        res.status(200).json({"message":"Hello World"});
    })
router.route('/test')
    .get((req,res) => {
        const exe = test();
        res.status(200).json({"message":"Hello World"});
    })
router.route('/bme')
    .get((req,res) => {
        const bmeValues = readBME280();
        if (bmeValues !== null) {
            // Faites quelque chose avec les valeurs lues du capteur BME280 ici
            console.log('bmeValues', bmeValues);
        }
        res.status(200).json({
            "message":"Hello World",
            "BME280":bmeValues
            });
    })
router.route('/valveon')
    .get((req,res) => {
        const start= valveOn();
       console.log("start",start);
        res.status(200).json({
            "message":"start irrigation",
            });
    })

//get pressure
router.route('/sensors')
    .get((req,res) => {
        res.status(200).json({
            "pressure":100,
            "temperature":25,
            "humidity":60,
            "soil_moisture":18
        });
    })

//start irrigation
router.route('/startIrrigation')
    .post((req,res) => {
        let dateNow = new Date();
        //code pour ouvrir l'éléctrovalve:

        //confirme l'ouverture à l'API Main
        res.status(200).json({"startIrrigation":dateNow});
    })

//stop irrigation
router.route('/stopIrrigation')
    .post((req,res) => {
        let dateNow = new Date();
        //code pour fermer l'éléctrovalve:

        //confirme la fermeture à l'API Main
        res.status(200).json({"stopIrrigation":dateNow});
    })

module.exports = router;
