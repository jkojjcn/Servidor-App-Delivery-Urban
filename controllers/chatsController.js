const Chat = require('../models/chat');

module.exports = {

    async create(req, res, next){
        try {

            const chat = req.body;
            const data = await Chat.create(chat);
            return res.status(201).json({
                message: 'El chat se ha creado correctamente',
                success: true,
                data : data.id
            })

            
        } catch (error) {
            console.log(error);
            return res.status(501).json({
                message: 'No se pudo crear el chat',
                success: false,
                error : error
            });
            
        }
    }

}
