const OrdersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app) => {

    /*
    * GET ROUTES
    */
   app.get('/api/orders/findByStatus/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByStatus);
   app.get('/api/orders/findByDeliveryAndStatus/:id_delivery/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByDeliveryAndStatus);
   app.get('/api/orders/findByClientAndStatus/:id_client/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByClientAndStatus);
   app.get('/api/orders/findByRestaurantId/:id_restaurant/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByRestaurantId);
   app.get('/api/orders/findByRestaurantAdminId/:id_restaurant/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByRestaurantAdminId);


    /*
    * POST ROUTES
    */
   app.post('/api/orders/create', passport.authenticate('jwt', {session: false}), OrdersController.create);
   
   /*
   * PUT ROUTE
   */
   app.put('/api/orders/updateToDispatched', passport.authenticate('jwt', {session: false}), OrdersController.updateToDispatched);
   app.put('/api/orders/updateToOnTheWay/:price', passport.authenticate('jwt', {session: false}), OrdersController.updateToOnTheWay);
   app.put('/api/orders/updateToOnAceptedDelivery', passport.authenticate('jwt', {session: false}), OrdersController.updateToOnAceptedDelivery);
   app.put('/api/orders/updateToOnRefuseDelivery', passport.authenticate('jwt', {session: false}), OrdersController.updateToOnRefuseDelivery);
   app.put('/api/orders/updateToDelivered', passport.authenticate('jwt', {session: false}), OrdersController.updateToDelivered);
   app.put('/api/orders/updateLatLng', passport.authenticate('jwt', {session: false}), OrdersController.updateLatLng);
}