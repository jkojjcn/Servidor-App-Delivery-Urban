const db = require('../config/config');

const Restaurant = {};

Restaurant.findByCategoryRestaurant = (id_category_restaurant) => {
    const sql = `
    SELECT
        R.id,
        R.name,
        R.description,
        R.price,
        R.image1,
        R.image2,
        R.image3,
        R.image4,
        R.id_category,
        R.lat,
        R.lng,
        R.notification_token
    FROM
        restaurants AS R
    INNER JOIN
        categories_restaurants AS CR
    ON
        R.id_category = CR.id
    WHERE
        CR.id = $1
    `;
    return db.manyOrNone(sql, id_category_restaurant);
}

Restaurant.findByCategoryAndRestaurantName = (id_category_restaurant, restaurant_name) => {
    const sql = `
    SELECT
        R.id,
        R.name,
        R.description,
        R.price,
        R.image1,
        R.image2,
        R.image3,
        R.image4,
        R.id_category,
        R.lat,
        R.lng,
        R.notification_token
    FROM
        restaurants AS R
    INNER JOIN
        categories_restaurants AS CR
    ON
        R.id_category = CR.id
    WHERE
        CR.id = $1 AND R.description ILIKE $2
    `;

    return db.manyOrNone(sql, [id_category_restaurant, `%${restaurant_name}%`]);
}




Restaurant.update = (restaurant) => {
    const sql = `
    UPDATE
        restaurant
    SET
        name = $2,
        description = $3,
        price = $4,
        image1 = $5,
        image2 = $6,
        image3 = $7,
        id_category = $8,
        updated_at = $9
    WHERE
        id = $1
    `;
    return db.none(sql, [
        product.id,
        product.name,
        product.description,
        product.price,
        product.image1,
        product.image2,
        product.image3,
        product.id_category,
        new Date()
    ]);
}


module.exports = Restaurant;