const express = require('express');
const router = express.Router();
const { startManualIrrigation, stopManualIrrigation } = require('../controllers/ManualController');

router.route('/start')
    .post(async (req, res) => {
        const userId = req.body.userId;
        const electrovalveId = req.body.electrovalveId;
        const duration = req.body.duration;
        
        console.log('Received request body:', req.body);

        console.log('userId', userId);
        console.log('electrovalveId', electrovalveId);
        console.log('duration', duration);

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
        const dateStart = req.body.dateStart;

        try {
            await stopManualIrrigation(userId, electrovalveId, new Date(dateStart));
            res.status(200).json({"stopIrrigation": new Date()});
        } catch (error) {
            res.status(500).json({"error": error.message});
        }
    });

module.exports = router;
