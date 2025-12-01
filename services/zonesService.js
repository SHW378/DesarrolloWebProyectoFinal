const Zone = require('../models/Zone');
const Device = require('../models/Device');

class ZonesService {
    // Obtener todas las zonas
    async getAll() {
        return await Zone.find();
    }
    // Obtener zona por ID
    async getById(id) {
        return await Zone.findById(id);
    }
    // Crear nueva zona
    async create(data) {
        return await new Zone(data).save();
    }
    // Actualizar zona existente
    async update(id, changes) {
        return await Zone.findByIdAndUpdate(id, changes, { new: true });
    }

    // Eliminar zona (verifica dependencias)
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