const Message = require('../models/message');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');

module.exports = {

    async create(req, res, next) {
        try {

            const message = req.body;
            const data = await Message.create(message);

            return res.status(201).json({
                success: true,
                message: 'Mensaje enviado',
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'No se pudo crear el mensaje',
                error: error
            });
        }
    },
}