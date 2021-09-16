const RestaurantsController = require('../controllers/restaurantsController');
const passport = require('passport');

module.exports = (app, upload) => {

    app.get('/api/restaurants/findByCategoryRestaurant/:id_category', RestaurantsController.findByCategory);
    app.get('/api/restaurants/findByCategoryAndRestaurantName/:id_category/:product_name', RestaurantsController.findByCategoryAndRestaurantName);

   // app.post('/api/restaurants/create', passport.authenticate('jwt', {session: false}), upload.array('image', 3), ProductsController.create);
}