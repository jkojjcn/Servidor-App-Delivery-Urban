const mercadopago = require('mercadopago');
const Order = require('../models/order');
const OrderHasProduct = require('../models/order_has_products');
const User = require('../models/user');


mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-6028900970379574-062302-e3e5d11b7871ee742832e6351694608f-191014229'
});

module.exports = {

    async createPaymentCreditCart(req, res, next) {
        let payment = req.body;

        const payment_data = {
            description: payment.description,
            transaction_amount: payment.transaction_amount,
            installments: payment.installments,
            payment_method_id: payment.payment_method_id,
            token: payment.token,
            issuer_id: payment.issuer_id, 
            payer: {
                email: payment.payer.email,
                identification: {
                    type: payment.payer.identification.type,
                    number: payment.payer.identification.number,
                }
            }
        }



        const data = await mercadopago.payment.create(payment_data).catch((err) => {

            return res.status(501).json({
                message: 'Error al crear el pago',
                success: false,
                error: err
            });
        });

        if (data) {
            


            if (data !== undefined) {
                const payment_type_id = module.exports.validatePaymentMethod(payment.payment_type_id);
                payment.id_payment_method = payment_type_id;

                let order = payment.order;


                order.status = 'PAGADO';
                const orderData = await Order.create(order);
                
  
                // RECORRER TODOS LOS PRODUCTOS AGREGADOS A LA ORDEN
                for (const product of order.products) {
                    await OrderHasProduct.create(orderData.id, product.id, product.quantity);
                }

                return res.status(201).json(data.response);
            }
        }
        else {
            return res.status(501).json({
                message: 'Error algun dato esta mal en la peticion',
                success: false
            });
        }
        
    },
    validatePaymentMethod(status) {
        if (status == 'credit_cart') {
            status = 1
        }
        if (status == 'bank_transfer') {
            status = 2
        }
        if (status == 'ticket') {
            status = 3
        }
        if (status == 'upon_delivery') {
            status = 4
        }

        return status;
    }

}