const db = require('../config/config');

const Chat = {

};

Chat.create = (chat) =>{

    const sql = `
    INSERT INTO
        chats(
            id_user1,
            id_user2,
            timestamp,
            updated_at,
            created_at
        )
    VALUES($1, $2, $3, $4, $5) RETURNING id
    `;
    return db.oneOrNone(sql, [
        chat.id_user1,
        chat.id_user2,
        new Date().getTime(),
        new Date(),
        new Date()
    ]);

}
module.exports = Chat;