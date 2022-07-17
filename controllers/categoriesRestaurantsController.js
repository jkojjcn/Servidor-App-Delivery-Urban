const CategoriesRestaurants = require('../models/categories_restaurants');

module.exports = {

    async getAll(req, res, next) {

        try {
            const data = await CategoriesRestaurants.getAll();

            return res.status(201).json(data);
        } 
        catch (error) {
  
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las categorias',
                error: error,
                success: false
            })
        }

    },

}