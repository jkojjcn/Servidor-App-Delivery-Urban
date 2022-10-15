const MessageController = require('../controllers/messageController');
const passport = require('passport');

module.exports = (app, upload) => {
    
    app.get('/api/message/findByChat/:id_chat', passport.authenticate('jwt', {session: false}), MessageController.findByChat);
    app.post('/api/message/create', passport.authenticate('jwt', {session: false}), MessageController.create);
    app.post('/api/message/createWithImage', passport.authenticate('jwt', {session: false}), upload.array('image', 1), MessageController.createWithImage);


}