const Device = require('../models/Device');
const User = require('../models/User');
const Zone = require('../models/Zone');

class DevicesService {
    async getAll() {
        return await Device.find().populate('ownerId').populate('zoneId');
    }
    async getById(id) {
        return await Device.findById(id).populate('ownerId').populate('zoneId');
    }

    async create(data) {
        const user = await User.findById(data.ownerId);
        if (!user) throw new Error('Usuario (ownerId) no encontrado');

        const zone = await Zone.findById(data.zoneId);
        if (!zone) throw new Error('Zona (zoneId) no encontrada');

        return await new Device(data).save();
    }

    async update(id, changes) {
        return await Device.findByIdAndUpdate(id, changes, { new: true });
    }
    async delete(id) {
        return await Device.findByIdAndDelete(id);
    }
}
module.exports = DevicesService;