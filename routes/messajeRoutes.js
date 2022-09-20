const MessageController = require('../controllers/messageController');
const passport = require('passport');

module.exports = (app, upload) => {
    app.get('/api/message/findMessage/:id_user', passport.authenticate('jwt', {session: false}), MessageController.findById);
    app.post('/api/message/createNotification/:id_user', passport.authenticate('jwt', {session: false}), MessageController.create);
   // app.post('/api/restaurants/create', passport.authenticate('jwt', {session: false}), upload.array('image', 3), ProductsController.create);
}