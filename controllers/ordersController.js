const Message = require('../models/message');
const Order = require('../models/order');
const OrderHasProduct = require('../models/order_has_products');



module.exports = {


    async findByStatus(req, res, next) {

        try {
            const status = req.params.status;
            const data = await Order.findByStatus(status);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las ordenes por estado',
                error: error,
                success: false
            })
        }

    },



    async findByRestaurantId(req, res, next) {

        try {
            
            const id_restaurant = req.params.id_restaurant;
            const status = req.params.status;
            
           // console.log(`Status ${status}`);
            const data = await Order.findByRestaurantId(id_restaurant, status);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las ordenes por estado',
                error: error,
                success: false
            })
        }

    },
    async findByRestaurantAdminId(req, res, next) {

        try {
            
            const id_restaurant = req.params.id_restaurant;
            const status = req.params.status;
            
           // console.log(`Status ${status}`);
            const data = await Order.findByRestaurantAdminId(id_restaurant, status);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las ordenes por estado',
                error: error,
                success: false
            })
        }

    },



    
    async findByDeliveryAndStatus(req, res, next) {

        try {
            const id_delivery = req.params.id_delivery;
            const status = req.params.status;

            const data = await Order.findByDeliveryAndStatus(id_delivery, status);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las ordenes por estado',
                error: error,
                success: false
            })
        }

    },

    async findByClientAndStatus(req, res, next) {

        try {
            const id_client = req.params.id_client;
            const status = req.params.status;

            const data = await Order.findByClientAndStatus(id_client, status);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las ordenes por estado',
                error: error,
                success: false
            })
        }

    },

    async create(req, res, next) {
        try {
            
            let order = req.body;
            order.status = 'PAGADO';
            const data = await Order.create(order);
            
            console.log('LA ORDEN SE CREO CORRECTAMENTEee');

            // RECORRER TODOS LOS PRODUCTOS AGREGADOS A LA ORDEN
            for (const product of order.products) {
                await OrderHasProduct.create(data.id, product.id, product.quantity, product.sabores);
            }

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

    async updateToDispatched(req, res, next) {
        try {
            
            let order = req.body;
            order.status = 'DESPACHADO';


         
            await Order.updateDispatched(order);

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizo correctamente',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },

    async updateToOnTheWay(req, res, next) {
        try {
            
            let order = req.body;
            order.status = 'EN CAMINO';
            let price = req.params.price
            await Order.update(order, price);
            

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizo correctamente',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },

//// Actualizaciones de aceptacion delivery
    async updateToOnAceptedDelivery(req, res, next) {
        try {
            
            let order = req.body;
           
            
            order.status = 'DESPACHADO';
            await Order.updateAcepted(order);
            

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizo correctamente',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },
    async updateToOnRefuseDelivery(req, res, next) {
        try {
            
            let order = req.body;
            order.status = 'DESPACHADO';
            await Order.updateRefuse(order);
            

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizo correctamente',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },




    async updateToDelivered(req, res, next) {
        try {
            
            let order = req.body;
            order.status = 'ENTREGADO';
            await Order.update(order);
            

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizo correctamente',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },

    async updateLatLng(req, res, next) {
        try {
            
            let order = req.body;
            await Order.updateLatLng(order);
            
            return res.status(201).json({
                success: true,
                message: 'La orden se actualizo correctamente',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    }

}