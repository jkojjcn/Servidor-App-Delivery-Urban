const PublicationsController = require('../controllers/publicationsController');

module.exports = (app) => {

   
    app.get('/api/publications/getAll', PublicationsController.getAll);



}