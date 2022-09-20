const db = require('../config/config');

const CategoryRestaurants = {};

CategoryRestaurants.getAll = () => {

    const sql = `
        SELECT
            id,
            name,
            description
        FROM
            categories_restaurants
        ORDER BY
            name
    `;

    return db.manyOrNone(sql);
}


module.exports = CategoryRestaurants;