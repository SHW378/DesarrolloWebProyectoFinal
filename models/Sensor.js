const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['temperature', 'humidity', 'co2', 'noise'] },
    unit: { type: String, required: true },
    model: { type: String },
    location: { type: String },
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Sensor', SensorSchema);