const Sensor = require('../models/Sensor');
const Reading = require('../models/Reading');

class SensorsService {
    async getAll() {
        return await Sensor.find();
    }
    async getById(id) {
        return await Sensor.findById(id);
    }
    async create(data) {
        return await new Sensor(data).save();
    }
    async update(id, changes) {
        return await Sensor.findByIdAndUpdate(id, changes, { new: true });
    }

    async delete(id) {
        const reading = await Reading.findOne({ sensorId: id });
        if (reading) {
            const error = new Error('No se puede eliminar: El sensor tiene lecturas registradas.');
            error.statusCode = 409;
            throw error;
        }
        return await Sensor.findByIdAndDelete(id);
    }
}
module.exports = SensorsService;