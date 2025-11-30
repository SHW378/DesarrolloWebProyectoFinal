const Zone = require('../models/Zone');
const Device = require('../models/Device');

class ZonesService {
    async getAll() {
        return await Zone.find();
    }
    async getById(id) {
        return await Zone.findById(id);
    }
    async create(data) {
        return await new Zone(data).save();
    }
    async update(id, changes) {
        return await Zone.findByIdAndUpdate(id, changes, { new: true });
    }

    async delete(id) {
        const device = await Device.findOne({ zoneId: id });
        if (device) {
            const error = new Error('No se puede eliminar: La zona tiene dispositivos asociados.');
            error.statusCode = 409;
            throw error;
        }
        return await Zone.findByIdAndDelete(id);
    }
}
module.exports = ZonesService;