const db = require('../config/config');

const Category = {};


Category.getAll = (restaurant_id) => {

    const sql = `
        SELECT
            C.id,
            C.name,
            C.description
        FROM
            categories AS C
        
        INNER JOIN
            restaurants AS R
        ON
            C.description = R.name
        WHERE
            R.id = $1
    `;

    return db.manyOrNone(sql, restaurant_id);
}

Category.create = (category) => {
    const sql = `
    INSERT INTO
        categories(
            name,
            description,
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4) RETURNING id
    `;
    return db.oneOrNone(sql, [
        category.name,
        category.description,
        new Date(),
        new Date()
    ]);
}

module.exports = Category;