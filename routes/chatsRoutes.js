const ChatsController = require('../controllers/chatsController');
const passport = require('passport');

module.exports = (app) => {

  
    // GUARDAR DATOS
    app.post('/api/chats/create', passport.authenticate('jwt', {session: false}), ChatsController.create);
    app.get('/api/chats/findByIdUser/:id_user', passport.authenticate('jwt', {session: false}), ChatsController.findByUser);


}