const PublicationsController = require('../controllers/publicationsController');
const passport = require('passport');

module.exports = (app) => {

   
    app.get('/api/publications/getAll/', PublicationsController.getAll);



}