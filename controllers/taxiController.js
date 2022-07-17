const TaxiController = require('../models/taxi_request');


module.exports = {

    async findByUser(req, res, next) {

        try {
            const id_user = req.params.id_user;
            const data = await TaxiController.findByUser(id_user);
         
            return res.status(201).json(data);
        } 
        catch (error) {
   
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las solicitudes',
                error: error,
                success: false
            })
        }

    },

    async create(req, res, next) {
        try {
            
            const taxi_request = req.body;
            const data = await TaxiController.create(taxi_request);

            return res.status(201).json({
                success: true,
                message: 'Buscando Taxi..',
                data: data.id
            });

        } 
        catch (error) {
         
            return res.status(501).json({
                success: false,
                message: 'Hubo un error creando la petición',
                error: error
            });
        }
    },

    async getAllRequest(req, res, next) {

        try {
            const id_user = req.params.id_user;

                const data = await TaxiController.getAllRequest(id_user);
           
            return res.status(201).json(data);

            
        } 
        catch (error) {
        
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las solicitudes',
                error: error,
                success: false
            })
        }

    },

    async ticketRequest(req, res, next) {
        try {
            
            let taxi_request = req.body;
            await TaxiController.ticketRequest(taxi_request);

            return res.status(201).json({
                success: true,
                message: 'Buscando Taxi..',
                data: data.id
            });

        } 
        catch (error) {
         
            return res.status(501).json({
                success: false,
                message: 'Hubo un error creando la petición',
                error: error
            });
        }
    },


}