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

    async create(req, res, next) {
        try {
            
            let message = req.body;
            
            const data = await Order.create(message);
            
            console.log('SE CREO LA NOTIFICACION');

            // RECORRER TODOS LOS PRODUCTOS AGREGADOS A LA ORDEN

            return res.status(201).json({
                success: true,
                message: 'La orden se creo correctamente',
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error creando la orden',
                error: error
            });
        }
    },


}