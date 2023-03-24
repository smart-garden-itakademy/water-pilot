const express = require('express');
const router = express.Router();

//get pressure
router.route('/sensors')
    .get((req,res) => {
        res.status(200).json({
            "pressure":100,
            "temperature":22,
            "humidity":60,
            "soil_moisture":22
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