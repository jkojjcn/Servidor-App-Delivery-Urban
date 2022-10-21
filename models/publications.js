const db = require('../config/config');

const Publications = {};

Publications.findAll = () => {
    const sql = `
    SELECT
        P.id,
        P.title,
        P.subtitle,
        P.fire,
        P.image,
        P.restaurant_id,
        JSON_BUILD_OBJECT(
            'id', R.id,
            'name', R.name,
            'description', R.description,
            'image1', R.image1,
            'lat', R.lat,
            'lng', R.lng,
            'notification_token', R.notification_token
        ) AS restaurant
    INNER JOIN
        restaurants AS R
    ON
        R.id = P.restaurant_id
        
    FROM
        publications AS P
    `;
    return db.manyOrNone(sql);
}


module.exports = Publications;