const MessageController = require('../controllers/messageController');
const passport = require('passport');

module.exports = (app, upload) => {
    app.post('/api/message/create', passport.authenticate('jwt', {session: false}), MessageController.create);
}