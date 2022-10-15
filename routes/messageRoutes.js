const MessageController = require('../controllers/messageController');
const passport = require('passport');

module.exports = (app, upload) => {
    
    app.get('/api/message/findByChat/:id_chat', passport.authenticate('jwt', {session: false}), MessageController.findByChat);
    app.post('/api/message/create', passport.authenticate('jwt', {session: false}), MessageController.create);

}