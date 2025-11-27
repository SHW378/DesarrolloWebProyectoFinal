const User = require('../models/User');
const Device = require('../models/Device');

class UsersService {
    async getAll() { return await User.find(); }
    async getById(id) { return await User.findById(id); }
    async create(data) { return await new User(data).save(); }
    async update(id, changes) { return await User.findByIdAndUpdate(id, changes, { new: true }); }

    async delete(id) {
        const device = await Device.findOne({ ownerId: id });
        if (device) {
            const error = new Error('No se puede eliminar: Usuario tiene dispositivos.');
            error.statusCode = 409;
            throw error;
        }
        return await User.findByIdAndDelete(id);
    }
}
module.exports = UsersService;