const MessageController = require('../controllers/messageController');
const passport = require('passport');

module.exports = (app, upload) => {
    app.get('/api/message/create', passport.authenticate('jwt', {session: false}), MessageController.create);
}