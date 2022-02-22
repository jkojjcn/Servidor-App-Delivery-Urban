const Message = require('../models/message');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');

module.exports = {

    async findById(req, res, next) {
        try {
            const id_user = req.params.id_user; // CLIENTE
            const data = await Message.findMessage(id_user);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al obtener los mensajes`,
                success: false,
                error: error
            });
        }
    },
}