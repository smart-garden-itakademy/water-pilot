const mongoose = require('mongoose');

const dataSchema = mongoose.Schema ({
    start: { type: Date, required: true },
    stop: { type: Date, required: true },
    duration: { type: Number, required: true } // donnée calculée. 
});

module.exports = mongoose.model('DataIrrigation', dataSchema);

