const express = require('express');
const router = express.Router();

const { startIrrigation, stopIrrigation, timers } = require('../controllers/WateringController');

router.route('/manual/start')
    .post(async (req, res) => {
        const userId = req.body.userId;
        const electrovalveId = req.body.electrovalveId;
        const duration = req.body.duration;

        try {
            const dateStart = await startIrrigation(userId, electrovalveId, duration);
            res.status(200).json({"startManualIrrigation": dateStart});
        } catch (error) {
            res.status(500).json({"error": error.message});
        }
    });

    router.route('/manual/stop')
    .post(async (req, res) => {
        const userId = req.body.userId;
        const electrovalveId = req.body.electrovalveId;

        const timerKey = `${userId}-${electrovalveId}`;
        const dateStart = timers[timerKey]?.dateStart;

        if (!dateStart) {
            res.status(404).json({ "error": "Irrigation not found" });
            return;
        }

        try {
            await stopIrrigation(userId, electrovalveId, dateStart);
            res.status(200).json({"stopManualIrrigation": new Date()});
        } catch (error) {
            res.status(500).json({"error": error.message});
        }
    });

module.exports = router;
