const CategoriesRestaurantsController = require('../controllers/categoriesRestaurantsController');
const passport = require('passport');

module.exports = (app) => {

    /*
    * GET ROUTES
    */
   app.get('/api/categories_restaurants/getAll', CategoriesRestaurantsController.getAll);
}