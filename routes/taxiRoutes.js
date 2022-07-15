const TaxiController = require('../controllers/taxiController');
const passport = require('passport');

module.exports = (app) => {

   app.get('/api/taxi/findByUser/:id_user', passport.authenticate('jwt', {session: false}), TaxiController.findByUser);


   app.post('/api/taxi/create', passport.authenticate('jwt', {session: false}), TaxiController.create);
}