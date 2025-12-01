const Reading = require('../models/Reading');
const Sensor = require('../models/Sensor');

class ReadingsService {
    // Obtener todas las lecturas con datos del sensor
    async getAll() {
        return await Reading.find().populate('sensorId');
    }
    // Obtener lectura por ID
    async getById(id) {
        return await Reading.findById(id);
    }

    // Registrar nueva lectura (valida sensor)
    async create(data) {
        const sensor = await Sensor.findById(data.sensorId);
        if (!sensor) throw new Error('Sensor (sensorId) no encontrado');
        return await new Reading(data).save();
    }

    // Actualizar lectura
    async update(id, changes) {
        return await Reading.findByIdAndUpdate(id, changes, { new: true });
    }
    // Eliminar lectura
    async delete(id) {
        return await Reading.findByIdAndDelete(id);
    }
}
module.exports = ReadingsService;