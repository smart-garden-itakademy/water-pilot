const express = require('express');
const router = express.Router();

const { startManualIrrigation, stopManualIrrigation, timers } = require('../controllers/ManualController');

router.route('/start')
    .post(async (req, res) => {
        const userId = req.body.userId;
        const electrovalveId = req.body.electrovalveId;
        const duration = req.body.duration;

        try {
            const dateStart = await startManualIrrigation(userId, electrovalveId, duration);
            res.status(200).json({"startIrrigation": dateStart});
        } catch (error) {
            res.status(500).json({"error": error.message});
        }
    });

    router.route('/stop')
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
            await stopManualIrrigation(userId, electrovalveId, dateStart);
            res.status(200).json({"stopIrrigation": new Date()});
        } catch (error) {
            res.status(500).json({"error": error.message});
        }
    });

module.exports = router;
