const Chat = require('../models/chat');

module.exports = {

    async create(req, res, next){
        try {

            const chat = req.body;

            const existChat = await Chat.findByUser1AndUser2(chat.id_user1, chat.id_user2);
            if (existChat){
                console.log('ACTUALIZAR CHAT');
                await Chat.update(chat);
                return res.status(201).json({
                    message: 'El chat se ha actualizado correctamente',
                    success: true,
                    data : existChat.id
                });
            } else {
                console.log('intento de crear chat');
                const data = await Chat.create(chat);
        
    
                console.log('Se creo el chat');
                return res.status(201).json({
                    message: 'El chat se ha creado correctamente',
                    success: true,
                    data : data.id
                });
            }


      
            
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
