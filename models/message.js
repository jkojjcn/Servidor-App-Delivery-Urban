const db = require('../config/config');

const Message = {};

Message.findMessage = (id_user) => {
    const sql = `
    SELECT
        id,
        to,
        open,
        message,
        created_at,
        updated_at,
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
        ) AS to,
    FROM
        message
    INNER JOIN
        users AS U
    ON
        id = U.id
	LEFT JOIN
		users AS U2
	ON
		to = U2.id
    WHERE
        id = $1
    `;
    return db.manyOrNone(sql, id_user);
}
module.exports = Message;