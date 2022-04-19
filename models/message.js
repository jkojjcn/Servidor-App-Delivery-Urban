const db = require('../config/config');

const Message = {};

Message.findMessage = (id_user) => {
    const sql = `
    SELECT
        M.from,
        M.to,
        M.open,
        M.message,
        M.type,
        M.created_at,
        M.updated_at,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image,
            'notification_token', U.notification_token,
            'phone', U.phone
        ) AS client,
		JSON_BUILD_OBJECT(
            'id', U2.id,
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image,
            'phone', U2.phone,
            'notification_token', U2.notification_token
        ) AS receiver
    FROM
        message AS M
    INNER JOIN
        users AS U
    ON
        M.from = U.id
	LEFT JOIN
		users AS U2
	ON
		M.to = U2.id
    WHERE
        M.from = $1
    OR
        M.to = $1
    `;
    return db.manyOrNone(sql, id_user);
}

Message.create = (message) => {
    const sql = `
    INSERT INTO
        message(
            message,
            created_at,
            updated_at,
            type,
            to,
            open
        )
    VALUES($1, $2, $3, $4, $5, $6) RETURNING id
    `;

    return db.oneOrNone(sql, [
        message.message,
        Date.now(),
        Date.now(),
        message.type,
        message.to,
        message.open
    ]);
}

module.exports = Message;