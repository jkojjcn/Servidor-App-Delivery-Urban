const Category = require('../models/category');

module.exports = {

    async getAll(req, res, next) {

        try {

            const restaurant_id = req.params.restaurant_id;
            const data = await Category.getAll(restaurant_id);

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

    async create(req, res, next) {
        try {
            const category = req.body;


            const data = await Category.create(category);

            return res.status(201).json({
                message: 'La categoria se creo correctamente',
                success: true,
                data: data.id
            });

        } 
        catch (error) {
  
            return res.status(501).json({
                message: 'Hubo un error al crear la categoria',
                success: false,
                error: error
            });
        }
    }

}