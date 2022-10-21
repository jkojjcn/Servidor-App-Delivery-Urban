const Publications = require('../models/publications');

module.exports = {

    async getAll(req, res, next) {

        try {
            const data = await Publications.findAll();
            console.log(`Publicaciones :  ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las publicaciones',
                error: error,
                success: false
            })
        }

    },

}