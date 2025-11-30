const Reading = require('../models/Reading');
const Sensor = require('../models/Sensor');

class ReadingsService {
    async getAll() {
        return await Reading.find().populate('sensorId');
    }
    async getById(id) {
        return await Reading.findById(id);
    }

    async create(data) {
        const sensor = await Sensor.findById(data.sensorId);
        if (!sensor) throw new Error('Sensor (sensorId) no encontrado');
        return await new Reading(data).save();
    }

    async update(id, changes) {
        return await Reading.findByIdAndUpdate(id, changes, { new: true });
    }
    async delete(id) {
        return await Reading.findByIdAndDelete(id);
    }
}
module.exports = ReadingsService;