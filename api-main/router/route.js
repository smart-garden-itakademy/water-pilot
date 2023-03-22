const express = require('express');
const router = express.Router();

const DataIrrigation = require('../models/schema');

router.route('/')
  .get((req, res) => {
    DataIrrigation.find()
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json(error))
  })
  // "Prototype de post pour l'arrosage".
  .post((req, res) => {
    const start = new Date("2000-01-01T20:00:02.000Z");
    const stop = new Date("2000-01-01T20:07:23.000Z");
    const duration = (stop - start) / 1000; // temps en secondes.

    const dataIrrigation = new DataIrrigation({
      start: start,
      stop: stop,
      duration: duration
    });

    dataIrrigation.save()
      .then(() => res.status(201).json({ message: "Données d'irrigation enregistrées." }))
      .catch((error) => res.status(400).json({ error }));
  });

module.exports = router;

