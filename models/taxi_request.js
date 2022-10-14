const db = require('../config/config');

const TaxiRequest = {};

TaxiRequest.findByUser = (id_user) => {
    const sql = `
    SELECT
        request_status,
        id_user,
        id_taxi,
        id_time,
        id_address,
        lat,
        lng,
        created_at,
        updated_at,
        arrived_at
    FROM
        taxi_request
    WHERE 
        id_user = $1
    `;

    return db.manyOrNone(sql, id_user);
}

TaxiRequest.create = (taxi_request) => {
    const sql = `
    INSERT INTO
        taxi_request(
            request_status,
            id_user,
            id_taxi,
            id_time,
            id_address,
            lat,
            lng,
            created_at,
            updated_at,
            arrived_at
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id
    `;

    return db.oneOrNone(sql, [
            taxi_request.request_status,
            taxi_request.id_user,
            taxi_request.id_taxi,
            taxi_request.id_time,
            taxi_request.id_address,
            taxi_request.lat,
            taxi_request.lng,
            new Date(),
            taxi_request.updated_at,
            taxi_request.arrived_at
    ]);
}


module.exports = TaxiRequest;