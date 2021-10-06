const db = require('../config/config');

const OrderHasProducts = {};



OrderHasProducts.create = (id_order, id_product, quantity, features) => {
    const sql = `
    INSERT INTO
        order_has_products(
            id_order,
            id_product,
            quantity,
            created_at,
            updated_at,
            features

        )
    VALUES($1, $2, $3, $4, $5, $6)
    `;

    return db.none(sql, [
        id_order,
        id_product,
        quantity,
        new Date(),
        new Date(),
        features
    ]);
}

module.exports = OrderHasProducts;