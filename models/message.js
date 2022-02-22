const db = require('../config/config');

const Message = {};

Message.findMessage = (id_user) => {
    const sql = `
    SELECT
        id,
        email,
        name,
        lastname,
        phone,
        image,
        open,
        message,
        created_at,
        updated_at,
        notification_token
    FROM
        message
    WHERE
        id = $1
    `;
    return db.manyOrNone(sql, id_user);
}
module.exports = Message;