const db = require('../config/config');

const TaxiRequest = {};

TaxiRequest.findByUser = (id_user) => {
    const sql = `
    SELECT
        T.id,
        T.request_status,
        T.id_client,
        T.id_taxi,
        T.id_address,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image,
            'notification_token', U.notification_token,
            'phone', U.phone
        ) AS taxi_user,
        JSON_BUILD_OBJECT(
            'id', U2.id,
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image,
            'notification_token', U2.notification_token,
            'phone', U2.phone
        ) AS taxi_client,
        JSON_BUILD_OBJECT(
            'id', A.id,
            'address', A.address,
            'neighborhood', A.neighborhood,
            'lat', A.lat,
            'lng', A.lng
        ) AS address_request,
        T.id_time,
        T.lat,
        T.lng,
        T.created_at,
        T.updated_at,
        T.arrived_at
    FROM
        taxi_request AS T
    INNER JOIN
        users AS U
    ON
        T.id_client = U.id
    LEFT JOIN
        users AS U2
    ON
        T.id_taxi = U2.id
    INNER JOIN
        address AS A
    ON
        A.id = T.id_address
    WHERE 
        T.id_client = $1
    OR
        T.id_taxi = $1
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


TaxiRequest.getAllRequest = (id_user) => {
    const sql = `
    SELECT
        T.id,
        T.request_status,
        T.id_client,
        T.id_taxi,
        T.id_address,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image,
            'notification_token', U.notification_token,
            'phone', U.phone
        ) AS taxi_user,
        JSON_BUILD_OBJECT(
            'id', U2.id,
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image,
            'notification_token', U2.notification_token,
            'phone', U2.phone
        ) AS taxi_client,
        JSON_BUILD_OBJECT(
            'id', A.id,
            'address', A.address,
            'neighborhood', A.neighborhood,
            'lat', A.lat,
            'lng', A.lng
        ) AS address_request,
        T.id_time,
        T.lat,
        T.lng,
        T.created_at,
        T.updated_at,
        T.arrived_at
    FROM
        taxi_request AS T
    INNER JOIN
        users AS U
    ON
        T.id_client = U.id
    LEFT JOIN
        users AS U2
    ON
        T.id_taxi = U2.id
    INNER JOIN
        address AS A
    ON
        A.id = T.id_address
    `;

    return db.manyOrNone(sql, id_user);
}


TaxiRequest.ticketRequest = (request) => {
    const sql = `
    UPDATE
        taxi_request
    SET
        id_taxi = $2,
        id_time = $3,
        lat = $4,
        lng = $5,
        update_at = $6
    WHERE
        id_client = $1 AND id_taxi IS NULL
    `;
    return db.none(sql, [
        request.id_client,
        request.id_taxi,
        request.id_time,
        request.lat,
        request.lng,
        new Date()
    ]);
}


module.exports = TaxiRequest;